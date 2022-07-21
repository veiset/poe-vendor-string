import React, {Dispatch, SetStateAction} from "react";
import {FlaskModGroup} from "../generated/GeneratedFlaskMods";
import ModSearchBox from "./ModSearchBox";

export interface FlaskModListProps {
    id: string
    onlyMaxTierMod: boolean
    ilevel: string
    mods: FlaskModGroup[]
    selected: string[]
    setSelected: Dispatch<SetStateAction<string[]>>
}

const FlaskModList = (props: FlaskModListProps) => {
    const {id, mods, onlyMaxTierMod, ilevel, selected, setSelected} = props;
    const [search, setSearch] = React.useState("");

    const flaskMods = mods.filter(v => {
        return !search ||
            search.toLowerCase().trim().split(" ").every(q => v.description.toLowerCase().includes(q)) ||
            v.mods
                .map((v) => v.name.toLowerCase().trim())
                .some((v) => v.includes(search.toLowerCase().trim()));
    });

    const ilevelNumber = isNaN(Number(ilevel)) ? 85 : Number(ilevel);

    return (
        <>
            <ModSearchBox id={id} search={search} setSearch={setSearch}/>
            <div className="mod-list">
                {flaskMods.map((modGroup) => {
                    const possibleMods = modGroup.mods.filter((m) => m.level <= ilevelNumber);
                    let desc = null;
                    if (onlyMaxTierMod && possibleMods.length > 0) {
                        desc = possibleMods.reduce((a, b) => a.level > b.level ? a : b).value
                    }
                    if (!onlyMaxTierMod && modGroup.minLevel <= ilevelNumber) {
                        desc = modGroup.description;
                    }
                    if (desc === null) return;
                    const isSelected = selected.some((r) => r === modGroup.description);
                    return (<div
                        className={isSelected ? "selectable-item selected-mod" : "selectable-item"}
                        onClick={() => {
                            isSelected
                                ? setSelected(selected.filter(m => m !== modGroup.description))
                                : setSelected(selected.concat(modGroup.description));
                        }}
                    >
                        {desc}
                    </div>)
                })}
            </div>
        </>

    )
};

export default FlaskModList;