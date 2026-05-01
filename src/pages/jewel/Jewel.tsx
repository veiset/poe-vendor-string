import React, {useContext, useEffect, useState} from "react";
import {ProfileContext} from "../../components/profile/ProfileContext";
import {loadSettings, saveSettings} from "../../utils/LocalStorage";
import Header from "../../components/Header";
import ResultBox from "../../components/ResultBox";
import {defaultSettings, JewelSettings} from "../../utils/SavedSettings";
import {Checkbox} from "../vendor/Vendor";
import {jewelAbyss, jewelRegular} from "../../generated/GeneratedJewel";
import JewelMods from "./JewelMods";
import {generateJewelRegex} from "./JewelOutput";
import FilterCard from "../../components/FilterCard/FilterCard";
import "./Jewel.css";


const Jewel = () => {
  const {globalProfile} = useContext(ProfileContext);
  const profile = loadSettings(globalProfile);

  const regularMods = jewelRegular;
  const abyssMods = jewelAbyss;
  const regularModText = regularMods.map((e) => e.mod);
  const abyssModText = abyssMods.map((e) => e.mod);

  const [allMatch, setAllMatch] = useState(profile.jewel.allMatch);
  const [magicOnly, setMagicOnly] = useState(profile.jewel.magicOnly);
  const [abyssJewel, setAbyssJewel] = useState(profile.jewel.abyssJewel);
  const [selectedRegular, setSelectedRegular] = useState<string[]>(profile.jewel.selectedRegular.filter((e) => regularModText.includes(e)));
  const [selectedAbyss, setSelectedAbyss] = useState<string[]>(profile.jewel.selectedAbyss.filter((e) => abyssModText.includes(e)));
  const [matchBothPrefixAndSuffix, setMatchBothPrefixAndSuffix] = React.useState(profile.jewel.matchBothPrefixAndSuffix);
  const [matchOpenPrefixSuffix, setMatchOpenPrefixSuffix] = React.useState(profile.jewel.matchOpenPrefixSuffix);

  const [result, setResult] = useState("");

  useEffect(() => {
    const settings: JewelSettings = {
      allMatch,
      magicOnly,
      abyssJewel,
      selectedRegular,
      selectedAbyss,
      matchBothPrefixAndSuffix,
      matchOpenPrefixSuffix
    }
    saveSettings({...profile, jewel: {...settings}});
    setResult(generateJewelRegex(settings));
  }, [allMatch, magicOnly, abyssJewel, selectedRegular, selectedAbyss, matchOpenPrefixSuffix, matchBothPrefixAndSuffix]);

  return (
    <>
      <Header text={"Jewel"}/>
      <ResultBox
        result={result}
        warning={undefined}
        reset={() => {
          setSelectedRegular(defaultSettings.jewel.selectedRegular);
          setSelectedAbyss(defaultSettings.jewel.selectedAbyss);
        }}
      />
      <div className="break"/>
      <div className="filter-card-grid">
        <FilterCard title="Settings" wide>
          <div className="jewel-type-row">
            <span className="jewel-type-label">Jewel type</span>
            <div className="radio-button-modgroup">
              <input type="radio" className="radio-button-map" id="jewel-regular" name="regular jewel"
                     defaultChecked={!abyssJewel}
                     checked={!abyssJewel}
                     onChange={v => setAbyssJewel(false)}/>
              <label htmlFor="jewel-regular" className="radio-button-map radio-first-ele">Regular Jewel</label>
              <input type="radio" id="jewel-abyss" name="abyss jewel" defaultChecked={abyssJewel}
                     checked={abyssJewel}
                     onChange={v => setAbyssJewel(true)}/>
              <label htmlFor="jewel-abyss" className="radio-button-map">Abyss Jewel</label>
            </div>
          </div>
          <div className="jewel-card-divider"/>
          <Checkbox label="Magic Jewels only" value={magicOnly}
                    onChange={setMagicOnly}/>
          {magicOnly
            ? <>
              <Checkbox label="Require that both prefix and suffix matches" value={matchBothPrefixAndSuffix}
                        onChange={setMatchBothPrefixAndSuffix}/>
              <Checkbox label="Match open prefix or open suffix" value={matchOpenPrefixSuffix}
                        onChange={setMatchOpenPrefixSuffix}/>
            </>
            : <Checkbox label="Should match all selected mods" value={allMatch}
                        onChange={setAllMatch}/>
          }
          {abyssJewel && magicOnly &&
            <p className="jewel-warn">Warning: Only max modifier tier (T1) is matched when rolling magical abyssal jewels.</p>
          }
        </FilterCard>
      </div>

      <div className="jewel-mod-picker">
        {abyssJewel
          ? <JewelMods mods={abyssMods} selected={selectedAbyss} setSelected={setSelectedAbyss}/>
          : <JewelMods mods={regularMods} selected={selectedRegular} setSelected={setSelectedRegular}/>
        }
      </div>
    </>
  );
}


export default Jewel;