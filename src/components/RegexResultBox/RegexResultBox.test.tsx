import React, {useState} from "react";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import RegexResultBox from "./RegexResultBox";

const Harness = () => {
  const [customText, setCustomText] = useState("foo");
  const [enableCustomText, setEnableCustomText] = useState(true);
  return (
    <RegexResultBox
      result="bar"
      reset={() => {}}
      customText={customText}
      setCustomText={setCustomText}
      enableCustomText={enableCustomText}
      setEnableCustomText={setEnableCustomText}
    />
  );
};

const enableAutoCopy = () => {
  fireEvent.click(screen.getByRole("button", {name: /options/i}));
  fireEvent.click(screen.getByLabelText(/auto copy result text/i));
};

describe("RegexResultBox auto-copy", () => {
  let writeTextMock: jest.Mock;

  beforeEach(() => {
    writeTextMock = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: {writeText: writeTextMock},
      configurable: true,
    });
  });

  test("writes finalResult and marks copied once on success", async () => {
    render(<Harness />);
    enableAutoCopy();

    expect(writeTextMock).toHaveBeenCalledWith("bar foo");
    await waitFor(() => expect(screen.getByText("bar foo")).toHaveClass("copied-good"));
    expect(writeTextMock).toHaveBeenCalledTimes(1);
  });

  test("does not mark copied when writeText rejects", async () => {
    writeTextMock.mockRejectedValueOnce(new Error("Clipboard write is not allowed"));

    render(<Harness />);
    enableAutoCopy();

    expect(writeTextMock).toHaveBeenCalledWith("bar foo");
    await waitFor(() => expect(writeTextMock).toHaveBeenCalledTimes(1));
    expect(screen.getByText("bar foo")).not.toHaveClass("copied-good");
  });
});
