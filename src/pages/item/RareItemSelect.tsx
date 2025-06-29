import {CategoryRegex, ItemAffixRegex, itemRegex, ItemRegex} from "../../generated/GeneratedItemMods";
import React, {useEffect, useState} from "react";
import {Itembase} from "./ItemBaseSelector";
import classNames from "classnames";

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
    .filter((e) => e.category !== "searing_exarch_implicit")
    .filter((e) => e.category !== "searing_exarch_implicit");

  const groupedCategories = filteredCategories.reduce<Record<string, CategoryRegex[]>>((acc, category) => {
    const key = category.category.replace(RegExp("(suffix|prefix)_?"), "");
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(category);
    return acc;
  }, {});

  return (<>
    {Object.values(groupedCategories)
      .sort((a, b) => categoryOrder(a[0], b[0]))
      .map((e) => {
        const prefix = e[0];
        const suffix = e[1];

        return (<div className="rare-mod-group full-size row">
          <div className="eq-col-2">
            <h2>{cleanCategoryName(prefix.category)}</h2>
            {prefix.modifiers.map((mod) => {
              const id = itemRegex.basetype + "-" + prefix.category + "-" + mod.desc;
              return <RareMod
                itembase={itembase}
                selected={selected[id]}
                updateValue={(id, s) => {
                  setSelected({...selected, [id]: s})
                }}
                id={id}
                regexInfo={mod}/>;
            })}
          </div>
          {suffix && <div className="eq-col-2">
              <h2>{cleanCategoryName(suffix.category)}</h2>
            {suffix.modifiers.map((mod) => {
              const id = itemRegex.basetype + "-" + suffix.category + "-" + mod.desc;
              return <RareMod
                itembase={itembase}
                selected={selected[id]}
                updateValue={(id, s) => {
                  setSelected({...selected, [id]: s})
                }}
                id={id}
                regexInfo={mod}/>;
            })}
          </div>}
        </div>)
      })}
  </>)
}


const cleanCategoryName = (category: string): string => category
  .replace(RegExp("suffix_?"), "Suffix")
  .replace(RegExp("prefix_?"), "Prefix")
  .replace("adjudicator", " Warlord")
  .replace("basilisk", " Hunter")
  .replace("crusader", " Crusader")
  .replace("eyrie", " Redeemer")
  .replace("elder", " Elder")
  .replace("shaper", " Shaper")

const categoryOrder = (a: CategoryRegex, b: CategoryRegex) => {
  const priorityMap: Record<string, number> = {
    '': -1,
    'shaper': 0,
    'elder': 1,
    'basilisk': 2,
    'crusader': 3,
    'eyrie': 4,
    'adjudicator': 5,
  };
  const getPriority = (group: string) => {
    const name = group.replace(RegExp("(prefix|suffix)_?"), "");
    return priorityMap[name] ?? Infinity;
  };
  return getPriority(a.category) - getPriority(b.category);
};

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

  return (<div
    className={classNames("rare-mod-input", "grouped-token-list-group", {"rare-mod-selected": localSelected.selected})}
    key={id}
    onClick={() => {
      setLocalSelected({...localSelected, selected: !localSelected.selected, itembase})
    }}>
    {!hasRange ? <span>{regexInfo.desc}</span> :
      regexInfo.desc.replace("|", " • ").split("#").map((e, index) => {
        const range = regexInfo.stats[index] ?? {id: index, min: '#', max: '#', numberIndex: index, hasRange: false}

        if (regexInfo.before.includes(index) || regexInfo.after.includes(index) || regexInfo.on.includes(index)) {
          return (
            <span key={id + index}>
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