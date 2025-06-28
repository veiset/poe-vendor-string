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
import {generateRareItemRegex} from "./ItemOuput";
import {defaultSettings} from "../../utils/SavedSettings";


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


  useEffect(() => {
    if (itembase) {
      setRegexMods(itemRegex[itembase.baseType]);
    }
  }, [itembase]);

  useEffect(() => {
    setResult(generateRareItemRegex(affixMap, itembase, selectedRareMods));
    saveSettings({
      ...profile,
      itemCrafting: {itembase, selectedRareMods,}
    })
  }, [selectedRareMods]);

  return (<>
      <Header text={"Item"}/>
      <RegexResultBox
        result={result}
        reset={() => {
          // setItembase(defaultSettings.itemCrafting.itembase);
          setSelectedRareMods(defaultSettings.itemCrafting.selectedRareMods);
        }}
        customText={""}
        setCustomText={() => {
        }}
        enableCustomText={false}
        setEnableCustomText={() => {
        }}
      />
      <ItemBaseSelector itemBase={itembase} setItemBase={setItembase}/>
      {regexMods && <ModWarning itemRegex={regexMods}/>}
      {itembase && <h2>Selected: <span className={"item-" + itembase.rarity}>{itembase.item}</span></h2>}
      <div className="break"/>
      {itembase && regexMods && itembase.rarity === "Rare" &&
          <RareItemSelect itembase={itembase} setSelected={setSelectedRareMods} selected={selectedRareMods} itemRegex={regexMods}/>}
    </>
  )

}

export default Item;