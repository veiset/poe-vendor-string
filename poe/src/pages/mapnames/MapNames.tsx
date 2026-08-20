import React, {useContext, useEffect, useState} from "react";
import {ProfileContext} from "@poe/components/profile/ProfileContext";
import {loadSettings, saveSettings} from "@poe/utils/LocalStorage";
import {mapNames} from "@poe/generated/GeneratedMapNames";
import MapNameList from "./MapNameList";
import Header from "@poe/components/Header";
import RegexResultBox from "@shared/components/RegexResultBox/RegexResultBox";
import {MapNameSettings} from "@poe/utils/SavedSettings";
import {generateMapNameStr} from "@poe/utils/MapNameOutput";
import {Checkbox} from "@shared/components/Checkbox/Checkbox";
import "./MapNames.css";

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
      <RegexResultBox
        result={result}
        warning={undefined}
        reset={() => {
          setSelected([]);
          setMapTabSearch(false);
        }}
      />
      <div className="break"/>
      <div className="mapnames-options">
        <Checkbox
          className="mapnames-tab-search"
          label="Map tab search (click this if searching in your map stash tab, won't work in other stash tabs)"
          value={mapTabSearch}
          onChange={setMapTabSearch}/>
      </div>
      <div className="break"/>
      <div className="mapnames-card">
        <div className="mapnames-card-header">
          <span className="mapnames-card-title">I want these maps</span>
        </div>
        <MapNameList id="mapnamelist" names={names} selected={selected} setSelected={setSelected}/>
      </div>
    </>
  );

}

export default MapNames;
