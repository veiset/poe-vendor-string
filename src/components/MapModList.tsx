import React, {Dispatch, SetStateAction, useEffect} from "react";
import {MapMod} from "../generated/GeneratedMapMods";
import ModSearchBox from "./ModSearchBox";

export interface ModListProps {
    id: string
    mods: MapMod[]
    selected: string[]
    setSelected: Dispatch<SetStateAction<string[]>>
    colorFun?: (mapMod: MapMod) => string
}

const MapModList = (props: ModListProps) => {
    const {id, mods, selected, setSelected, colorFun} = props;
    const [search, setSearch] = React.useState("");

    useEffect(() => { }, [selected]);

    const mapMods = mods.filter(v => {
        return !search || search.toLowerCase().trim().split(" ").every(q => v.value.toLowerCase().includes(q));
    });

    return (
        <>
            <ModSearchBox id={id} search={search} setSearch={setSearch} />
            <div className="mod-list">
                {mapMods.map((v) => {
                    const isSelected = selected.includes(v.value);
                    const colorValue = !isSelected && colorFun
                        ? colorFun(v)
                        : "#ffffff";
                    const style = !isSelected ? {color: colorValue} : undefined
                    return (
                        <div key={v.value} style={style}
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

export default MapModList;
