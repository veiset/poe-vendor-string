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

describe("RegexResultBox price filter", () => {
  let writeTextMock: jest.Mock;

  beforeEach(() => {
    writeTextMock = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: {writeText: writeTextMock},
      configurable: true,
      writable: true,
    });
  });

  const openOptions = () => {
    fireEvent.click(screen.getByRole("button", {name: /options/i}));
  };

  const setMax = (value: string) => {
    fireEvent.change(screen.getByTestId("rrb-options-price-max"), {target: {value}});
  };

  const setCurrency = (value: string) => {
    fireEvent.change(screen.getByLabelText(/currency/i), {target: {value}});
  };

  const enablePriceFilter = () => {
    fireEvent.click(screen.getByLabelText(/enable max price/i));
  };

  const readResult = (): string | null => {
    return screen.getByTestId("rrb-result-text").textContent;
  };

  test("disabled filter leaves finalResult unchanged", () => {
    render(<Harness initialResult="bar" />);
    openOptions();

    expect(readResult()).toBe("bar");
  });

  test("enabling filter with valid config appends price filter term", () => {
    render(<Harness initialResult="bar" />);
    openOptions();
    setCurrency("chaos");
    setMax("100");
    enablePriceFilter();

    const expectedTerm = String.raw`"Note:.*?\b([1-9]?\d|100)\b.*chaos"`;
    expect(readResult()).toBe(`bar ${expectedTerm}`);
  });

  test("enabling filter with invalid max leaves finalResult unchanged", () => {
    render(<Harness initialResult="bar" />);
    openOptions();
    setCurrency("chaos");
    enablePriceFilter();

    expect(readResult()).toBe("bar");
  });

  test("manual copy includes price filter term when filter is enabled", () => {
    render(<Harness initialResult="bar" />);
    openOptions();
    setCurrency("chaos");
    setMax("9");
    enablePriceFilter();

    fireEvent.click(screen.getByRole("button", {name: /^copy$/i}));

    const expectedTerm = String.raw`"Note:.*?\b\d\b.*chaos"`;
    expect(writeTextMock).toHaveBeenCalledWith(`bar ${expectedTerm}`);
  });

  test("auto-copy includes price filter term when filter is enabled", () => {
    render(<Harness initialResult="bar" />);
    openOptions();
    setCurrency("divine");
    setMax("9");
    enablePriceFilter();
    fireEvent.click(screen.getByLabelText(/auto copy result text/i));

    const expectedTerm = String.raw`"Note:.*?\b\d\b.*divine"`;
    expect(writeTextMock).toHaveBeenCalledWith(`bar ${expectedTerm}`);
  });

  test("price filter combined with customText composes in correct order", () => {
    render(
      <Harness
        initialResult="bar"
        initialCustomText="foo"
        initialEnableCustomText={true}
      />,
    );
    openOptions();
    setCurrency("chaos");
    setMax("9");
    enablePriceFilter();

    const expectedTerm = String.raw`"Note:.*?\b\d\b.*chaos"`;
    expect(readResult()).toBe(`bar foo ${expectedTerm}`);
  });

  test("projected length indicator appears when config is valid but filter is disabled", () => {
    render(<Harness initialResult="bar" />);
    openOptions();
    setCurrency("chaos");
    setMax("100");

    expect(screen.getByText(/projected length/i)).toBeInTheDocument();
  });

  test("projected length indicator disappears when filter is enabled", () => {
    render(<Harness initialResult="bar" />);
    openOptions();
    setCurrency("chaos");
    setMax("100");
    enablePriceFilter();

    expect(screen.queryByText(/projected length/i)).not.toBeInTheDocument();
  });

  test("out-of-range max shows a warning", () => {
    render(<Harness initialResult="bar" />);
    openOptions();
    setCurrency("chaos");
    setMax("1500");

    expect(screen.getByText(/max value is invalid or out of range/i)).toBeInTheDocument();
  });

  test("non-numeric max shows a warning", () => {
    render(<Harness initialResult="bar" />);
    openOptions();
    setCurrency("chaos");
    setMax("abc");

    expect(screen.getByText(/max value is invalid or out of range/i)).toBeInTheDocument();
  });

  test("valid max does not show the warning", () => {
    render(<Harness initialResult="bar" />);
    openOptions();
    setCurrency("chaos");
    setMax("250");

    expect(screen.queryByText(/max value is invalid or out of range/i)).not.toBeInTheDocument();
  });

  test("empty max does not show the warning", () => {
    render(<Harness initialResult="bar" />);
    openOptions();
    setCurrency("chaos");

    expect(screen.queryByText(/max value is invalid or out of range/i)).not.toBeInTheDocument();
  });
});
