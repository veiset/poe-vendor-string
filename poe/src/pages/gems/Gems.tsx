import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {HeaderWithLanguage} from "@poe/components/Header";
import RegexResultBox from "@shared/components/RegexResultBox/RegexResultBox";
import FilterCard from "@shared/components/FilterCard/FilterCard";
import PriceRangeSlider from "@shared/components/PriceRangeSlider/PriceRangeSlider";
import {Checkbox} from "@shared/components/Checkbox/Checkbox";
import {ProfileContext} from "@poe/components/profile/ProfileContext";
import {loadSettings, updateSettings} from "@poe/utils/LocalStorage";
import {defaultSettings, GemsSettings} from "@poe/utils/SavedSettings";
import {loadGems} from "@poe/utils/loadData";
import type {GemsRegex} from "@shared/typedefs/poe1/Gems";
import {useFavoritePage} from "@poe/core/favorites/useFavoritePage";
import type {RepoeLanguageKey} from "@poe/utils/Languages";
import GemNameList from "../vendor/GemNameList";
import "./Gems.css";
import {generateGemsRegex, translateGemIds} from "./GemsOutput";

const gemLevels = Array.from({length: 21}, (_, index) => index + 1);
const gemQualities = Array.from({length: 24}, (_, index) => index);

const Gems = () => {
  const {globalProfile, lang} = useContext(ProfileContext);
  const storedProfile = loadSettings(globalProfile);
  const favoritePage = useFavoritePage("gems", storedProfile.gems);
  const profile = {...storedProfile, gems: favoritePage.initialConfiguration};
  const [gems, setGems] = useState<GemsRegex>();
  const [levelEnabled, setLevelEnabled] = useState(profile.gems.levelEnabled);
  const [levelMin, setLevelMin] = useState(profile.gems.levelMin);
  const [levelMax, setLevelMax] = useState(profile.gems.levelMax);
  const [qualityEnabled, setQualityEnabled] = useState(profile.gems.qualityEnabled);
  const [qualityMin, setQualityMin] = useState(profile.gems.qualityMin);
  const [qualityMax, setQualityMax] = useState(profile.gems.qualityMax);
  const [showSkills, setShowSkills] = useState(profile.gems.showSkills);
  const [showSupports, setShowSupports] = useState(profile.gems.showSupports);
  const [supportType, setSupportType] = useState(profile.gems.supportType);
  const [selected, setSelected] = useState(profile.gems.selected);
  const loadedLanguage = useRef<RepoeLanguageKey | undefined>(undefined);

  useEffect(() => {
    let active = true;
    setGems(undefined);
    const sourceLanguage = loadedLanguage.current ?? favoritePage.initialLanguage;
    Promise.all([loadGems(sourceLanguage), loadGems(lang)]).then(([source, target]) => {
      if (!active) return;
      if (sourceLanguage !== lang) {
        setSelected(translateGemIds(selected, source, target));
      }
      loadedLanguage.current = lang;
      setGems(target);
    });
    return () => { active = false; };
  }, [lang, favoritePage.initialLanguage]);

  const settings: GemsSettings = {levelEnabled, levelMin, levelMax, qualityEnabled, qualityMin, qualityMax, showSkills, showSupports, supportType, selected};
  const result = useMemo(() => generateGemsRegex(settings, gems), [settings, gems]);

  useEffect(() => {
    if (!favoritePage.isEditingFavorite) updateSettings(globalProfile, (latest) => ({...latest, gems: settings}));
  }, [levelEnabled, levelMin, levelMax, qualityEnabled, qualityMin, qualityMax, showSkills, showSupports, supportType, selected]);

  return <>
    <HeaderWithLanguage text="Gems"/>
    <RegexResultBox result={result} warning={undefined}
                    favorite={favoritePage.action(settings, {language: lang})}
                    reset={() => {
                      const defaults = defaultSettings.gems;
                      setLevelEnabled(defaults.levelEnabled);
                      setLevelMin(defaults.levelMin); setLevelMax(defaults.levelMax);
                      setQualityEnabled(defaults.qualityEnabled);
                      setQualityMin(defaults.qualityMin); setQualityMax(defaults.qualityMax);
                      setShowSkills(defaults.showSkills); setShowSupports(defaults.showSupports);
                      setSupportType(defaults.supportType);
                      setSelected(defaults.selected);
                    }}/>
    <div className="filter-card-grid">
      <FilterCard title="Gem level" headerControl={<Checkbox label="Enable" value={levelEnabled} onChange={setLevelEnabled}/>}
                  disabled={!levelEnabled}>
        <PriceRangeSlider id="gem-level" minValue={levelMin} maxValue={levelMax}
                          onMinChange={setLevelMin} onMaxChange={setLevelMax}
                          availablePrices={gemLevels} unit="level"/>
      </FilterCard>
      <FilterCard title="Gem quality" headerControl={<Checkbox label="Enable" value={qualityEnabled} onChange={setQualityEnabled}/>}
                  disabled={!qualityEnabled}>
        <PriceRangeSlider id="gem-quality" minValue={qualityMin} maxValue={qualityMax}
                          onMinChange={setQualityMin} onMaxChange={setQualityMax}
                          availablePrices={gemQualities} unit="%" allowZero/>
      </FilterCard>
      <FilterCard title="Gem type">
        <Checkbox label="Skills" value={showSkills} onChange={setShowSkills}/>
        <div className="gems-support-filter">
          <Checkbox label="Supports" value={showSupports} onChange={setShowSupports}/>
          <div className="radio-button-modgroup radio-button-modgroup-sm">
            <input type="radio" id="gem-support-all" name="gem-support-type" value="all"
                   checked={supportType === "all"} onChange={() => setSupportType("all")}/>
            <label htmlFor="gem-support-all" className="radio-button-map">All</label>
            <input type="radio" id="gem-support-awakened" name="gem-support-type" value="awakened"
                   checked={supportType === "awakened"} onChange={() => setSupportType("awakened")}/>
            <label htmlFor="gem-support-awakened" className="radio-button-map">Awakened</label>
          </div>
        </div>
      </FilterCard>
    </div>
    <div className="gems-card">
      <div className="gems-card-header"><span className="gems-card-title">Gems</span></div>
      <GemNameList id="gems-name-list" gems={gems?.tokens ?? []} selected={selected} setSelected={setSelected}
                   filter={(gem) => gem.options.support
                     ? showSupports && (supportType === "all" || isAwakenedGem(gem.rawText, lang))
                     : showSkills}/>
    </div>
  </>;
};

const isAwakenedGem = (name: string, language: string): boolean => {
  const awakenedMarkers: Record<string, string> = {
    ENGLISH: "awakened", FRENCH: "éveill", GERMAN: "erweckte", JAPANESE: "覚醒",
    KOREAN: "각성", PORTUGUESE: "despert", RUSSIAN: "пробуж", SPANISH: "despert",
    THAI: "จุติ", CHINESE: "覺醒",
  };
  return name.toLocaleLowerCase().includes(awakenedMarkers[language] ?? awakenedMarkers.ENGLISH);
};

export default Gems;
