import React from "react";
import {SelectOption} from "../settings";
import {numericRegexPosition} from "../utils/SelectedOptionRegex";

interface SelectElementProps {
  name: string
  regex: string
  ranges: number[][]
  current: SelectOption
  selected: SelectOption[]
  setSelected: (options: SelectOption[]) => void
}

// Mods are matched by id; relic mods have no id and fall back to the name
const sameMod = (mod: SelectOption, option: SelectOption) =>
  mod.id !== undefined ? option.id === mod.id : option.name === mod.name;

export function SelectElement(props: SelectElementProps) {
  const {name, regex, ranges, current, selected, setSelected} = props;
  // Numeric regex generation currently supports integer rolls only
  const hasRange = ranges[0]?.length >= 2 && ranges[0].every(Number.isInteger)
    && numericRegexPosition({name, regex}) !== undefined;
  const displayName = name
    .replace(/\|/g, " • ");

  return (
    <div className={`poe2-mod-row ${current.isSelected ? "selectable-item selected-mod" : "selectable-item"}`}
         onClick={() =>
           setSelected(selected
             .filter((e) => !sameMod(current, e))
             .concat({...current, isSelected: !current.isSelected}))
         }>
      {hasRange &&
          <input
              className="numberinput-input poe2-mod-value-input"
              type="text"
              placeholder={ranges[0][0] + "-" + ranges[0][1]}
              value={current.value ?? ""}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                setSelected(selected
                  .filter((e) => !sameMod(current, e))
                  .concat({...current, value: Number(e.target.value), isSelected: true}))
              }}
          />
      }
      <span className="poe2-mod-name">
        {hasRange && displayName.replace("#", "")}
        {!hasRange && displayName.replace(/##/g, "#")}
      </span>
    </div>
  )
}

export interface SelectListProps {
  id: string
  options: SelectOption[]
  selected: SelectOption[]
  setSelected: (options: SelectOption[]) => void
}

export function SelectList(props: SelectListProps) {
  const {id, options, selected, setSelected} = props;

  return (
    <div key={id}>
      {options.map((mod) => {
        // Only the choice comes from the saved copy; the regex, name and ranges come from the loaded data
        const saved = selected.find((e) => sameMod(mod, e));
        return (
          <div key={mod.name}>
            <SelectElement
              current={saved ? {...mod, value: saved.value, isSelected: saved.isSelected} : mod}
              ranges={mod.ranges}
              name={mod.name}
              regex={mod.regex}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        )
      })}
    </div>
  )
}
