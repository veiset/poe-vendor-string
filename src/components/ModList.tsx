import React, {Dispatch, SetStateAction} from "react";
import {MapMod} from "../generated/GeneratedMapMods";

export interface ModListProps {
    id: string
    mods: MapMod[]
    selected: string[]
    setSelected: Dispatch<SetStateAction<string[]>>
}

const ModList = (props: ModListProps) => {
    const {id, mods, selected, setSelected} = props;
    const [search, setSearch] = React.useState("");

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
                {mods.filter(v => !search || v.value.toLowerCase().includes(search.toLowerCase())).map((v) => {
                    const isSelected = selected.includes(v.value);
                    return (
                        <div key={v.value}
                             className={isSelected ? "selected-mod" : ""}
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
