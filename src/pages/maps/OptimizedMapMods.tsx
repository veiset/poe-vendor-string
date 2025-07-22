import React, {useContext, useEffect, useState} from "react";
import {ProfileContext} from "../../components/profile/ProfileContext";
import {loadSettings, saveSettings} from "../../utils/LocalStorage";
import Header from "../../components/Header";
import {regexMapModifiersRegular} from "../../generated/GeneratedMapModsRegular";
import {regexMapModifierT17} from "../../generated/GeneratedMapModsT17";
import SelectableTokenList from "../../components/SelectableTokenList/SelectableTokenList";
import {getGradientColor} from "../../utils/ColorGradient";
import {defaultSettings, MapSettings} from "../../utils/SavedSettings";
import {Checkbox} from "../vendor/Vendor";
import {generateMapModRegex} from "./OptimizedMapOutput";
import Dropdown from "../../components/dropdown/Dropdown";
import "./OptimizedMapMods.css";
import RegexResultBox from "../../components/RegexResultBox/RegexResultBox";

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
  const [anyQuality, setAnyQuality] = useState(profile.map.anyQuality);
  const [rarity, setRarity] = useState(profile.map.rarity);
  const [corrupted, setCorrupted] = useState(profile.map.corrupted);
  const [quality, setQuality] = useState(profile.map.quality);
  const [t17, setT17] = useState(profile.map.t17);
  const [regex, setRegex] = useState(t17 ? regexT17 : regexRegular);
  const [mapDropChance, setMapDropChance] = useState(profile.map.mapDropChance);

  const [customTextStr, setCustomTextStr] = useState(profile.map.customText.value);
  const [enableCustomText, setEnableCustomText] = useState(profile.map.customText.enabled);

  useEffect(() => {
    setRegex(t17 ? regexT17 : regexRegular);
  }, [t17]);

  useEffect(() => {
    const settings: MapSettings = {
      badIds: selectedBadIds,
      goodIds: selectedGoodIds,
      allGoodMods: modGrouping,
      quantity,
      packsize,
      optimizeQuant,
      optimizePacksize,
      optimizeQuality,
      rarity,
      corrupted,
      quality,
      t17,
      anyQuality,
      customText: {
        value: customTextStr,
        enabled: enableCustomText,
      },
      mapDropChance,
    };
    saveSettings({
      ...profile,
      map: {...settings},
    });
    setResult(generateMapModRegex(settings, regex));
  }, [result, rarity, corrupted, quality, anyQuality, selectedBadIds, selectedGoodIds, modGrouping, quantity, packsize, optimizeQuant, optimizePacksize, optimizeQuality, customTextStr, enableCustomText, regex, mapDropChance]);

  return (
    <>
      <Header text={"Optimized Map Modifiers"}/>
      <RegexResultBox
        result={result}
        warning={undefined}
        customText={customTextStr}
        setCustomText={setCustomTextStr}
        enableCustomText={enableCustomText}
        setEnableCustomText={setEnableCustomText}
        reset={() => {
          setSelectedBadIds(defaultSettings.map.badIds);
          setSelectedGoodIds(defaultSettings.map.goodIds);
          setOptimizePacksize(defaultSettings.map.optimizePacksize);
          setOptimizeQuant(defaultSettings.map.optimizeQuant);
          setOptimizeQuality(defaultSettings.map.optimizeQuality);
          setModGrouping(defaultSettings.map.allGoodMods)
          setQuantity(defaultSettings.map.quantity);
          setPacksize(defaultSettings.map.packsize);
          setRarity(defaultSettings.map.rarity);
          setCorrupted(defaultSettings.map.corrupted);
          setQuality(defaultSettings.map.quality);
          setEnableCustomText(defaultSettings.map.customText.enabled);
          setCustomTextStr(defaultSettings.map.customText.value);
          setMapDropChance(defaultSettings.map.mapDropChance);
        }}
      />
      <div className="break"/>
      <div className="full-size generic-top-element">
        <label className="modifier-search-label" htmlFor="quantity">Quantity of at least</label>
        <input type="search" className="modifier-quantity-box" id="quantity" name="search-mod" value={quantity}
               onChange={v => setQuantity(v.target.value)}/>

        <label className="modifier-search-label" htmlFor="pack-size">Pack Size of at least</label>
        <input type="search" className="modifier-quantity-box" id="pack-size" name="search-mod" value={packsize}
               onChange={v => setPacksize(v.target.value)}/>

        <label className="modifier-search-label" htmlFor="mapdrop">More maps of at least</label>
        <input type="search" className="modifier-quantity-box" id="mapdrop" name="search-mod" value={mapDropChance}
               onChange={v => setMapDropChance(v.target.value)}/>
        <div className="break"/>

        <label className="modifier-search-label" htmlFor="qregular">Quality of</label>
        <input type="search" className="modifier-quantity-box" id="qregular" name="search-mod" value={quality.regular}
               onChange={v => setQuality({...quality, regular: v.target.value})}/>

        <label className="modifier-search-label" htmlFor="qpacksize">Pack size of</label>
        <input type="search" className="modifier-quantity-box" id="qpacksize" name="search-mod" value={quality.packSize}
               onChange={v => setQuality({...quality, packSize: v.target.value})}/>

        <label className="modifier-search-label" htmlFor="qrarity">Rarity of</label>
        <input type="search" className="modifier-quantity-box" id="qrarity" name="search-mod" value={quality.rarity}
               onChange={v => setQuality({...quality, rarity: v.target.value})}/>

        <label className="modifier-search-label" htmlFor="qcurrency">Currency of</label>
        <input type="search" className="modifier-quantity-box" id="qcurrency" name="search-mod" value={quality.currency}
               onChange={v => setQuality({...quality, currency: v.target.value})}/>

        <label className="modifier-search-label" htmlFor="qdiv">Divination of</label>
        <input type="search" className="modifier-quantity-box" id="qdiv" name="search-mod" value={quality.divination}
               onChange={v => setQuality({...quality, divination: v.target.value})}/>

        <label className="modifier-search-label" htmlFor="qscarab">Scarab of</label>
        <input type="search" className="modifier-quantity-box" id="qscarab" name="search-mod" value={quality.scarab}
               onChange={v => setQuality({...quality, scarab: v.target.value})}/>

        <div className="break"/>

        <Checkbox label="Match any of the quality types (disable this to match ALL selected quality)"
                  value={anyQuality}
                  onChange={setAnyQuality}/>

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
                   checked={rarity.include}
                   onChange={v => setRarity({...rarity, include: true})}/>
            <label htmlFor="maps-include" className="radio-button-map radio-first-ele">Include</label>
            <input type="radio" id="maps-exclude" name="map-include"
                   checked={!rarity.include}
                   onChange={v => setRarity({...rarity, include: false})}/>
            <label htmlFor="maps-exclude" className="radio-button-map">Exclude</label>
          </div>
        </div>
        <div className="rarity-select">
          <Checkbox label="Corrupted Map" value={corrupted.enabled}
                    onChange={(e) => setCorrupted({...corrupted, enabled: !corrupted.enabled})}/>
          <div className="radio-button-corrupted">
            <input type="radio" className="radio-button-map" id="corrupted-include" name="corrupted-include"
                   checked={corrupted.include}
                   onChange={v => setCorrupted({...corrupted, include: true})}/>
            <label htmlFor="corrupted-include" className="radio-button-map radio-first-ele">Include</label>
            <input type="radio" id="corrupted-exclude" name="corrupted-exclude"
                   checked={!corrupted.include}
                   onChange={v => setCorrupted({...corrupted, include: false})}/>
            <label htmlFor="corrupted-exclude" className="radio-button-map">Exclude</label>
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