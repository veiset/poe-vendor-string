import React, {Dispatch, SetStateAction, useEffect, useMemo} from "react";
import {type GemRegex, gems} from "../../generated/GeneratedGems";
import ModSearchBox from "../../components/ModSearchBox";
import "./GemNameList.css";

export interface GemNameListProps {
  id: string
  gemNames: string[]
  selected: string[]
  setSelected: Dispatch<SetStateAction<string[]>>
}

const gemColorOrder: Record<string, number> = { 'r': 1, 'g': 2, 'b': 3, 'w': 4 }
const gemSortFn = (a: GemRegex, b: GemRegex) => {
  const aSortKey = gemColorOrder[a.color] + a.name
  const bSortKey = gemColorOrder[b.color] + b.name
  return aSortKey.localeCompare(bSortKey)
}

const GemNameList = (props: GemNameListProps) => {
  const {id, gemNames, selected, setSelected} = props;
  const [search, setSearch] = React.useState("");

  useEffect(() => {
  }, [selected]);

  const filteredGems = useMemo(() => gemNames.map(n => gems[n]).filter(v => {
    return !search || search.toLowerCase().trim().split(" ").every(q => v.name.toLowerCase().includes(q));
  }).sort(gemSortFn), [gemNames, search]);

  return (
    <>
      <div className="half-size box-small-padding">
        <ModSearchBox id={id} className="gem-search-box" search={search} setSearch={setSearch} placeholder={"Search for a Gem..."}/>
      </div>
      <div className="gem-name-list">
        {filteredGems.map((v) => {
          const isSelected = selected.includes(v.name);
          let className = `selectable-item gem-${v.color}`;
          if (isSelected) className += ' selected-mod';
          return (
            <div key={v.name}
                 className={className}
                 onClick={() => {
                   isSelected
                     ? setSelected(selected.filter(m => m !== v.name))
                     : setSelected(selected.concat(v.name));
                 }}
            >
              {v.name.replaceAll("|", " ")}
            </div>
          );
        })}
      </div>
    </>
  );

}

export default GemNameList;