import {Affix, CategoryRegex, ItemRegex} from "../../generated/GeneratedItemMods";
import {Itembase} from "./ItemBaseSelector";
import GroupedTokenList, {GroupedTokens} from "../../components/GroupedTokenList/GroupedTokenList";
import React from "react";
import {ItemAffixRegex} from "../../generated/GeneratedItemMods";
import {categoryOrder, cleanCategoryName, groupedCategory} from "./GroupUtils";

interface MagicItemSelectProps {
  itemRegex: ItemRegex
  itembase: Itembase
  selected: SelectedMagicMod[]
  setSelected: (selected: SelectedMagicMod[]) => void
}

export interface SelectedMagicMod {
  basetype: string
  category: string
  regex: Affix
  desc: string
}

const MagicItemSelect = (props: MagicItemSelectProps) => {
  const {itembase, itemRegex, selected, setSelected} = props;

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

        const affixes: Affix[] = ((prefix.modifiers).concat(suffix?.modifiers ?? []).flatMap((e) => e.affixes));

        const toggle = (key: string) => {
          const mod = {
            basetype: itemRegex.basetype,
            category: prefix.category,
            regex: affixes.find((a) => a.name === key)!!,
            desc: key
          };
          const isSelected = selected.find((e) => e.desc === key && e.basetype === itemRegex.basetype);

          isSelected
          ? setSelected(selected.filter((e) => e.desc !== key || e.basetype !== itemRegex.basetype))
          : setSelected(selected.concat(mod));
        }

        return (<div className="rare-mod-group full-size row">
          <div className="eq-col-2">
            <h2>{cleanCategoryName(prefix.category)}</h2>
            <GroupedTokenList
              disableSearch={true}
              groups={modsToGroupedTokens(prefix.modifiers)}
              selected={selected.filter((e) => e.basetype === itembase.baseType).map((e) => e.desc)}
              setSelected={(key: string) => toggle(key)}
            />
          </div>
          {suffix && <div className="eq-col-2">
              <h2>{cleanCategoryName(suffix.category)}</h2>
              <GroupedTokenList
                  disableSearch={true}
                  groups={modsToGroupedTokens(suffix.modifiers)}
                  selected={selected.filter((e) => e.basetype === itembase.baseType).map((e) => e.desc)}
                  setSelected={(key: string) => toggle(key)}
              />
          </div>
          }
        </div>)
      })}
  </>)
}

function modsToGroupedTokens(modifiers: ItemAffixRegex[] | undefined): GroupedTokens[] {
  if (modifiers === undefined) return [];
  return modifiers.map((mod) => ({
    groupName: mod.desc,
    tokens: mod.affixes.map((e) => e.name).reverse()
  }))
}

export default MagicItemSelect;