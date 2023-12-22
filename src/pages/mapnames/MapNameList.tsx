import React, {Dispatch, SetStateAction, useEffect} from "react";
import {MapName} from "../../generated/GeneratedMapNames";
import ModSearchBox from "../../components/ModSearchBox";
import "./MapNameList.css";

export interface MapNameListProps {
  id: string
  names: MapName[]
  selected: string[]
  setSelected: Dispatch<SetStateAction<string[]>>
}

const MapNameList = (props: MapNameListProps) => {
  const {id, names, selected, setSelected} = props;
  const [search, setSearch] = React.useState("");

  useEffect(() => {
  }, [selected]);

  const mapNames = names.filter(v => {
    return !search || search.toLowerCase().trim().split(" ").every(q => v.name.toLowerCase().includes(q));
  });

  return (
    <>
      <div className="eq-col-2 box-small-padding">
        <ModSearchBox id={id} search={search} setSearch={setSearch} placeholder={"Search for a Map..."}/>
      </div>
      <div className="map-list">
        {mapNames.map((v) => {
          const isSelected = selected.includes(v.name);
          return (
            <div key={v.name}
                 className={isSelected ? "selectable-item selected-mod" : "selectable-item"}
                 onClick={() => {
                   isSelected
                     ? setSelected(selected.filter(m => m !== v.name))
                     : setSelected(selected.concat(v.name));
                 }}
            >
              {v.name.replaceAll("|", " ")}
            </div>
          );
        })}
      </div>
    </>
  );

}

export default MapNameList;