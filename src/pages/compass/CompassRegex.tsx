import {Compass, compasses} from "../../generated/GeneratedCompass";
import {useContext, useEffect, useState} from "react";
import ResultBox from "../../components/ResultBox";
import Header from "../../components/Header";
import {defaultSettings} from "../../utils/SavedSettings";
import {loadSettings, saveSettings} from "../../utils/LocalStorage";
import {ProfileContext} from "../../components/profile/ProfileContext";
import SelectList from "../../components/selectList/SelectList";

const CompassRegex = () => {
  const {globalProfile} = useContext(ProfileContext);
  const profile = loadSettings(globalProfile);
  const compassRegex: Compass[] = Array.from(Object.keys(compasses)).map((e) => compasses[e]);
  const compassMods = compassRegex.map((e) => e.mod);
  const [selected, setSelected] = useState<string[]>(profile.compass.selected.filter((e) => compassMods.includes(e)));
  const [result, setResult] = useState<string>("");
  const [selectedCompassList, setSelectedCompassList] = useState<Compass[]>(selected.map((e) => compasses[e]));

  useEffect(() => {
    setSelected(selectedCompassList.map((e) => e.mod));
  }, [selectedCompassList]);

  useEffect(() => {
    const regex = selected
      .map((e) => compasses[e].matchSafe)
      .join("|");
    if (regex.includes("\"")) {
      const r = regex.replaceAll("\"", "");
      setResult(`"${r}"`)
    } else {
      setResult(regex);
    }
    saveSettings({
      ...profile,
      compass: {selected},
    });
  }, [selected]);

  return (
    <>
      <Header text={"Charged Compass"}/>
      <ResultBox result={result} reset={() => {
        setSelectedCompassList([]);
        setSelected(defaultSettings.compass.selected);
      }}/>
      <SelectList
        items={compassRegex}
        keyFn={(e) => e.mod}
        display={(e) => e.mod}
        selected={selectedCompassList}
        id="charged-compass"
        setSelected={setSelectedCompassList}
      />
    </>);
}

export default CompassRegex;
