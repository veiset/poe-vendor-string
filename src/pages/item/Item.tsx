import React, {useContext, useEffect, useState} from "react";
import {ProfileContext} from "../../components/profile/ProfileContext";
import {loadSettings, saveSettings} from "../../utils/LocalStorage";
import Header from "../../components/Header";
import RegexResultBox from "../../components/RegexResultBox/RegexResultBox";
import ItemBaseSelector, {Itembase} from "./ItemBaseSelector";
import "./Item.css";
import {ItemAffixRegex, ItemRegex, itemRegex} from "../../generated/GeneratedItemMods";
import RareItemSelect, {RareModSelection} from "./RareItemSelect";
import ModWarning from "./ModWarning";
import {generateMagicItemRegex, generateRareItemRegex} from "./ItemOuput";
import {defaultSettings} from "../../utils/SavedSettings";
import MagicItemSelect, {SelectedMagicMod} from "./MagicItemSelect";
import {Checkbox} from "../vendor/Vendor";
import Infobox from "../../components/infobox/Infobox";
import InfoBanner from "../../components/InfoBanner/InfoBanner";

const Item = () => {
  const {globalProfile} = useContext(ProfileContext);
  const profile = loadSettings(globalProfile);

  const affixMap: Record<string, ItemAffixRegex> = Object.entries(itemRegex)
    .flatMap(([basetype, item]) =>
      item.categoryRegex.flatMap(cat =>
        cat.modifiers.map(mod => ({
          key: `${basetype}-${cat.category}-${mod.desc}`,
          value: mod
        }))
      )
    )
    .reduce<Record<string, ItemAffixRegex>>((acc, {key, value}) => {
      acc[key] = value;
      return acc;
    }, {});

  const [result, setResult] = useState<string>("");
  const [itembase, setItembase] = useState<Itembase | undefined>(profile.itemCrafting.itembase);
  const [regexMods, setRegexMods] = useState<ItemRegex | undefined>(undefined);
  const [selectedRareMods, setSelectedRareMods] = useState<{
    [key: string]: RareModSelection
  }>(profile.itemCrafting.selectedRareMods);
  const [selectedMagicMods, setSelectedMagicMods] = useState<SelectedMagicMod[]>(profile.itemCrafting.selectedMagicMods);
  const [matchAnyMod, setMatchAnyMod] = useState(profile.itemCrafting.rareSettings.matchAnyMod);

  const [onlyIfBothPrefixAndSuffix, setOnlyIfBothPrefixAndSuffix] = useState(profile.itemCrafting.magicSettings.onlyIfBothPrefixAndSuffix);
  const [matchOpenAffix, setMatchOpenAffix] = useState(profile.itemCrafting.magicSettings.matchOpenAffix);

  useEffect(() => {
    if (itembase) {
      setRegexMods(itemRegex[itembase.baseType]);
    }
  }, [itembase]);

  useEffect(() => {
    const settings = {
      ...profile,
      itemCrafting: {
        itembase,
        selectedRareMods,
        selectedMagicMods,
        rareSettings: {
          matchAnyMod,
        },
        magicSettings: {
          onlyIfBothPrefixAndSuffix,
          matchOpenAffix,
        }
      }
    };

    if (itembase && itembase.rarity === "Rare") {
      setResult(generateRareItemRegex(affixMap, settings.itemCrafting));
    }
    if (itembase && itembase.rarity === "Magic") {
      setResult(generateMagicItemRegex(settings.itemCrafting));
    }
    saveSettings(settings)
  }, [selectedRareMods, selectedMagicMods, itembase, onlyIfBothPrefixAndSuffix, matchOpenAffix, matchAnyMod]);

  return (<>
      <Header text={"Item"}/>
      <RegexResultBox
        result={result}
        reset={() => {
          if (itembase?.rarity === "Rare") {
            setMatchAnyMod(defaultSettings.itemCrafting.rareSettings.matchAnyMod);
            setSelectedRareMods(defaultSettings.itemCrafting.selectedRareMods);
          }
          if (itembase?.rarity === "Magic") {
            // setSelectedMagicMods(defaultSettings.itemCrafting.selectedMagicMods);
            setSelectedMagicMods(selectedMagicMods.filter((e) => e.basetype !== itembase.baseType));
            setOnlyIfBothPrefixAndSuffix(defaultSettings.itemCrafting.magicSettings.onlyIfBothPrefixAndSuffix);
            setMatchOpenAffix(defaultSettings.itemCrafting.magicSettings.matchOpenAffix);
          }
        }}
        customText={""}
        setCustomText={() => {
        }}
        enableCustomText={false}
        setEnableCustomText={() => {
        }}
        enableBug={true}
      />
      <InfoBanner>
        <h2>Known issues (that will get fixed over time) - <a href="/#/items-old" className="source-link">old page</a></h2>
        <ul>
          <li>Clusters are missing notables</li>
          <li>Open prefix/suffix doesn't work for magic synth items</li>
          <li>Magic items with influenced mods will match any tier of the influenced mod</li>
          <li>Some ranges can be weird (the data is a bit weird)</li>
        </ul>
      </InfoBanner>

      <ItemBaseSelector itemBase={itembase} setItemBase={setItembase}/>
      {itembase && <h2>Selected: <span className={"item-" + itembase.rarity}>{itembase.item}</span></h2>}
      {regexMods && itembase?.rarity === "Rare" && <ModWarning itemRegex={regexMods}/>}
      <div className="break"/>
      {itembase && regexMods && itembase.rarity === "Rare" &&
          <div>
              <div className="radio-button-modgroup">
                  <input type="radio" className="radio-button-map" id="rare-mods-all" name="Match any rare mod"
                         defaultChecked={!matchAnyMod}
                         checked={!matchAnyMod}
                         onChange={v => setMatchAnyMod(false)}/>
                  <label htmlFor="rare-mods-all" className="radio-button-map radio-first-ele">Match if only ALL mods are
                      found</label>
                  <input type="radio" id="rare-mods-any" name="Match all rare mods" defaultChecked={matchAnyMod}
                         checked={matchAnyMod}
                         onChange={v => setMatchAnyMod(true)}/>
                  <label htmlFor="rare-mods-any" className="radio-button-map">Match if ANY mod is found</label>
              </div>
              <RareItemSelect
                  itemRegex={regexMods}
                  itembase={itembase}
                  displayTiers={true}
                  setSelected={setSelectedRareMods}
                  selected={selectedRareMods}
              />
          </div>
      }
      {
        itembase && regexMods && itembase.rarity === "Magic" &&
          <div>
              <Checkbox label="Only match if both prefix and suffix is found"
                        value={onlyIfBothPrefixAndSuffix}
                        onChange={setOnlyIfBothPrefixAndSuffix}/>
              <Checkbox label="Match an open prefix or suffix"
                        value={matchOpenAffix}
                        onChange={setMatchOpenAffix}/>
              <MagicItemSelect
                  itemRegex={regexMods}
                  itembase={itembase}
                  selected={selectedMagicMods}
                  setSelected={setSelectedMagicMods}
              />
          </div>
      }
    </>
  )

}

export default Item;