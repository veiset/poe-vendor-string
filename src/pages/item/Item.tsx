import React, {useContext, useState} from "react";
import {ProfileContext} from "../../components/profile/ProfileContext";
import {loadSettings} from "../../utils/LocalStorage";
import Header from "../../components/Header";
import RegexResultBox from "../../components/RegexResultBox/RegexResultBox";
import ItemBaseSelector, {ItemBase} from "./ItemBaseSelector";
import "./Item.css";
import {itemRegex} from "../../generated/GeneratedItemMods";


const Item = () => {
  const {globalProfile} = useContext(ProfileContext);
  const profile = loadSettings(globalProfile);

  const [itemBase, setItemBase] = useState<ItemBase | undefined>(undefined);


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
      {itemBase && <>
          <h2>Selected: <span className={"item-" + itemBase.rarity}>{itemBase.item}</span></h2>
      </>}
      {itemBase && <div>
          <div>
              Duplicate mod:
            {JSON.stringify(itemRegex[itemBase.baseType].categoryRegex.flatMap((e) => e.warnings))}
          </div>
          <p>---------- ------ </p>
          <div>
            {JSON.stringify(itemRegex[itemBase.baseType].categoryRegex.map((e) => e.modifiers))}
          </div>
      </div>}
    </>
  )

}

export default Item;