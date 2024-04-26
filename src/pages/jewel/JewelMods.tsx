import JewelModList from "./JewelModList";
import React from "react";
import {JewelRegex} from "../../generated/GeneratedJewel";

export interface JewelModsProps {
  mods: JewelRegex[]
  selected: string[]
  setSelected: (selected: string[]) => void
}

const JewelMods = (props: JewelModsProps) => {

  const {mods, selected, setSelected} = props;

  return (
    <>
      <div className="eq-col-2">
        <div className="flask-checkbox-padding">
          <div className="column-header">Prefix</div>
          <JewelModList
            id="prefix"
            affixes={mods.filter((e) => e.isPrefix)}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>
      <div className="eq-col-2">
        <div className="flask-checkbox-padding">
          <div className="column-header">Suffix</div>
          <JewelModList
            id="suffix"
            affixes={mods.filter((e) => !e.isPrefix)}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>
    </>
  )
}

export default JewelMods;