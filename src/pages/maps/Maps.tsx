import React, { useEffect } from "react";
import "./Maps.css";
import ResultBox from "../../components/ResultBox";
import {
  MapMod,
  mapModifiers,
  kiracModifier,
} from "../../generated/GeneratedMapMods";
import { generateMapModStr, MapModSettings } from "../../utils/MapOutput";
import MapModList from "../../components/MapModList";
import { Checkbox } from "../vendor/Vendor";
import { getGradientColor } from "../../utils/ColorGradient";
import Header from "../../components/Header";
import { hasKey } from "../../utils/LocalStorage";

const Maps = () => {
  const mods = Array.from(Object.keys(mapModifiers));
  const kiracModList = Array.from(Object.keys(kiracModifier));
  const badMods = mods
    .map((m) => ({ ...mapModifiers[m], value: m }))
    .sort((a, b) => a.scary - b.scary);
  const goodMods = mods
    .map((m) => ({ ...mapModifiers[m], value: m }))
    .sort((a, b) => b.scary - a.scary);
  const kiracMods = kiracModList
    .map((m) => ({ ...kiracModifier[m], value: m }))
    .sort((a, b) => b.scary - a.scary);

  const savedSettings = JSON.parse(localStorage.getItem("mapSearch") ?? "{}");
  const [selectedBadMods, setSelectedBadMods] = React.useState<string[]>(
    hasKey(savedSettings, "badMods")
      ? savedSettings.badMods.filter((v: string) => mods.includes(v))
      : []
  );
  const [selectedGoodMods, setSelectedGoodMods] = React.useState<string[]>(
    hasKey(savedSettings, "goodMods")
      ? savedSettings.goodMods.filter((v: string) => mods.includes(v))
      : []
  );
  const [selectedKirac, setSelectedKirac] = React.useState<string[]>(
    hasKey(savedSettings, "kirac")
      ? savedSettings.kirac.filter((v: string) => kiracModList.includes(v))
      : []
  );
  const [modGrouping, setModGrouping] = React.useState(
    hasKey(savedSettings, "allGoodMods")
      ? savedSettings.allGoodMods
        ? "all"
        : "any"
      : "any"
  );
  const [quantity, setQuantity] = React.useState(
    hasKey(savedSettings, "quantity") ? savedSettings.quantity : ""
  );
  const [packsize, setPacksize] = React.useState(
    hasKey(savedSettings, "packsize") ? savedSettings.packsize : ""
  );
  const [optimizeQuant, setOptimizeQuant] = React.useState(
    hasKey(savedSettings, "optimizeQuant") ? savedSettings.optimizeQuant : true
  );
  const [optimizePacksize, setOptimizePacksize] = React.useState(
    hasKey(savedSettings, "optimizePacksize")
      ? savedSettings.optimizePacksize
      : true
  );

  const [result, setResult] = React.useState("");

  useEffect(() => {
    let settings: MapModSettings = {
      badMods: selectedBadMods,
      goodMods: selectedGoodMods,
      kirac: selectedKirac,
      allGoodMods: modGrouping === "all",
      quantity,
      packsize,
      optimizeQuant,
      optimizePacksize,
    };
    let search = generateMapModStr(settings);
    localStorage.setItem("mapSearch", JSON.stringify(settings));
    setResult(search);
  }, [
    result,
    selectedBadMods,
    selectedGoodMods,
    selectedKirac,
    modGrouping,
    quantity,
    packsize,
    optimizeQuant,
    optimizePacksize,
  ]);

  return (
    <>
      <Header text={"Map Modifiers"} />
      <ResultBox
        result={result}
        warning={undefined}
        reset={() => {
          setSelectedGoodMods([]);
          setSelectedBadMods([]);
          setSelectedKirac([]);
          setOptimizePacksize(true);
          setOptimizeQuant(true);
          setQuantity("");
          setPacksize("");
        }}
      />
      <div className="break" />
      <div className="full-size generic-top-element">
        <label className="modifier-search-label" htmlFor="quantity">
          Quantity of at least
        </label>
        <input
          type="search"
          className="modifier-quantity-box"
          id="quantity"
          name="search-mod"
          value={quantity}
          onChange={(v) => setQuantity(v.target.value)}
        />
        <label className="modifier-search-label" htmlFor="pack-size">
          Pack Size of at least
        </label>
        <input
          type="search"
          className="modifier-quantity-box"
          id="pack-size"
          name="search-mod"
          value={packsize}
          onChange={(v) => setPacksize(v.target.value)}
        />
        <Checkbox
          label="Optimize Quantity value (round down to nearest 10, saves a lot of query space)"
          value={optimizeQuant}
          onChange={setOptimizeQuant}
        />
        <Checkbox
          label="Optimize Pack Size value"
          value={optimizePacksize}
          onChange={setOptimizePacksize}
        />
      </div>
      <div className="eq-col-2 box-small-padding">
        <div className="column-header map-column-text">
          I don't want any of these mods
        </div>
      </div>
      <div className="eq-col-2 box-small-padding">
        <div className="column-header map-column-text">I want these mods</div>
        <div className="radio-button-modgroup">
          <input
            type="radio"
            className="radio-button-map"
            id="mods-any"
            name="mods"
            value="any"
            checked={modGrouping === "any"}
            onChange={(v) => setModGrouping(v.target.value)}
          />
          <label htmlFor="mods-any">
            I want <b>any</b> of the modifiers
          </label>
          <input
            type="radio"
            id="mods-all"
            name="mods"
            value="all"
            checked={modGrouping === "all"}
            onChange={(v) => setModGrouping(v.target.value)}
          />
          <label htmlFor="mods-all">
            I want <b>all</b> of the modifiers
          </label>
        </div>
      </div>
      <div className="break" />
      <div className="eq-col-2">
        <MapModList
          id="bad-mods"
          colorFun={badMapColor}
          mods={badMods}
          selected={selectedBadMods}
          setSelected={setSelectedBadMods}
        />
      </div>
      <div className="eq-col-2">
        <MapModList
          id="good-mods"
          colorFun={goodMapColor}
          mods={goodMods}
          selected={selectedGoodMods}
          setSelected={setSelectedGoodMods}
        />
      </div>
      <div className="eq-col-2"></div>
      <div className="eq-col-2">
        <h2>Kirac missions</h2>
        <MapModList
          id="kirac"
          disableSearch={true}
          colorFun={goodMapColor}
          mods={kiracMods}
          selected={selectedKirac}
          setSelected={setSelectedKirac}
        />
      </div>
    </>
  );
};

function badMapColor(m: MapMod): string {
  if (m.scary > 480) {
    return "#ffffff";
  } else {
    return getGradientColor("#FC9090", "#ffffff", m.scary / 800);
  }
}

function goodMapColor(m: MapMod): string {
  if (m.scary < 500) {
    return "#ffffff";
  } else {
    return getGradientColor("#ffffff", "#8afdb7", (m.scary - 100) / 1000);
  }
}

export default Maps;
