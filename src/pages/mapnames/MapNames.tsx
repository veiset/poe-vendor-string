import React, {useContext, useEffect, useState} from "react";
import {ProfileContext} from "../../components/profile/ProfileContext";
import {loadSettings, saveSettings} from "../../utils/LocalStorage";
import {mapNames} from "../../generated/GeneratedMapNames";
import MapNameList from "./MapNameList";
import Header from "../../components/Header";
import ResultBox from "../../components/ResultBox";
import {MapNameSettings} from "../../utils/SavedSettings";
import {generateMapNameStr} from "../../utils/MapNameOutput";
import {Checkbox} from "../vendor/Vendor";

const MapNames = () => {
  const {globalProfile} = useContext(ProfileContext);
  const profile = loadSettings(globalProfile);

  const maps = Array.from(Object.keys(mapNames));
  const names = maps.map((m) => ({...mapNames[m], name: m}));
  const [selected, setSelected] = useState(profile.mapNames.selected);
  const [mapTabSearch, setMapTabSearch] = useState(profile.mapNames.mapTabSearch);

  const [result, setResult] = useState("");

  useEffect(() => {
    const settings: MapNameSettings = {
      selected,
      mapTabSearch,
    };
    saveSettings({
      ...profile,
      mapNames: {...settings},
    });
    let search = generateMapNameStr(settings);
    setResult(search);
  }, [
    result,
    selected,
    mapTabSearch,
  ]);

  return (
    <>
      <Header text={"Map Names"}/>
      <ResultBox
        result={result}
        warning={undefined}
        reset={() => {
          setSelected([]);
          setMapTabSearch(false);
        }}
      />
      <div className="break"/>
      <Checkbox
        label="Map tab search (click this if searching in your map stash tab, won't work in other stash tabs)"
        value={mapTabSearch}
        onChange={setMapTabSearch}/>
      <div className="break"/>
      <div className="eq-col-2 box-small-padding">
        <div className="column-header map-column-text">I want these maps:</div>
      </div>
      <div className="break"/>
      <div className="full-size">
        <MapNameList id="mapnamelist" names={names} selected={selected} setSelected={setSelected}/>
      </div>
    </>
  );

}

export default MapNames;