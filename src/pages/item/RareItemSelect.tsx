import {ItemAffixRegex, itemRegex, ItemRegex} from "../../generated/GeneratedItemMods";
import React, {useEffect, useState} from "react";
import {Itembase} from "./ItemBaseSelector";

export interface RateItemSelectProps {
  itemRegex: ItemRegex
  itembase: Itembase
  selected: { [key: string]: RareModSelection }
  setSelected: (selected: { [key: string]: RareModSelection }) => void
}

export type RareModSelection = {
  itembase: Itembase;
  selected: boolean;
  values: {
    [key: number]: string;
  };
};

const RareItemSelect = (props: RateItemSelectProps) => {

  const {itemRegex, selected, setSelected, itembase} = props;

  const filteredCategories = itemRegex.categoryRegex
    .filter((e) => e.category !== "corrupted")
    .filter((e) => e.category !== "delve_suffix")
    .filter((e) => e.category !== "delve_prefix")
    .filter((e) => e.category !== "searing_exarch_implicit")
    .filter((e) => e.category !== "searing_exarch_implicit");

  const prefixCategories = filteredCategories
    .filter((e) => e.modifiers[0].affixtype === "PREFIX");
  const suffixCategories = filteredCategories
    .filter((e) => e.modifiers[0].affixtype === "SUFFIX");

  return (<div className="full-size row">
    <div className="eq-col-2">
      <p>Prefix</p>
      {prefixCategories.map((e) => {
        return <div>
          <div className="modgroup-header">{e.category}</div>
          <div>{e.modifiers.map((mod) => {
            const id = itemRegex.basetype + "-" + e.category + "-" + mod.desc;
            return <RareMod
              itembase={itembase}
              selected={selected[id]}
              updateValue={(id, s) => {
                setSelected({...selected, [id]: s})
              }}
              id={id}
              regexInfo={mod}/>;
          })
          }</div>
        </div>
      })}
    </div>
    <div className="eq-col-2">
      <p>Suffix</p>
      {suffixCategories.map((e) => {
        return <div>
          <div className="modgroup-header">{e.category}</div>
        </div>
      })}
    </div>
  </div>)
}

interface RareModProps {
  id: string
  itembase: Itembase
  regexInfo: ItemAffixRegex
  selected?: RareModSelection
  updateValue: (key: string, selected: RareModSelection) => void
}


const RareMod = (props: RareModProps) => {
  const {regexInfo, id, selected, updateValue, itembase} = props;
  const defaultState: RareModSelection = {
    itembase: {
      baseType: "unknown",
      item: "unknown",
      rarity: "Rare",
    },
    selected: false,
    values: {}
  }

  const [localSelected, setLocalSelected] = useState<RareModSelection>(selected ? {...defaultState, ...selected} : defaultState);

  useEffect(() => {
    updateValue(id, localSelected);
  }, [localSelected]);


  const hasRange = regexInfo.stats.find((e) => e.hasRange);

  return (<div className={"rare-mod-input"} key={id} onClick={() => {
    setLocalSelected({...localSelected, selected: !localSelected.selected, itembase})
  }}>
    <input type="checkbox" className="mod-checkbox-input" checked={localSelected.selected}/>
    {!hasRange ? <span>{regexInfo.desc}</span> :
      regexInfo.desc.replace("|", " • ").split("#").map((e, index) => {
        const range = regexInfo.stats[index] ?? {id: index, min: '#', max: '#', numberIndex: index, hasRange: false}

        if (regexInfo.before.includes(index) || regexInfo.after.includes(index) || regexInfo.on.includes(index)) {
          return (
            <span key={id + index}>
              {regexInfo.on.includes(index) && "YOOOO"}
              <span>{e}</span><input
              placeholder={`${range.min}-${range.max}`}
              type="number"
              onClick={(e) => e.stopPropagation()}
              value={localSelected.values[index]}
              onChange={(e) => {
                const values = localSelected.values;
                values[index] = e.target.value;
                setLocalSelected({selected: true, values, itembase});
              }}/>
            </span>)
        } else if (regexInfo.disabled.includes(index)) {
          return (
            <span key={e + index}>
              {e}<span className="mod-no-select-input">{range.min}-{range.max}</span>
            </span>)
        } else {
          return <span>{e}</span>
        }
      })}
  </div>)
}

export default RareItemSelect;