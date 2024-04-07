import React, {useContext, useEffect} from "react";
import '../maps/Maps.css';
import ResultBox from "../../components/ResultBox";
import {MapMod, t17Mods} from "../../generated/GeneratedMapMods";
import {generateMapModStr} from "../../utils/MapOutput";
import MapModList from "../../components/MapModList";
import {Checkbox} from "../vendor/Vendor";
import {getGradientColor} from "../../utils/ColorGradient";
import Header from "../../components/Header";
import {loadSettings, saveSettings} from "../../utils/LocalStorage";
import {defaultSettings, MapT17Settings} from "../../utils/SavedSettings";
import {ProfileContext} from "../../components/profile/ProfileContext";

const MapsT17 = () => {
  const {globalProfile} = useContext(ProfileContext);
  const profile = loadSettings(globalProfile);

  const mods = Array.from(Object.keys(t17Mods));

  const modsT17 = mods
    .map((m) => ({...t17Mods[m], value: m}))
    .sort((a, b) => a.scary - b.scary);

  const [selectedMods, setSelectedMods] = React.useState<string[]>(profile.mapT17.mods.filter((v: string) => mods.includes(v)));
  const [quantity, setQuantity] = React.useState(profile.mapT17.quantity);
  const [packsize, setPacksize] = React.useState(profile.mapT17.packsize);
  const [optimizeQuant, setOptimizeQuant] = React.useState(profile.mapT17.optimizeQuant);
  const [optimizePacksize, setOptimizePacksize] = React.useState(profile.mapT17.optimizePacksize);

  const [result, setResult] = React.useState("");

  useEffect(() => {
    let settings: MapT17Settings = {
      mods: selectedMods,
      quantity,
      packsize,
      optimizeQuant,
      optimizePacksize,
    };
    let search = generateMapModStr({
      ...settings,
      badMods: selectedMods,
      goodMods: [],
      kirac: [],
      allGoodMods: false,
      rarity: {
        rare: false,
        magic: false,
        normal: false,
        include: false,
      }

    });
    saveSettings({
      ...profile,
      mapT17: {...settings},
    });
    setResult(search);
  }, [result, selectedMods, quantity, packsize, optimizeQuant, optimizePacksize]);


  return (
    <>
      <Header text={"Map Modifiers T17"}/>
      <ResultBox result={result} warning={undefined} reset={() => {
        setSelectedMods(defaultSettings.mapT17.mods)
        setOptimizePacksize(defaultSettings.mapT17.optimizePacksize);
        setOptimizeQuant(defaultSettings.mapT17.optimizeQuant);
        setQuantity(defaultSettings.mapT17.quantity);
        setPacksize(defaultSettings.mapT17.packsize);
      }}/>
      <div className="break"/>
      <div className="full-size generic-top-element">
        <label className="modifier-search-label" htmlFor="quantity">Quantity of at least</label>
        <input type="search" className="modifier-quantity-box" id="quantity" name="search-mod" value={quantity}
               onChange={v => setQuantity(v.target.value)}/>
        <label className="modifier-search-label" htmlFor="pack-size">Pack Size of at least</label>
        <input type="search" className="modifier-quantity-box" id="pack-size" name="search-mod" value={packsize}
               onChange={v => setPacksize(v.target.value)}/>
        <Checkbox label="Optimize Quantity value (round down to nearest 10, saves a lot of query space)"
                  value={optimizeQuant}
                  onChange={setOptimizeQuant}/>
        <Checkbox label="Optimize Pack Size value" value={optimizePacksize}
                  onChange={setOptimizePacksize}/>
      </div>
      <div className="eq-col-2 box-small-padding">
        <div className="column-header map-column-text">I don't want any of these mods</div>
      </div>
      <div className="break"/>
      <div className="eq-col-4">
        <MapModList id="bad-mods" colorFun={badMapColor} mods={modsT17} selected={selectedMods}
                    setSelected={setSelectedMods}/>
      </div>
    </>
  );
}

function badMapColor(m: MapMod): string {
  if (m.scary > 480) {
    return "#eab7fc";
  } else {
    return getGradientColor("#FC9090", "#ffffff", (m.scary) / 800);
  }
}


export default MapsT17;
