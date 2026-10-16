import {vi} from "vitest";
import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {SelectList} from "./SelectList";
import {SelectOption} from "../settings";

const rarity: SelectOption = {
  name: "#% increased Rarity of Items found",
  regex: "rarity",
  ranges: [[10, 20]],
  value: null,
  isSelected: false,
};

describe("SelectList", () => {
  test("clicking anywhere on the row toggles the mod", () => {
    const setSelected = vi.fn();
    const {container} = render(<SelectList id="mods" options={[rarity]} selected={[]} setSelected={setSelected}/>);

    fireEvent.click(container.querySelector(".poe2-mod-row")!);

    expect(setSelected).toHaveBeenCalledWith([{...rarity, isSelected: true}]);
  });

  test("clicking the value input does not toggle the mod", () => {
    const setSelected = vi.fn();
    render(<SelectList id="mods" options={[rarity]} selected={[]} setSelected={setSelected}/>);

    fireEvent.click(screen.getByPlaceholderText("10-20"));

    expect(setSelected).not.toHaveBeenCalled();
  });
});
