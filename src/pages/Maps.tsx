import React, {useEffect} from "react";
import ResultBox from "../components/ResultBox";
import {mapModifiers} from "../generated/GeneratedMapMods";
import {generateMapModStr} from "../utils/MapOutput";
import ModList from "../components/ModList";
import {Checkbox} from "./Vendor";

const Maps = () => {
    const mods = Array.from(Object.keys(mapModifiers));
    const [selectedBadMods, setSelectedBadMods] = React.useState<string[]>([]);
    const [selectedGoodMods, setSelectedGoodMods] = React.useState<string[]>([]);
    const [modGrouping, setModGrouping] = React.useState("all");
    const [quantity, setQuantity] = React.useState("");
    const [optimizeQuant, setOptimizeQuant] = React.useState(true);
    const [strictMatching, setStrictMatching] = React.useState(true);
    const [warning, setWarning] = React.useState<string | undefined>();

    let [result, setResult] = React.useState("");

    useEffect(() => {
        setResult(generateMapModStr({
            badMods: selectedBadMods,
            goodMods: selectedGoodMods,
            allGoodMods: modGrouping === "all",
            quantity,
            strictMatching,
            optimizeQuant,
        }));
    }, [result, selectedBadMods, selectedGoodMods, modGrouping, quantity, strictMatching, optimizeQuant]);

    useEffect(() => {
        if (!strictMatching) {
            const badMaps = selectedBadMods.flatMap((m) => mapModifiers[m].conflictingMaps);
            const goodMaps = selectedGoodMods.flatMap((m) => mapModifiers[m].conflictingMaps);
            const allConflictingMaps = badMaps.concat(goodMaps);
            if (allConflictingMaps.length >= 1) {
                setWarning(`Will match following maps: ${allConflictingMaps.join(", ").replaceAll(" Map", "")}`)
            } else {
                setWarning(undefined);
            }
        } else {
            setWarning(undefined);
        }

    }, [warning, strictMatching, selectedBadMods, selectedGoodMods])

    const badMods = mods
        .map((m) => ({...mapModifiers[m], value: m}))
        .sort((a, b) => a.scary - b.scary);
    const goodMods = mods
        .map((m) => ({...mapModifiers[m], value: m}))
        .sort((a, b) => b.scary - a.scary);

    return (
        <div className="wrapper">
            <div className="container-maps">
                <div className="item-wide info-header">Path of Exile - Map Search Tool</div>
                <ResultBox result={result} warning={warning}/>
                <div className="break"/>
                <div className="item-wide">
                    <div>
                        <label className="modifier-search-label" htmlFor="quantity">Quantity of at least: </label>
                        <input type="search" className="modifier-quantity-box" id="quantity" name="search-mod" value={quantity}
                               onChange={v => setQuantity(v.target.value)}/>
                    </div>
                    <Checkbox label="Optimize quantity value (round down to nearest 10, saves a lot of query space)" value={optimizeQuant} onChange={setOptimizeQuant} />
                    <Checkbox label="Strict matching (will not match maps, but takes slightly more space)" value={strictMatching} onChange={setStrictMatching} />
                </div>
                <div className="item-half-size box-small-padding">
                    <div className="column-header">I don't want any of these mods</div>
                </div>
                <div className="item-half-size box-small-padding">
                    <div className="column-header">I want these mods</div>
                    <div className="radio-button-modgroup">
                            <input type="radio" id="mods-all" name="mods" value="all" checked={modGrouping === "all"}
                                   onChange={v => setModGrouping(v.target.value)}/>
                            <label htmlFor="mods-all">I want <b>all</b> of the modifiers</label>
                        {" " }/
                            <input type="radio" id="mods-any" name="mods" value="any" checked={modGrouping === "any"}
                                   onChange={v => setModGrouping(v.target.value)}/>
                            <label htmlFor="mods-any">I want <b>any</b> of the modifiers</label>
                    </div>
                </div>
                <div className="break"/>
                <div className="item-half-size">
                    <ModList id="bad-mods" mods={badMods} selected={selectedBadMods} setSelected={setSelectedBadMods}/>
                </div>
                <div className="item-half-size">
                    <ModList id="good-mods" mods={goodMods} selected={selectedGoodMods} setSelected={setSelectedGoodMods}/>
                </div>
            </div>
        </div>
    );
}

export default Maps;
