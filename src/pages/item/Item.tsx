import React, {useContext, useEffect, useState} from "react";
import {ProfileContext} from "../../components/profile/ProfileContext";
import {loadSettings} from "../../utils/LocalStorage";
import Header from "../../components/Header";
import RegexResultBox from "../../components/RegexResultBox/RegexResultBox";
import ItemBaseSelector, {ItemBase} from "./ItemBaseSelector";
import "./Item.css";
import {ItemRegex, itemRegex} from "../../generated/GeneratedItemMods";
import RareItemSelect from "./RareItemSelect";
import ModWarning from "./ModWarning";


const Item = () => {
  const {globalProfile} = useContext(ProfileContext);
  const profile = loadSettings(globalProfile);

  const [itemBase, setItemBase] = useState<ItemBase | undefined>(undefined);
  const [regexMods, setRegexMods] = useState<ItemRegex | undefined>(undefined);


  useEffect(() => {
    if (itemBase) {
      setRegexMods(itemRegex[itemBase.baseType]);
    }
  }, [itemBase]);

  return (<>
      <Header text={"Item"}/>
      <RegexResultBox
        result={""}
        reset={() => {
        }}
        customText={""}
        setCustomText={() => {
        }}
        enableCustomText={false}
        setEnableCustomText={() => {
        }}
      />
      <ItemBaseSelector itemBase={itemBase} setItemBase={setItemBase}/>
      {regexMods && <ModWarning itemRegex={regexMods}/>}
      {itemBase && <h2>Selected: <span className={"item-" + itemBase.rarity}>{itemBase.item}</span></h2>}
      <div className="break"/>
      {itemBase && regexMods && itemBase.rarity === "Rare" && <RareItemSelect itemRegex={regexMods}/>}
    </>
  )

}

export default Item;