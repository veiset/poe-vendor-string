import React, {useContext, useEffect, useState} from "react";
import {ProfileContext} from "../../components/profile/ProfileContext";
import {loadSettings, saveSettings} from "../../utils/LocalStorage";
import Header from "../../components/Header";
import {regexMapModifiersRegular} from "../../generated/GeneratedMapModsRegular";
import {regexMapModifierT17} from "../../generated/GeneratedMapModsT17";
import SelectableTokenList from "../../components/SelectableTokenList/SelectableTokenList";
import ResultBox from "../../components/ResultBox";
import {getGradientColor} from "../../utils/ColorGradient";
import {defaultSettings, MapSettings} from "../../utils/SavedSettings";
import {Checkbox} from "../vendor/Vendor";
import {generateMapModRegex} from "./OptimizedMapOutput";
import Dropdown from "../../components/dropdown/Dropdown";
import "./OptimizedMapMods.css";

const regexT17 = regexMapModifierT17;
const regexRegular = regexMapModifiersRegular;

const OptimizedMapMods = () => {
  const {globalProfile} = useContext(ProfileContext);
  const profile = loadSettings(globalProfile);
  const [result, setResult] = useState("");
  const [selectedBadIds, setSelectedBadIds] = useState<number[]>(profile.map.badIds);
  const [selectedGoodIds, setSelectedGoodIds] = useState<number[]>(profile.map.goodIds);
  const [modGrouping, setModGrouping] = useState(profile.map.allGoodMods);
  const [quantity, setQuantity] = useState(profile.map.quantity);
  const [packsize, setPacksize] = useState(profile.map.packsize);
  const [optimizeQuant, setOptimizeQuant] = useState(profile.map.optimizeQuant);
  const [optimizePacksize, setOptimizePacksize] = useState(profile.map.optimizePacksize);
  const [optimizeQuality, setOptimizeQuality] = useState(profile.map.optimizeQuality);
  const [rarity, setRarity] = useState(profile.map.rarity);
  const [quality, setQuality] = useState(profile.map.quality);
  const [t17, setT17] = useState(profile.map.t17);
  const [regex, setRegex] = useState(t17 ? regexT17 : regexRegular);

  useEffect(() => {
    setRegex(t17 ? regexT17 : regexRegular);
  }, [t17]);

  useEffect(() => {
    let settings: MapSettings = {
      badIds: selectedBadIds,
      goodIds: selectedGoodIds,
      allGoodMods: modGrouping,
      quantity,
      packsize,
      optimizeQuant,
      optimizePacksize,
      optimizeQuality,
      rarity,
      quality,
      t17,
    };
    saveSettings({
      ...profile,
      map: {...settings},
    });
    setResult(generateMapModRegex(settings, regex));
  }, [result, rarity, quality, selectedBadIds, selectedGoodIds, modGrouping, quantity, packsize, optimizeQuant, optimizePacksize, optimizeQuality, regex]);

  return (
    <>
      <Header text={"Optimized Map Modifiers"}/>
      <ResultBox result={result} warning={undefined} reset={() => {
        setSelectedBadIds(defaultSettings.map.badIds);
        setSelectedGoodIds(defaultSettings.map.goodIds);
        setOptimizePacksize(defaultSettings.map.optimizePacksize);
        setOptimizeQuant(defaultSettings.map.optimizeQuant);
        setModGrouping(defaultSettings.map.allGoodMods)
        setQuantity(defaultSettings.map.quantity);
        setPacksize(defaultSettings.map.packsize);
        setRarity(defaultSettings.map.rarity);
        setQuality(defaultSettings.map.quality);
      }}/>
      <div className="break"/>
      <div className="full-size generic-top-element">
        <label className="modifier-search-label" htmlFor="quantity">Quantity of at least</label>
        <input type="search" className="modifier-quantity-box" id="quantity" name="search-mod" value={quantity}
               onChange={v => setQuantity(v.target.value)}/>

        <label className="modifier-search-label" htmlFor="pack-size">Pack Size of at least</label>
        <input type="search" className="modifier-quantity-box" id="pack-size" name="search-mod" value={packsize}
               onChange={v => setPacksize(v.target.value)}/>

        <label className="modifier-search-label" htmlFor="quality">Map Quality of at least</label>
        <input type="search" className="modifier-quantity-box" id="quality" name="search-mod" value={quality.value}
               onChange={v => setQuality({...quality, value: v.target.value})}/>
        <Dropdown
          elements={["regular", "scarabs", "maps", "currency"]}
          selected={quality.type}
          setSelected={(selected) => setQuality({...quality, type: selected})}
        />

        <Checkbox label="Optimize Quantity value (round down to nearest 10, saves a lot of query space)"
                  value={optimizeQuant}
                  onChange={setOptimizeQuant}/>
        <Checkbox label="Optimize Pack Size value" value={optimizePacksize}
                  onChange={setOptimizePacksize}/>
        <Checkbox label="Optimize Map Quality value" value={optimizeQuality}
                  onChange={setOptimizeQuality}/>

        <div className="rarity-select">
          <Checkbox label="Normal Maps" value={rarity.normal}
                    onChange={(e) => setRarity({...rarity, normal: !!e})}/>
          <Checkbox label="Magic Maps" value={rarity.magic}
                    onChange={(e) => setRarity({...rarity, magic: !!e})}/>
          <Checkbox label="Rare Maps" value={rarity.rare}
                    onChange={(e) => setRarity({...rarity, rare: !!e})}/>
          <div className="radio-button-modgroup">
            <input type="radio" className="radio-button-map" id="maps-include" name="map-include"
                   defaultChecked={rarity.include}
                   checked={rarity.include}
                   onChange={v => setRarity({...rarity, include: true})}/>
            <label htmlFor="maps-include" className="radio-button-map radio-first-ele">Include</label>
            <input type="radio" id="maps-exclude" name="map-include" defaultChecked={!rarity.include}
                   checked={!rarity.include}
                   onChange={v => setRarity({...rarity, include: false})}/>
            <label htmlFor="maps-exclude" className="radio-button-map">Exclude</label>
          </div>
        </div>
        <div className="break spacer-top"/>
        <Checkbox label="Tier 17 Map Modifiers" className="tier17-color" value={t17}
                  onChange={setT17}/>
      </div>
      <div className="eq-col-2 box-small-padding">
        <div className="column-header map-column-text">I don't want any of these mods</div>
      </div>
      <div className="eq-col-2 box-small-padding">
        <div className="column-header map-column-text">I want these mods</div>
        <div className="radio-button-modgroup">
          <input type="radio" className="radio-button-map" id="mods-any" name="mods" value="any"
                 checked={!modGrouping}
                 onChange={v => setModGrouping(!v.target.checked)}/>
          <label htmlFor="mods-any" className="radio-button-map radio-first-ele">I want <b>any</b> of the
            modifiers</label>
          <input type="radio" id="mods-all" name="mods" value="all" checked={modGrouping}
                 onChange={v => setModGrouping(v.target.checked)}/>
          <label htmlFor="mods-all" className="radio-button-map">I want <b>all</b> of the modifiers</label>
        </div>
      </div>
      <div className="break"/>
      <div className="eq-col-2">
        <SelectableTokenList
          sortFn={(a, b) => {
            return b.options.scary - a.options.scary
          }}
          colorFun={(isSelected, token) => {
            if (isSelected) return "#ffffff";
            if (token.options.scary < 100) return "#ffffff";
            if (token.options.scary > 1100) return "#eab7fc";
            return getGradientColor("#FC9090", "#ffffff", (1100 - token.options.scary) / 1100);
          }}
          elements={regex.tokens}
          setSelected={setSelectedBadIds}
          selected={selectedBadIds}
        />
      </div>
      <div className="eq-col-2">
        <SelectableTokenList
          sortFn={(a, b) => {
            return a.options.scary - b.options.scary
          }}
          colorFun={(isSelected, token) => {
            if (isSelected) return "#ffffff";
            if (token.options.scary < 100) return "#ffffff";
            if (token.options.scary > 1100) return "#eab7fc";
            return getGradientColor("#FC9090", "#ffffff", (1100 - token.options.scary) / 1100);
          }}
          elements={regex.tokens}
          setSelected={setSelectedGoodIds}
          selected={selectedGoodIds}
        />
      </div>
    </>
  )
}


export default OptimizedMapMods;