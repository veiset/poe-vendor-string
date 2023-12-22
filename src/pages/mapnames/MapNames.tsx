import {useContext, useEffect, useState} from "react";
import {ProfileContext} from "../../components/profile/ProfileContext";
import {loadSettings, saveSettings} from "../../utils/LocalStorage";
import {mapNames} from "../../generated/GeneratedMapNames";
import MapNameList from "./MapNameList";
import Header from "../../components/Header";
import ResultBox from "../../components/ResultBox";
import {MapNameSettings} from "../../utils/SavedSettings";
import {generateMapNameStr} from "../../utils/MapNameOutput";

const MapNames = () => {
  const {globalProfile} = useContext(ProfileContext);
  const profile = loadSettings(globalProfile);

  const maps = Array.from(Object.keys(mapNames));
  const names = maps.map((m) => ({...mapNames[m], name: m}));
  const [selected, setSelected] = useState(profile.mapNames.selected);

  const [result, setResult] = useState("");

  useEffect(() => {
    const settings: MapNameSettings = {
      selected,
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
  ]);

  return (
    <>
      <Header text={"Map Names"}/>
      <ResultBox
        result={result}
        warning={undefined}
        reset={() => {
          setSelected([]);
        }}
      />
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