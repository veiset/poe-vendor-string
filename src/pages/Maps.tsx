import React, {useEffect} from "react";
import ResultBox from "../components/ResultBox";
import {mapModifiers} from "../generated/GeneratedMapMods";
import {generateMapModStr} from "../utils/MapOutput";
import ModList from "../components/ModList";

const Maps = () => {
    const mods = Array.from(Object.keys(mapModifiers));
    const [selectedBadMods, setSelectedBadMods] = React.useState<string[]>([]);
    const [selectedGoodMods, setSelectedGoodMods] = React.useState<string[]>([]);
    const [modGrouping, setModGrouping] = React.useState("all");
    const [quantity, setQuantity] = React.useState("");

    let [result, setResult] = React.useState("");

    useEffect(() => {
        setResult(generateMapModStr({
            badMods: selectedBadMods,
            goodMods: selectedGoodMods,
            allGoodMods: modGrouping === "all",
            quantity
        }));
    }, [result, selectedBadMods, selectedGoodMods, modGrouping, quantity]);

    const badMods = mods
        .map((m) => ({...mapModifiers[m], value: m}))
        .sort((a, b) => a.scary - b.scary);
    const goodMods = mods
        .map((m) => ({...mapModifiers[m], value: m}))
        .sort((a, b) => b.scary - a.scary);

    return (
        <div className="wrapper">
            <div className="container">
                <div className="item-wide info-header">Path of Exile - Map Search Tool</div>
                <ResultBox result={result}/>
                <div className="break"/>
                <div className="item-half-size">
                    <div className="column-header">I don't want any of these mods</div>
                    <ModList mods={badMods} selected={selectedBadMods} setSelected={setSelectedBadMods}/>
                </div>
                <div className="item-half-size">
                    <div className="column-header">I want these mods</div>
                    <label htmlFor="search-mod">Quantity of at least: </label>
                    <input type="search" className="modifier-quantity-box" id="search-mod" name="search-mod" value={quantity}
                           onChange={v => setQuantity(v.target.value)}/>
                    <div>
                        <input type="radio" id="mods-all" name="mods" value="all" checked={modGrouping === "all"}
                               onChange={v => setModGrouping(v.target.value)}/>
                        <label htmlFor="mods-all">I want <b>all</b> of the modifiers</label>
                    </div>
                    <div>
                        <input type="radio" id="mods-any" name="mods" value="any" checked={modGrouping === "any"}
                               onChange={v => setModGrouping(v.target.value)}/>
                        <label htmlFor="mods-any">I want <b>any</b> of the modifiers</label>
                    </div>
                    <ModList mods={goodMods} selected={selectedGoodMods} setSelected={setSelectedGoodMods}/>
                </div>
            </div>
        </div>
    );
}

export default Maps;
