import {Token} from "../../generated/GeneratedTypes";
import React, {Dispatch, SetStateAction} from "react";
import SelectableSearch from "./SelectableSearch";
import {regexSearch} from "../../utils/regex/ReverseRegexLookup";
import "./SelectableTokenList.css";


export interface SelectableTokenListProps {
  elements: Token<any>[];
  selected: number[]
  setSelected: Dispatch<SetStateAction<number[]>>
  sortFn?: (a: Token<any>, b: Token<any>) => number
  colorFun?: (isSelected: boolean, token: Token<any>) => string
  displayFun?: (v: string) => string
}

const SelectableTokenList= (props: SelectableTokenListProps) => {
  const {elements, selected, setSelected, sortFn, colorFun, displayFun} = props;
  const [search, setSearch] = React.useState("");
  const sorting = sortFn ?? defaultSort;
  const colorFunction = colorFun ?? defaultColorFun;
  const displayValue = displayFun ?? defaultDisplayFun;
  return (
    <>
      <SelectableSearch search={search} setSearch={setSearch}/>
      <div className="selectable-token-list-mod-list">
        {elements
          .filter((token) => {
            const regexMatch = regexSearch(token.rawText.toLowerCase(), search);
            const regularMatch = !search || search.toLowerCase().trim().split(" ")
              .every(q => token.rawText.toLowerCase().includes(q));
            return regularMatch || regexMatch;
          })
          .sort(sorting)
          .map((token) => {
            const isSelected = selected.includes(token.id);
            const className = isSelected ?
              "selectable-token-list-selectable selectable-token-list-selected" :
              "selectable-token-list-selectable";
            const colorValue = colorFunction(isSelected, token)
            const style = !isSelected ? {color: colorValue} : undefined;

            return (
              <div key={token.id}
                   style={style}
                   className={className}
                   onClick={() => {
                     isSelected
                       ? setSelected(selected.filter(selectedToken => selectedToken !== token.id))
                       : setSelected(selected.concat(token.id).sort((n1, n2) => n1 - n2));
                   }}
              >
                {displayValue(
                  token.rawText.replaceAll("|", " · ")
                )}
              </div>
            )
          })}
      </div>
    </>
  );
}

const defaultSort = (a: Token<any>, b: Token<any>): number => {
  if (a.rawText === b.rawText) return 0
  return a.rawText > b.rawText ? 1 : -1
}

const defaultColorFun = (isSelected: boolean, t: Token<any>): string => "";

const defaultDisplayFun = (v: string) => v;

export default SelectableTokenList;