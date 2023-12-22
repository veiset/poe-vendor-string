import React, {Dispatch, SetStateAction, useEffect} from "react";
import {MapName} from "../generated/GeneratedMapNames";
import ModSearchBox from "./ModSearchBox";

export interface MapNameListProps {
    id: string
    names: MapName[]
    selected: string[]
    setSelected: Dispatch<SetStateAction<string[]>>
    // colorFun?: (mapMod: MapName) => string
    disableSearch?: boolean
}

const MapNameList = (props: MapNameListProps) => {
    const {id, names, selected, setSelected, disableSearch} = props;
    const [search, setSearch] = React.useState("");

    useEffect(() => { }, [selected]);

    const mapNames = names.filter(v => {
        return !search || search.toLowerCase().trim().split(" ").every(q => v.name.toLowerCase().includes(q));
    });

    return (
        <>
            {!disableSearch && <ModSearchBox id={id} search={search} setSearch={setSearch} placeholder={"Search for a Map..."}/>}
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
