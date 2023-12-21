import React, { useEffect } from "react";
import "./Maps.css";
import ResultBox from "../../components/ResultBox";
import {
  mapNames,
} from "../../generated/GeneratedMapNames";
import { generateMapNameStr, MapNameSettings } from "../../utils/MapNameOutput";
import MapNameList from "../../components/MapNameList";
import Header from "../../components/Header";
import { hasKey } from "../../utils/LocalStorage";

const Maps = () => {
  const mods = Array.from(Object.keys(mapNames));
  
  const goodMods = mods
    .map((m) => ({ ...mapNames[m], value: m }));
  
  const savedSettings = JSON.parse(localStorage.getItem("mapSearch") ?? "{}");
  const [selectedMaps, setSelectedMaps] = React.useState<string[]>(
    hasKey(savedSettings, "goodMods")
      ? savedSettings.goodMods.filter((v: string) => mods.includes(v))
      : []
  );

  const [result, setResult] = React.useState("");

  useEffect(() => {
    let settings: MapNameSettings = {
      maps: selectedMaps,
    };
    let search = generateMapNameStr(settings);
    localStorage.setItem("mapSearch", JSON.stringify(settings));
    setResult(search);
  }, [
    result,
    selectedMaps,
  ]);

  return (
    <>
      <Header text={"Map Modifiers"} />
      <ResultBox
        result={result}
        warning={undefined}
        reset={() => {
          setSelectedMaps([]);
        }}
      />
      <div className="break" />
      <div className="eq-col-2 box-small-padding">
        <div className="column-header map-column-text">I want these maps:</div>
      </div>
      <div className="break" />
      <div className="full-size">
        <MapNameList
          id="maps"
          mods={goodMods}
          selected={selectedMaps}
          setSelected={setSelectedMaps}
        />
      </div>
    </>
  );
};

export default Maps;
