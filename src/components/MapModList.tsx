import React, {Dispatch, SetStateAction, useEffect} from "react";
import {MapMod} from "../generated/GeneratedMapMods";
import ModSearchBox from "./ModSearchBox";

export interface ModListProps {
  id: string
  mods: MapMod[]
  selected: string[]
  setSelected: Dispatch<SetStateAction<string[]>>
  colorFun?: (mapMod: MapMod) => string
  disableSearch?: boolean
}

const MapModList = (props: ModListProps) => {
  const {id, mods, selected, setSelected, colorFun, disableSearch} = props;
  const [search, setSearch] = React.useState("");

  useEffect(() => {
  }, [selected]);

  const regexSearch = (value: string, s: string | undefined) => {
    if (!s) return false;
    const regexp = reverseRegexLookupSanitize(s);
    return regexp ? value.toLowerCase().match(regexp) : false;
  }

  const reverseRegexLookupSanitize = (regex: string): RegExp | undefined => {
    try {
      const sanitized = regex.toLowerCase()
        .split("\" ")
        .join("|")
        .replace(/\\"(?:m q|iz).*%/, "")
        .replaceAll("\"", "")
        .replaceAll("!", "")
        .trim();
      return new RegExp(`${sanitized}`);
    } catch (e) {
      return undefined;
    }
  }

  const mapMods = mods.filter(v => {
    const regexMatch = regexSearch(v.value, search);
    let regularMatch = !search || search.toLowerCase().trim().split(" ").every(q => v.value.toLowerCase().includes(q));
    return regularMatch || regexMatch;
  });

  return (
    <>
      {!disableSearch && <ModSearchBox id={id} search={search} setSearch={setSearch}/>}
      <div className="mod-list">
        {mapMods.map((v) => {
          const isSelected = selected.includes(v.value);
          const colorValue = !isSelected && colorFun
            ? colorFun(v)
            : "#ffffff";
          const style = !isSelected ? {color: colorValue} : undefined
          return (
            <div key={v.value} style={style}
                 className={isSelected ? "selectable-item selected-mod" : "selectable-item"}
                 onClick={() => {
                   isSelected
                     ? setSelected(selected.filter(m => m !== v.value))
                     : setSelected(selected.concat(v.value));
                 }}
            >
              {v.value.replaceAll("|", " ")}
            </div>
          );
        })}
      </div>
    </>
  );

}

export default MapModList;
