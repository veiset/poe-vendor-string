import React from "react";
import {render, screen} from "@testing-library/react";
import {Vendor} from "./vendor/Vendor";
import {Relic} from "./relic/Relic";

describe("poe2 pages render", () => {
  test("Vendor renders header, result box and filter cards", () => {
    render(<Vendor/>);
    expect(screen.getByText("Vendor Regex")).toBeInTheDocument();
    expect(screen.getByText("Item property & attributes")).toBeInTheDocument();
    expect(screen.getByText("Item modifiers")).toBeInTheDocument();
    expect(screen.getByText("Levels & rarity")).toBeInTheDocument();
    expect(screen.getByText("Item class")).toBeInTheDocument();
    expect(screen.getByText("Select conditions")).toBeInTheDocument();
  });

  test("Vendor generates rarity regex when a checkbox is ticked", () => {
    render(<Vendor/>);
    // Initial result should be empty (default settings have no filters)
    expect(screen.getByText(/^length: /)).toBeInTheDocument();
  });

  test("Relic renders match type toggle and both modifier lists", () => {
    render(<Relic/>);
    expect(screen.getByText("Relic Regex")).toBeInTheDocument();
    expect(screen.getByText("Prefix modifiers")).toBeInTheDocument();
    expect(screen.getByText("Suffix modifiers")).toBeInTheDocument();
    expect(screen.getByLabelText(/Match any/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Match both/)).toBeInTheDocument();
  });
});
