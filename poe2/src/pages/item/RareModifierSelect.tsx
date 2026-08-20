import {SelectedItemMod} from "../../settings";
import {Itembase, ItemModifier, ItemRegex, ItemRegexCategory} from "../../types/generated/ItemTypedef";
import React, {useMemo} from "react";
import ModSearchBox from "@shared/components/ModSearchBox";
import FilterCard from "@shared/components/FilterCard/FilterCard";

function cleanCategoryName(category: string): string {
  return category
    .replace(/suffix_?/, "Suffix ")
    .replace(/prefix_?/, "Prefix ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function groupCategories(categories: ItemRegexCategory[]): Record<string, ItemRegexCategory[]> {
  return categories.reduce<Record<string, ItemRegexCategory[]>>((acc, cat) => {
    const key = cat.modCategory.replace(/(suffix|prefix)_?/, "");
    if (!acc[key]) acc[key] = [];
    acc[key].push(cat);
    return acc;
  }, {});
}

interface ModifierItemProps {
  mod: ItemModifier;
  cat: ItemRegexCategory;
  itemBase: Itembase;
  selected: SelectedItemMod[];
  setSelected: (mods: SelectedItemMod[]) => void;
}

const ModifierItem = React.memo(({mod, cat, itemBase, selected, setSelected}: ModifierItemProps) => {
  const modEntry = selected.find(
    (s) =>
      s.basetype === itemBase.baseType &&
      s.category === cat.modCategory &&
      s.itemModifier.description === mod.description
  );
  const isSelected = modEntry?.selected ?? false;
  const values = modEntry?.values ?? {};

  const toggle = () => {
    if (modEntry) {
      setSelected(selected.map((s) => (s === modEntry ? {...s, selected: !s.selected} : s)));
    } else {
      setSelected([
        ...selected,
        {
          basetype: itemBase.baseType,
          category: cat.modCategory,
          itemModifier: mod,
          values: {},
          selected: true,
        },
      ]);
    }
  };

  const updateValue = (index: number, value: string) => {
    const newValues = {...values, [index]: value};
    if (modEntry) {
      setSelected(selected.map((s) => (s === modEntry ? {...s, values: newValues, selected: true} : s)));
    } else {
      setSelected([
        ...selected,
        {
          basetype: itemBase.baseType,
          category: cat.modCategory,
          itemModifier: mod,
          values: newValues,
          selected: true,
        },
      ]);
    }
  };

  const decimalRegex = /\b\d+\.\d+\b/;
  const hasRange = useMemo(() =>
    mod.stats.some((s) => s.hasRange) && !decimalRegex.test(mod.affixes[0]?.name ?? ""),
    [mod.stats, mod.affixes]
  );

  const renderDescription = () => {
    if (!hasRange) return <span>{mod.description}</span>;

    return mod.description.split("#").map((part, index) => {
      const stat = mod.stats[index] ?? {min: "#", max: "#", numberIndex: index, hasRange: false, id: ""};
      const pos = mod.regexPosition;

      if (pos.before.includes(index) || pos.after.includes(index) || pos.on.includes(index)) {
        return (
          <span key={index}>
            <span>{part}</span>
            <input
              placeholder={`${stat.min}-${stat.max}`}
              type="number"
              className="poe2-item-mod-input"
              onClick={(e) => e.stopPropagation()}
              value={values[index] ?? ""}
              onChange={(e) => {
                e.stopPropagation();
                updateValue(index, e.target.value);
              }}
            />
          </span>
        );
      } else if (pos.disabled.includes(index)) {
        return (
          <span key={index}>
            {part}
            <span>{stat.min}-{stat.max}</span>
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div
      className={isSelected ? "poe2-item-mod selectable-item selected-mod" : "poe2-item-mod selectable-item"}
      onClick={toggle}
    >
      {renderDescription()}
      {isSelected && (
        <div>
          {[...mod.affixes].reverse().map((a, i) => (
            <div
              key={i}
              className="poe2-item-mod-affix"
              onClick={(e) => e.stopPropagation()}
            >
              <b>T{i + 1}</b> {a.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export function RareModifierSelect({itemRegex, itemBase, selected, setSelected}: {
  itemRegex: ItemRegex;
  itemBase: Itembase;
  selected: SelectedItemMod[];
  setSelected: (mods: SelectedItemMod[]) => void;
}) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredGrouped = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    const filteredCategories = itemRegex.itemRegexForCategory
      .filter((cat) => cat.modCategory !== "corrupted" && cat.modCategory !== "unique")
      .map((cat) => ({
        ...cat,
        modifiers: cat.modifiers.filter((mod) =>
          mod.description.toLowerCase().includes(q) ||
          mod.affixes.some(a => a.name.toLowerCase().includes(q))
        ),
      }))
      .filter((cat) => cat.modifiers.length > 0);

    return groupCategories(filteredCategories);
  }, [itemRegex.itemRegexForCategory, searchTerm]);

  return (
    <div className="full-size">
      <ModSearchBox id="rare-modifier-search" search={searchTerm} setSearch={setSearchTerm}
                    placeholder="Search modifiers..."/>
      {Object.entries(filteredGrouped).map(([groupKey, cats]) => (
        <div key={groupKey} className="filter-card-grid" style={{paddingLeft: 0, paddingRight: 0}}>
          {cats.map((cat) => (
            <FilterCard key={cat.modCategory} title={cleanCategoryName(cat.modCategory)}>
              {cat.modifiers.map((mod) => (
                <ModifierItem
                  key={`${cat.modCategory}-${mod.description}`}
                  mod={mod}
                  cat={cat}
                  itemBase={itemBase}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </FilterCard>
          ))}
        </div>
      ))}
    </div>
  );
}
