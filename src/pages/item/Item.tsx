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
  }, [selectedRareMods, selectedMagicMods, itembase, onlyIfBothPrefixAndSuffix, matchOpenAffix]);

  return (<>
      <Header text={"Item"}/>
      <RegexResultBox
        result={result}
        reset={() => {
          if (itembase?.rarity === "Rare") {
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
      <ItemBaseSelector itemBase={itembase} setItemBase={setItembase}/>
      {itembase && <h2>Selected: <span className={"item-" + itembase.rarity}>{itembase.item}</span></h2>}
      {regexMods && itembase?.rarity === "Rare" && <ModWarning itemRegex={regexMods}/>}
      <div className="break"/>
      {itembase && regexMods && itembase.rarity === "Rare" &&
          <RareItemSelect
              itemRegex={regexMods}
              itembase={itembase}
              displayTiers={true}
              setSelected={setSelectedRareMods}
              selected={selectedRareMods}
          />}
      {itembase && regexMods && itembase.rarity === "Magic" &&
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