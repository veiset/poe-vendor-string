import React, {useState} from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import RegexResultBox from "./RegexResultBox";

interface HarnessProps {
  initialResult?: string;
  initialCustomText?: string;
  initialEnableCustomText?: boolean;
}

const Harness = ({
  initialResult = "bar",
  initialCustomText = "",
  initialEnableCustomText = false,
}: HarnessProps) => {
  const [result] = useState(initialResult);
  const [customText, setCustomText] = useState(initialCustomText);
  const [enableCustomText, setEnableCustomText] = useState(initialEnableCustomText);
  return (
    <RegexResultBox
      result={result}
      reset={() => {}}
      customText={customText}
      setCustomText={setCustomText}
      enableCustomText={enableCustomText}
      setEnableCustomText={setEnableCustomText}
    />
  );
};

describe("RegexResultBox clipboard behavior", () => {
  let writeTextMock: jest.Mock;

  beforeEach(() => {
    writeTextMock = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: {writeText: writeTextMock},
      configurable: true,
      writable: true,
    });
  });

  test("manual copy writes the bare result when customText is disabled", () => {
    render(<Harness initialResult="bar" />);

    fireEvent.click(screen.getByRole("button", {name: /^copy$/i}));

    expect(writeTextMock).toHaveBeenCalledWith("bar");
  });

  test("manual copy writes result + customText when customText is enabled", () => {
    render(
      <Harness
        initialResult="bar"
        initialCustomText="foo"
        initialEnableCustomText={true}
      />,
    );

    fireEvent.click(screen.getByRole("button", {name: /^copy$/i}));

    expect(writeTextMock).toHaveBeenCalledWith("bar foo");
  });

  test("auto-copy writes the bare result when customText is disabled", () => {
    render(<Harness initialResult="bar" />);

    fireEvent.click(screen.getByRole("button", {name: /options/i}));
    fireEvent.click(screen.getByLabelText(/auto copy result text/i));

    expect(writeTextMock).toHaveBeenCalledWith("bar");
  });

  test("auto-copy writes result + customText when customText is enabled", () => {
    render(
      <Harness
        initialResult="bar"
        initialCustomText="foo"
        initialEnableCustomText={true}
      />,
    );

    fireEvent.click(screen.getByRole("button", {name: /options/i}));
    fireEvent.click(screen.getByLabelText(/auto copy result text/i));

    expect(writeTextMock).toHaveBeenCalledWith("bar foo");
  });
});
