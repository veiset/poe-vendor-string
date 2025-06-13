import React, {Dispatch, SetStateAction, useEffect} from "react";
import {gems} from "../../generated/GeneratedGems";
import ModSearchBox from "../../components/ModSearchBox";
import "./GemNameList.css";

export interface GemNameListProps {
  id: string
  gemNames: string[]
  selected: string[]
  setSelected: Dispatch<SetStateAction<string[]>>
}

/* TODO
            sortFn={(a: GemRegex, b: GemRegex) => {
              const aSortKey = gemColorOrder[a.options.color] + a.name
              const bSortKey = gemColorOrder[b.options.color] + b.name
              return aSortKey.localeCompare(bSortKey)
            }}
            colorFun={(isSelected, token.options) => {
              if (isSelected) return "#ffffff";
              return {
                'r': '#fab4bb',
                'g': '#c2ffe3',
                'b': '#fab4bb',
              }[token.color] ?? '#ffffff';

              
  const gemColorOrder: Record<string, number> = { 'r': 1, 'g': 2, 'b': 3, 'w': 4 }
*/

const GemNameList = (props: GemNameListProps) => {
  const {id, gemNames, selected, setSelected} = props;
  const [search, setSearch] = React.useState("");

  useEffect(() => {
  }, [selected]);

  const filteredGems = gemNames.map(n => gems[n]).filter(v => {
    return !search || search.toLowerCase().trim().split(" ").every(q => v.name.toLowerCase().includes(q));
  });

  return (
    <>
      <div className="eq-col-2 box-small-padding">
        <ModSearchBox id={id} search={search} setSearch={setSearch} placeholder={"Search for a Gem..."}/>
      </div>
      <div className="gem-name-list">
        {filteredGems.map((v) => {
          const isSelected = selected.includes(v.name);
          return (
            <div key={v.name}
                 className={isSelected ? "selectable-item selected-mod" : "selectable-item"}
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