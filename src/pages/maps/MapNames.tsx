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
  const maps = Array.from(Object.keys(mapNames));
  
  const names = maps
    .map((m) => ({ ...mapNames[m], name: m }));
  
  const savedSettings = JSON.parse(localStorage.getItem("mapNameSearch") ?? "{}");
  const [selectedMaps, setSelectedMaps] = React.useState<string[]>(
    hasKey(savedSettings, "maps")
      ? savedSettings.maps.filter((v: string) => maps.includes(v))
      : []
  );

  const [result, setResult] = React.useState("");

  useEffect(() => {
    let settings: MapNameSettings = {
      maps: selectedMaps,
    };
    let search = generateMapNameStr(settings);
    localStorage.setItem("mapNameSearch", JSON.stringify(settings));
    setResult(search);
  }, [
    result,
    selectedMaps,
  ]);

  return (
    <>
      <Header text={"Map Names"} />
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
          names={names}
          selected={selectedMaps}
          setSelected={setSelectedMaps}
        />
      </div>
    </>
  );
};

export default Maps;
