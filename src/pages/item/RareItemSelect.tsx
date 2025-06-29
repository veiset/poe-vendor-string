import {CategoryRegex, ItemAffixRegex, ItemRegex} from "../../generated/GeneratedItemMods";
import {Itembase} from "./ItemBaseSelector";
import classNames from "classnames";
import {categoryOrder, cleanCategoryName, groupedCategory} from "./GroupUtils";

export interface RateItemSelectProps {
  itemRegex: ItemRegex
  itembase: Itembase
  selected: { [key: string]: RareModSelection }
  setSelected: (selected: { [key: string]: RareModSelection }) => void
  displayTiers: boolean
}

export type RareModSelection = {
  itembase: Itembase;
  selected: boolean;
  values: {
    [key: number]: string;
  };
};

const RareItemSelect = (props: RateItemSelectProps) => {

  const {itemRegex, selected, setSelected, itembase, displayTiers} = props;

  const filteredCategories: CategoryRegex[] = itemRegex.categoryRegex
    .filter((e) => e.category !== "searing_exarch_implicit")
    .filter((e) => e.category !== "searing_exarch_implicit");
  const groupedCategories = groupedCategory(filteredCategories);

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
                displayTiers={displayTiers}
                itembase={itembase}
                selected={selected}
                setSelected={setSelected}
                id={id}
                regexInfo={mod}/>;
            })}
          </div>
          {suffix && <div className="eq-col-2">
              <h2>{cleanCategoryName(suffix.category)}</h2>
            {suffix.modifiers.map((mod) => {
              const id = itemRegex.basetype + "-" + suffix.category + "-" + mod.desc;
              return <RareMod
                displayTiers={displayTiers}
                itembase={itembase}
                selected={selected}
                setSelected={setSelected}
                id={id}
                regexInfo={mod}/>;
            })}
          </div>}
        </div>)
      })}
  </>)
}


interface RareModProps {
  id: string
  itembase: Itembase
  regexInfo: ItemAffixRegex
  selected: { [key: string]: RareModSelection }
  setSelected: (selected: { [key: string]: RareModSelection }) => void
  displayTiers: boolean
}


const RareMod = (props: RareModProps) => {
  const {regexInfo, id, selected, setSelected, itembase, displayTiers} = props;
  const decimalRegex = /\b\d+\.\d+\b/;
  const defaultState: RareModSelection = {
    itembase: {
      baseType: "unknown",
      item: "unknown",
      rarity: "Rare",
    },
    selected: false,
    values: {}
  }

  const hasRange = regexInfo.stats.find((e) => e.hasRange) && !decimalRegex.test(regexInfo.affixes[0].name);
  const data = {...defaultState, ...selected[id]};

  return (<div
    className={classNames("rare-mod-input", "grouped-token-list-group", {"rare-mod-selected": selected[id]?.selected ?? false})}
    key={id}
    onClick={() => {
      const updatedValue = {...selected[id] ?? defaultState, selected: !data.selected, itembase};
      setSelected({...selected, [id]: updatedValue});
    }}>
    {!hasRange ? <span>{regexInfo.desc}</span> :
      regexInfo.desc.replace("|", " • ").split("#").map((e, index) => {
        const range = regexInfo.stats[index] ?? {id: index, min: '#', max: '#', numberIndex: index, hasRange: false}

        if (regexInfo.before.includes(index) || regexInfo.after.includes(index) || regexInfo.on.includes(index)) {
          return (
            <span key={id + index}>
              <span>{e}</span><input
              key={"input-" + id}
              placeholder={`${range.min}-${range.max}`}
              type="number"
              onClick={(e) => e.stopPropagation()}
              value={data.values[index] ?? ""}
              onChange={(e) => {
                const values = data.values;
                values[index] = e.target.value;
                const updatedValue = {selected: true, values, itembase};
                setSelected({...selected, [id]: updatedValue});
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
    {data.selected && displayTiers && <div className="rare-display-affixes">
      {[...regexInfo.affixes].reverse().map((e, i) => {
        return <div onClick={(e) => e.stopPropagation()}><span className="mod-tier">T{i + 1}</span> {e.name}</div>
      })}
    </div>}
  </div>)
}

export default RareItemSelect;