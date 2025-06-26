import {ItemAffixRegex, ItemRegex} from "../../generated/GeneratedItemMods";
import React from "react";
import {splitOnNthOccurrence} from "../../utils/StringUtils";

interface RateItemSelectProps {
  itemRegex: ItemRegex
}

const RareItemSelect = (props: RateItemSelectProps) => {

  const {itemRegex} = props;

  const prefixCategories = itemRegex.categoryRegex
    .filter((e) => e.category !== "corrupted")
    .filter((e) => e.modifiers[0].affixtype === "PREFIX");
  const suffixCategories = itemRegex.categoryRegex
    .filter((e) => e.modifiers[0].affixtype === "SUFFIX");

  return (<div className="full-size row">
    <div className="eq-col-2">
      <p>Prefix</p>
      {prefixCategories.map((e) => {
        return <div>
          <div className="modgroup-header">{e.category}</div>
          <div>{e.modifiers.map((e) => <RareMod regexInfo={e}/>)}</div>
        </div>
      })}
    </div>
    <div className="eq-col-2">
      <p>Suffix</p>
      {suffixCategories.map((e) => {
        return <div>
          <div className="modgroup-header">{e.category}</div>
          <div>{e.modifiers.map((e) => <RareMod regexInfo={e}/>)}</div>
        </div>
      })}
    </div>
  </div>)
}

interface RareModProps {
  regexInfo: ItemAffixRegex
}

const RareMod = (props: RareModProps) => {
  const {regexInfo} = props;

  if (regexInfo.stats.find((e) => e.hasRange)) {
    const before = regexInfo.nbefore > 0;
    const after = regexInfo.nafter > 0;
    const middle = !before && !after;

    if (regexInfo.desc.includes("|")) {
      return <div className="mod-multipart">(multipart){regexInfo.desc}</div>
    }
    if (middle) return <div className="mod-warning">(number-middle){regexInfo.desc}</div>
    if (after) return <div className="mod-after">(number-after){regexInfo.desc}</div>
    if (before) {
      const parts = (regexInfo.desc).split("#");
      return (<div className="rare-mod-input">
        {parts.map((e, index) => {
            const a = regexInfo.stats[index]
            return <span>{e}{index < regexInfo.nbefore && <input placeholder={`${a.min}-${a.max}`} type="number"/>}</span>
          }
        )}
      </div>)
    }

    return <div className="mod-warning">{regexInfo.desc} -- <span
      className="mod-extra-info">{JSON.stringify(regexInfo)}</span></div>
  }

  return <>{regexInfo.affixes[0].name}</>;
}

export default RareItemSelect;