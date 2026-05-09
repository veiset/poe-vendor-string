import React, {useContext, useEffect, useState} from "react";
import {ProfileContext} from "../../components/profile/ProfileContext";
import {loadSettings, saveSettings} from "../../utils/LocalStorage";
import {HeaderWithLanguage} from "../../components/Header";
import SelectableTokenList from "../../components/SelectableTokenList/SelectableTokenList";
import {defaultSettings, MapSettings} from "../../utils/SavedSettings";
import {Checkbox} from "../vendor/Vendor";
import {generateMapModRegex} from "./OptimizedMapOutput";
import "./OptimizedMapMods.css";
import RegexResultBox from "../../components/RegexResultBox/RegexResultBox";
import {TradeAsterisk} from "../../components/TradeAsterisk";
import {LanguageFiles} from "../../utils/Languages";
import {openTradeSearch, TradeSettings} from "../../utils/TradeUrlBuilder";
import {MapModsTokenOption, Token} from "../../generated/mapmods/GeneratedTypes";
import FilterCard from "../../components/FilterCard/FilterCard";
import IncludeExcludeToggle from "../../components/IncludeExcludeToggle/IncludeExcludeToggle";
import NumberField from "../../components/NumberField/NumberField";
import PillToggle from "../../components/PillToggle/PillToggle";
import ExactOptimizedToggle from "../../components/ExactOptimizedToggle/ExactOptimizedToggle";
import {mapModTokenColor} from "../../utils/MapModColor";

const OptimizedMapMods = () => {
  const {globalProfile} = useContext(ProfileContext);
  const profile = loadSettings(globalProfile);
  const [result, setResult] = useState("");
  const [selectedBadIds, setSelectedBadIds] = useState<number[]>(profile.map.badIds);
  const [selectedGoodIds, setSelectedGoodIds] = useState<number[]>(profile.map.goodIds);
  const [modGrouping, setModGrouping] = useState(profile.map.allGoodMods);
  const [quantity, setQuantity] = useState(profile.map.quantity);
  const [packsize, setPacksize] = useState(profile.map.packsize);
  const [itemRarity, setItemRarity] = useState(profile.map.itemRarity);
  const [optimizeQuant, setOptimizeQuant] = useState(profile.map.optimizeQuant);
  const [optimizePacksize, setOptimizePacksize] = useState(profile.map.optimizePacksize);
  const [optimizeQuality, setOptimizeQuality] = useState(profile.map.optimizeQuality);
  const [anyQuality, setAnyQuality] = useState(profile.map.anyQuality);
  const [rarity, setRarity] = useState(profile.map.rarity);
  const [corrupted, setCorrupted] = useState(profile.map.corrupted);
  const [unidentified, setUnidentified] = useState(profile.map.unidentified);
  const [quality, setQuality] = useState(profile.map.quality);
  const [regex, setRegex] = useState(LanguageFiles.mapmods[profile.language]);
  const [mapDropChance, setMapDropChance] = useState(profile.map.mapDropChance);
  const [displayNightmareMods, setDisplayNightmareMods] = useState(profile.map.displayNightmareMods);
  const [displayAffixBadges, setDisplayAffixBadges] = useState(profile.map.displayAffixBadges);
  const [groupByAffix, setGroupByAffix] = useState(profile.map.groupByAffix);
  const [tradeEightModOnly, setTradeEightModOnly] = useState(profile.map.tradeEightModOnly);
  const [tradeExcludeValdo, setTradeExcludeValdo] = useState(profile.map.tradeExcludeValdo);
  const eightModDisabled = corrupted.enabled && !corrupted.include;

  const [customTextStr, setCustomTextStr] = useState(profile.map.customText.value);
  const [enableCustomText, setEnableCustomText] = useState(profile.map.customText.enabled);
  const [tradeSearchLoading, setTradeSearchLoading] = useState(false);
  const [tradeMessage, setTradeMessage] = useState<string | null>(null);

  const handleTradeSearch = async () => {
    setTradeSearchLoading(true);
    setTradeMessage(null);
    try {
      const settings: TradeSettings = {
        badIds: selectedBadIds,
        goodIds: selectedGoodIds,
        allGoodMods: modGrouping,
        quantity,
        packsize,
        itemRarity,
        regex: result,
        eightModOnly: tradeEightModOnly && !eightModDisabled,
        excludeValdo: tradeExcludeValdo,
        corrupted,
      };
      const tradeResult = await openTradeSearch(settings);
      if (tradeResult.success) {
        setTradeMessage("Trade search opened!");
      } else {
        setTradeMessage(`Trade site opened. ${tradeResult.error ? `(${tradeResult.error})` : ''}`);
      }
      setTimeout(() => setTradeMessage(null), 5000);
    } finally {
      setTradeSearchLoading(false);
    }
  };

  useEffect(() => {
    const settings: MapSettings = {
      badIds: selectedBadIds,
      goodIds: selectedGoodIds,
      allGoodMods: modGrouping,
      quantity,
      packsize,
      itemRarity,
      optimizeQuant,
      optimizePacksize,
      optimizeQuality,
      rarity,
      corrupted,
      unidentified,
      quality,
      anyQuality,
      displayNightmareMods,
      displayAffixBadges,
      groupByAffix,
      tradeEightModOnly,
      tradeExcludeValdo,
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
    setResult(generateMapModRegex(settings, regex, profile.language));
  }, [result, rarity, corrupted, unidentified, quality, anyQuality, itemRarity, selectedBadIds, selectedGoodIds, modGrouping, quantity, packsize, optimizeQuant, optimizePacksize, optimizeQuality, customTextStr, enableCustomText, regex, mapDropChance, displayNightmareMods, displayAffixBadges, groupByAffix, tradeEightModOnly, tradeExcludeValdo]);

  const renderAffixTag = displayAffixBadges
    ? (token: Token<MapModsTokenOption>) => (
        <span className={`mod-affix-tag mod-affix-tag--${token.options.prefix ? "prefix" : "suffix"}`}>
          {token.options.prefix ? "P" : "S"}
        </span>
      )
    : undefined;

  const affixGroupFn = groupByAffix
    ? (token: Token<MapModsTokenOption>) =>
        token.options.prefix
          ? {key: "prefix", label: "Prefix"}
          : {key: "suffix", label: "Suffix"}
    : undefined;

  const visibleTokens = regex.tokens.filter((e) => displayNightmareMods ? true : !e.options.nm);

  return (
    <>
      <HeaderWithLanguage text={"Optimized Map Modifiers"}/>
      <RegexResultBox
        result={result}
        warning={undefined}
        enableBug={true}
        customText={customTextStr}
        setCustomText={setCustomTextStr}
        enableCustomText={enableCustomText}
        setEnableCustomText={setEnableCustomText}
        onTradeSearch={handleTradeSearch}
        tradeSearchLoading={tradeSearchLoading}
        reset={() => {
          setSelectedBadIds(defaultSettings.map.badIds);
          setSelectedGoodIds(defaultSettings.map.goodIds);
          setOptimizePacksize(defaultSettings.map.optimizePacksize);
          setOptimizeQuant(defaultSettings.map.optimizeQuant);
          setOptimizeQuality(defaultSettings.map.optimizeQuality);
          setModGrouping(defaultSettings.map.allGoodMods)
          setQuantity(defaultSettings.map.quantity);
          setPacksize(defaultSettings.map.packsize);
          setItemRarity(defaultSettings.map.itemRarity);
          setRarity(defaultSettings.map.rarity);
          setCorrupted(defaultSettings.map.corrupted);
          setUnidentified(defaultSettings.map.unidentified);
          setQuality(defaultSettings.map.quality);
          setEnableCustomText(defaultSettings.map.customText.enabled);
          setCustomTextStr(defaultSettings.map.customText.value);
          setMapDropChance(defaultSettings.map.mapDropChance);
          setDisplayNightmareMods(defaultSettings.map.displayNightmareMods);
          setDisplayAffixBadges(defaultSettings.map.displayAffixBadges);
          setGroupByAffix(defaultSettings.map.groupByAffix);
          setTradeEightModOnly(defaultSettings.map.tradeEightModOnly);
          setTradeExcludeValdo(defaultSettings.map.tradeExcludeValdo);
        }}
      />
      {tradeMessage && (
        <div className="trade-message">
          {tradeMessage}
        </div>
      )}
      <div className="break"/>
      <p className="trade-info-text">* Fields marked with an asterisk are compatible with the Trade search.</p>

      <div className="filter-card-grid">
        <FilterCard title="Quantity & Yield"
                    headerControl={
                      <ExactOptimizedToggle name="yield-mode"
                                            optimized={optimizeQuant && optimizePacksize}
                                            setOptimized={(v) => {
                                              setOptimizeQuant(v);
                                              setOptimizePacksize(v);
                                            }}/>
                    }>
          <NumberField id="quantity" label="Quantity of at least" value={quantity} onChange={setQuantity} trade/>
          <NumberField id="pack-size" label="Pack Size of at least" value={packsize} onChange={setPacksize} trade/>
          <NumberField id="mapdrop" label="More maps of at least" value={mapDropChance} onChange={setMapDropChance}/>
          <NumberField id="itemRarity" label="Item rarity of at least" value={itemRarity} onChange={setItemRarity} trade/>
        </FilterCard>
        
        <FilterCard title="Map State">
          <div className={`mm-state-row${corrupted.enabled ? "" : " mm-state-row-off"}`}>
            <Checkbox label="Filter corrupted" value={corrupted.enabled}
                      onChange={() => setCorrupted({...corrupted, enabled: !corrupted.enabled})}/>
            <IncludeExcludeToggle name="corrupted" include={corrupted.include}
                                  setInclude={(v) => setCorrupted({...corrupted, include: v})}/>
          </div>
          <div className={`mm-state-row`}>
            <Checkbox label="Normal Maps" value={rarity.normal}
                      onChange={(e) => setRarity({...rarity, normal: !!e})}/>
            <Checkbox label="Magic Maps" value={rarity.magic}
                      onChange={(e) => setRarity({...rarity, magic: !!e})}/>
            <Checkbox label="Rare Maps" value={rarity.rare}
                      onChange={(e) => setRarity({...rarity, rare: !!e})}/>
            <IncludeExcludeToggle name="map-rarity" include={rarity.include}
                                  setInclude={(v) => setRarity({...rarity, include: v})}/>
          </div>
          <div className={`mm-state-row${unidentified.enabled ? "" : " mm-state-row-off"}`}>
            <Checkbox label="Filter unidentified" value={unidentified.enabled}
                      onChange={() => setUnidentified({...unidentified, enabled: !unidentified.enabled})}/>
            <IncludeExcludeToggle name="unidentified" include={unidentified.include}
                                  setInclude={(v) => setUnidentified({...unidentified, include: v})}/>
          </div>
        </FilterCard>

        <FilterCard title="Quality"
                    headerControl={
                      <ExactOptimizedToggle name="quality-mode"
                                            optimized={optimizeQuality}
                                            setOptimized={setOptimizeQuality}/>
                    }>
          <div className="mm-field-grid">
            <NumberField id="qregular" label="Quality of" value={quality.regular} primary
                         onChange={(v) => setQuality({...quality, regular: v})}/>
            <NumberField id="qpacksize" label="• Pack size" value={quality.packSize}
                         onChange={(v) => setQuality({...quality, packSize: v})}/>
            <NumberField id="qrarity" label="• Rarity" value={quality.rarity}
                         onChange={(v) => setQuality({...quality, rarity: v})}/>
            <NumberField id="qcurrency" label="• Currency" value={quality.currency}
                         onChange={(v) => setQuality({...quality, currency: v})}/>
            <NumberField id="qdiv" label="• Divination" value={quality.divination}
                         onChange={(v) => setQuality({...quality, divination: v})}/>
            <NumberField id="qscarab" label="• Scarab" value={quality.scarab}
                         onChange={(v) => setQuality({...quality, scarab: v})}/>
          </div>
          <Checkbox label="Match any of the quality types (disable to match ALL selected qualities)"
                    value={anyQuality}
                    onChange={setAnyQuality}/>
        </FilterCard>

        <FilterCard title="Trade Search">
          <Checkbox label={<>Only 8-mod maps<TradeAsterisk/></>}
                    value={tradeEightModOnly}
                    onChange={setTradeEightModOnly}
                    disabled={eightModDisabled}/>
          <Checkbox label={<>Exclude Valdo maps<TradeAsterisk/></>}
                    value={tradeExcludeValdo}
                    onChange={setTradeExcludeValdo}/>
        </FilterCard>

      </div>

      <div className="mm-mod-picker">
        <div className="mm-mod-column">
          <div className="mm-mod-column-header">
            <span className="mm-mod-column-title mm-mod-column-title-bad">I don't want any of these mods</span>
            <div className="mm-display-pills">
              <PillToggle variant="nightmare" label="Nightmare"
                          active={displayNightmareMods}
                          onToggle={() => setDisplayNightmareMods(!displayNightmareMods)}/>
              <PillToggle variant="affix" label="P/S badges"
                          active={displayAffixBadges}
                          onToggle={() => setDisplayAffixBadges(!displayAffixBadges)}/>
              <PillToggle variant="group" label="Group by affix"
                          active={groupByAffix}
                          onToggle={() => setGroupByAffix(!groupByAffix)}/>
            </div>
          </div>
          <SelectableTokenList
            sortFn={(a, b) => b.options.scary - a.options.scary}
            colorFun={mapModTokenColor}
            elements={visibleTokens}
            setSelected={setSelectedBadIds}
            selected={selectedBadIds}
            tagFn={renderAffixTag}
            groupFn={affixGroupFn}
            groupOrder={["prefix", "suffix"]}
          />
        </div>
        <div className="mm-mod-column">
          <div className="mm-mod-column-header">
            <span className="mm-mod-column-title mm-mod-column-title-good">I want these mods</span>
            <div className="mm-mod-grouping">
              <span className="mm-mod-grouping-label">Match</span>
              <div className="radio-button-modgroup">
                <input type="radio" className="radio-button-map" id="mods-any" name="mods" value="any"
                       checked={!modGrouping}
                       onChange={v => setModGrouping(!v.target.checked)}/>
                <label htmlFor="mods-any" className="radio-button-map radio-first-ele">Any</label>
                <input type="radio" id="mods-all" name="mods" value="all" checked={modGrouping}
                       onChange={v => setModGrouping(v.target.checked)}/>
                <label htmlFor="mods-all" className="radio-button-map">All</label>
              </div>
            </div>
          </div>
          <SelectableTokenList
            sortFn={(a, b) => a.options.scary - b.options.scary}
            colorFun={mapModTokenColor}
            elements={visibleTokens}
            setSelected={setSelectedGoodIds}
            selected={selectedGoodIds}
            tagFn={renderAffixTag}
            groupFn={affixGroupFn}
            groupOrder={["prefix", "suffix"]}
          />
        </div>
      </div>
    </>
  )
}


export default OptimizedMapMods;
