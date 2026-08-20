import {Itembase, ItemRegex} from "../../types/generated/ItemTypedef";
import {ItemSettings} from "../../settings";
import FilterCard from "@shared/components/FilterCard/FilterCard";

interface ItemBaseSelectorProps {
  searchText: string;
  setSearchText: (text: string) => void;
  filteredItems: { baseType: string; item: string }[];
  setItemBase: (itemBase: Itembase) => void;
  settings: ItemSettings;
  setSettings: (settings: ItemSettings) => void;
  currentItemRegex: ItemRegex | undefined;
}

export function ItemBaseSelector({
  searchText,
  setSearchText,
  filteredItems,
  setItemBase,
  settings,
  setSettings,
  currentItemRegex,
}: ItemBaseSelectorProps) {
  return (
    <FilterCard title="Select item base" headerControl={
      settings.itemBase && currentItemRegex ? (
        <div className="radio-button-modgroup radio-button-modgroup-sm">
          <input type="radio" id="rare-mods-any" name="rareSettings.matchAnyMod"
                 checked={settings.rareSettings.matchAnyMod}
                 onChange={() => {
                   setSettings({
                     ...settings,
                     rareSettings: {
                       matchAnyMod: true,
                     },
                   });
                 }}/>
          <label htmlFor="rare-mods-any" className="radio-first-ele">Match <b>any</b></label>
          <input type="radio" id="rare-mods-all" name="rareSettings.matchAnyMod"
                 checked={!settings.rareSettings.matchAnyMod}
                 onChange={() => {
                   setSettings({
                     ...settings,
                     rareSettings: {
                       matchAnyMod: false,
                     },
                   });
                 }}/>
          <label htmlFor="rare-mods-all">Match <b>all</b></label>
        </div>
      ) : undefined
    }>
      <div className="poe2-item-search-wrapper">
        <input
          type="search"
          placeholder="Search for item..."
          className="modifier-search-box"
          style={{width: "100%", margin: 0}}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {filteredItems.length > 0 && (
          <div className="poe2-item-dropdown">
            {filteredItems.map((item, i) => (
              <div
                key={`${item.baseType}-${item.item}-${i}`}
                className="poe2-item-dropdown-row"
                onClick={() =>
                  setItemBase({
                    baseType: item.baseType,
                    item: item.item,
                  })
                }
              >
                {item.baseType} - {item.item}
              </div>
            ))}
          </div>
        )}
      </div>
      {settings.itemBase && (
        <p className="poe2-selected-base">
          Selected: <span className="poe2-selected-base-name">{settings.itemBase.item}</span>
          <span> ({settings.itemBase.baseType})</span>
        </p>
      )}

      {currentItemRegex && settings.itemBase && (
        <ModWarnings itemRegex={currentItemRegex}/>
      )}
    </FilterCard>
  );
}

function ModWarnings({itemRegex}: { itemRegex: ItemRegex }) {
  const warnings = itemRegex.itemRegexForCategory.flatMap((e) => e.warnings ?? []);
  if (warnings.length === 0) return null;
  return (
    <details style={{paddingTop: "4px"}}>
      <summary style={{cursor: "pointer", fontSize: "13px", color: "var(--color-text-muted)"}}>
        Show warnings / mod conflicts for {itemRegex.basetype}{" "}
        <span className="poe2-selected-base-name">({warnings.length})</span>
      </summary>
      <div>
        {warnings.map((w, i) => (
          <div key={i} className="poe2-selected-base-name" style={{fontSize: "13px"}}>
            duplicate: {w}
          </div>
        ))}
      </div>
    </details>
  );
}
