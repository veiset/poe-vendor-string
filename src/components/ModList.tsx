import React, {Dispatch, SetStateAction, useEffect} from "react";
import {MapMod} from "../generated/GeneratedMapMods";

export interface ModListProps {
    id: string
    mods: MapMod[]
    selected: string[]
    setSelected: Dispatch<SetStateAction<string[]>>
    colorFun?: (mapMod: MapMod) => string
}

const ModList = (props: ModListProps) => {
    const {id, mods, selected, setSelected, colorFun} = props;
    const [search, setSearch] = React.useState("");

    useEffect(() => { }, [selected]);

    const mapMods = mods.filter(v => {
        return !search || search.toLowerCase().trim().split(" ").every(q => v.value.toLowerCase().includes(q));
    });

    return (
        <>
            <div>
                <input
                    type="search"
                    value={search}
                    className="modifier-search-box"
                    id={id}
                    placeholder="Search for a modifier..."
                    name="search-mod"
                    onChange={(v) => setSearch(v.target.value)}/>
            </div>
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
                            {v.value}
                        </div>
                    );
                })}
            </div>
        </>
    );

}

export default ModList;
