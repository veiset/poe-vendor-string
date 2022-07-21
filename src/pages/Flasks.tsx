import Header from "../components/Header";
import ResultBox from "../components/ResultBox";
import React, {useEffect} from "react";
import FlaskModList from "../components/FlaskModList";
import {flaskPrefix, flaskSuffix} from "../generated/GeneratedFlaskMods";
import {hasKey} from "../utils/LocalStorage";
import {Checkbox} from "./Vendor";
import {generateMapModStr, MapModSettings} from "../utils/MapOutput";
import {FlaskModSettings, generateFlaskOutput} from "../utils/FlaskOuput";

const Flasks = () => {
    const modGroups = flaskPrefix.concat(flaskSuffix).map((modGroup) => modGroup.description);
    const savedSettings = JSON.parse(localStorage.getItem("flaskSearch") ?? "{}");
    const [selectedPrefix, setSelectedPrefix] = React.useState<string[]>(hasKey(savedSettings, "prefix") ? savedSettings.prefix.filter((v: string) => modGroups.includes(v)) : []);
    const [selectedSuffix, setSelectedSuffix] = React.useState<string[]>(hasKey(savedSettings, "suffix") ? savedSettings.suffix.filter((v: string) => modGroups.includes(v)) : []);
    const [ilevel, setIlevel] = React.useState<string>(hasKey(savedSettings, "ilevel") ? savedSettings.ilevel : "85");
    const [onlyMaxTierMod, setOnlyMaxTierMod] = React.useState(hasKey(savedSettings, "onlyMadTierMod") ? savedSettings.optimizeQuant : true);

    let [result, setResult] = React.useState("");

    useEffect(() => {
        const settings: FlaskModSettings = {
            prefix: selectedPrefix,
            suffix: selectedSuffix,
            ilevel,
            onlyMaxTierMod,
        }
        let search = generateFlaskOutput(flaskPrefix.concat(flaskSuffix), settings);
        localStorage.setItem("flaskSearch", JSON.stringify(settings));
        setResult(search);
    }, [result, selectedPrefix, selectedSuffix, ilevel, onlyMaxTierMod]);

    return (
        <div className="wrapper">
            <div className="container-maps">
                <Header text={"Flask Modifiers"}/>
                <ResultBox result={result} warning={undefined} reset={() => {
                    setSelectedPrefix([]);
                    setSelectedSuffix([]);
                    setIlevel("85");
                    setOnlyMaxTierMod(true);
                }}/>
                <div className="break"/>
                <div className="item-wide">
                    <label className="modifier-search-label" htmlFor="quantity">Flask item level: </label>
                    <input type="search" className="modifier-quantity-box" id="quantity" name="search-mod"
                           value={ilevel}
                           onChange={v => setIlevel(v.target.value)}/>
                    <Checkbox label="Only match the highest level modifier for item level" value={onlyMaxTierMod}
                              onChange={setOnlyMaxTierMod}/>
                </div>
                <div className="break"/>

                <div className="item-half-size">
                    <div className="column-header">Prefix</div>
                    <FlaskModList id="flask-prefix" mods={flaskPrefix} onlyMaxTierMod={onlyMaxTierMod} ilevel={ilevel}
                                  selected={selectedPrefix} setSelected={setSelectedPrefix}/>
                </div>
                <div className="item-half-size">
                    <div className="column-header">Suffix</div>
                    <FlaskModList id="flask-suffix" mods={flaskSuffix} onlyMaxTierMod={onlyMaxTierMod} ilevel={ilevel}
                                  selected={selectedSuffix} setSelected={setSelectedSuffix}/>
                </div>
            </div>
        </div>
    )
}

export default Flasks;