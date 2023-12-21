import React, {Dispatch, SetStateAction, useEffect} from "react";
import {MapName} from "../generated/GeneratedMapNames";
import ModSearchBox from "./ModSearchBox";

export interface MapNameListProps {
    id: string
    mods: MapName[]
    selected: string[]
    setSelected: Dispatch<SetStateAction<string[]>>
    colorFun?: (mapMod: MapName) => string
    disableSearch?: boolean
}

const MapNameList = (props: MapNameListProps) => {
    const {id, mods, selected, setSelected, disableSearch} = props;
    const [search, setSearch] = React.useState("");

    useEffect(() => { }, [selected]);

    const mapMods = mods.filter(v => {
        return !search || search.toLowerCase().trim().split(" ").every(q => v.value.toLowerCase().includes(q));
    });

    return (
        <>
            {!disableSearch && <ModSearchBox id={id} search={search} setSearch={setSearch} />}
            <div className="map-list">
                {mapMods.map((v) => {
                    const isSelected = selected.includes(v.value);
                    return (
                        <div key={v.value}
                             className={isSelected ? "selectable-item selected-mod" : "selectable-item"}
                             onClick={() => {
                                 isSelected
                                     ? setSelected(selected.filter(m => m !== v.value))
                                     : setSelected(selected.concat(v.value));
                             }}
                        >
                            {v.value.replaceAll("|", " ")}
                        </div>
                    );
                })}
            </div>
        </>
    );

}

export default MapNameList;
