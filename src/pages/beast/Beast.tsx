import Header from "../../components/Header";
import ResultBox from "../../components/ResultBox";
import React, {useEffect, useState} from "react";
import {beastRegex} from "../../generated/GeneratedBeastRegex";
import {leagueName} from "../expedition/Expedition";
import "./Beast.css";
import Collapsable from "../../components/collapsable/Collapsable";
import {dateTextFromString} from "../expedition/ExpeditionUtils";
import {Checkbox} from "../vendor/Vendor";
import {hasKey} from "../../utils/LocalStorage";

export interface PoeNinjaBeast {
    name: string
    chaosValue: number
    listingCount: number
}

export interface PoeNinjaBeastData {
    lines: PoeNinjaBeast[]
}

interface BeastPriceRegex {
    name: string
    chaosValue: number
    recipe: string
    regex: string
    numberOfBeasts: number
    harvest: boolean
}

const sortByChaosValue = (e1: BeastPriceRegex, e2: BeastPriceRegex) => e2.chaosValue - e1.chaosValue;

export interface BeastSettings {
  includeHarvest: boolean
  minChaosValue: string
  maxChaosValue: string
}

const defaultSettings: BeastSettings = {
  includeHarvest: true,
  minChaosValue: '',
  maxChaosValue: '',
}

const generateRegex = (
    prices: BeastPriceRegex[],
    includeHarvest: boolean,
    minValue: number | undefined,
    maxValue: number | undefined
): string => {
    let done = false;
    const regex = prices.filter((e) => e.chaosValue > 0).reduce((acc: string, el: BeastPriceRegex) => {
        if (done) {
            return acc;
        }
        if (!includeHarvest && el.harvest) {
          return acc;
        }
        if (acc.length + el.regex.length + 1 > 50) {
            done = true;
            return acc;
        }
        if (el.chaosValue > (maxValue ?? 9999999)) return acc;
        if (el.chaosValue < (minValue ?? 0)) return acc;
        return acc + "|" + el.regex;
    }, "");
    return `${regex.substring(1)}`;
}

const Beast = () => {
    const savedSettings: BeastSettings = JSON.parse(localStorage.getItem("beast") ?? '{}');
    const [beastPrices, setBeastPrices] = useState<BeastPriceRegex[]>([]);
    const [minChaosValue, setMinChaosValue] = useState<string>(hasKey(savedSettings, "minChaosValue") ? savedSettings.minChaosValue: '');
    const [maxChaosValue, setMaxChaosValue] = useState<string>(hasKey(savedSettings, "maxChaosValue") ? savedSettings.maxChaosValue: '');
    const [lastUpdated, setLastUpdated] = useState("Outdated prices. Check back in a few mins...");
    const [includeHarvest, setIncludeHarvest] = React.useState(hasKey(savedSettings, "includeHarvest") ? savedSettings.includeHarvest : true);
    const [result, setResult] = useState<string>("");

    useEffect(() => {
        fetch(`generated.txt`, {headers: {'Content-Type': 'application/text'}})
            .then((r) => r.text())
            .then((date) => {
                setLastUpdated(dateTextFromString(date));
            });
        const data = fetch(`beast/beast_poe_ninja.json`)
            .then((r) => r.json()) as Promise<PoeNinjaBeastData>;

        data.then((d) => {
            const priceLookup = new Map(d.lines.map((b) => [b.name, b.chaosValue]));
            const lookup = new Map(d.lines.map((b) => [b.name, b]));
            const pricedRegex: BeastPriceRegex[] = beastRegex.map((b) =>
                ({
                    name: b.beast,
                    chaosValue: priceLookup.get(b.beast) ?? 0,
                    recipe: b.recipe,
                    regex: b.regex,
                    numberOfBeasts: lookup.get(b.beast)?.listingCount ?? 0,
                    harvest: b.harvest,
                })
            ).filter((e) => e.numberOfBeasts > 5); // filter price fixing, or very low amount of beasts
            pricedRegex.sort(sortByChaosValue)
            setBeastPrices(pricedRegex);
        });
    }, []);

    useEffect(() => {
        const settings: BeastSettings = {
          includeHarvest,
          minChaosValue,
          maxChaosValue,
        }
        localStorage.setItem("beast", JSON.stringify(settings));
        const minChaosN  = minChaosValue ? minChaosValue as unknown as number : undefined;
        const maxChaosN = maxChaosValue ? maxChaosValue as unknown as number : undefined;
        setResult(generateRegex(beastPrices, includeHarvest, minChaosN, maxChaosN));
    }, [includeHarvest, minChaosValue, maxChaosValue, beastPrices]);

    return (
        <>
            <Header text={"Bestiary"}/>
            <ResultBox result={result} warning={""} reset={() => {
              setIncludeHarvest(true);
              setMinChaosValue('');
              setMaxChaosValue('');
            }}/>
            <p className="beast-price-info">Using price data from {leagueName}. Last updated: {lastUpdated}</p>
            <div className="row beast-options">
                <div>
                    <span className="expedition-option-text">Min chaos value:</span>
                    <input type="search" className="modifier-quantity-box" id="pack-size" name="search-mod" value={minChaosValue}
                           onChange={v => {
                               const val = v.target.value;
                               const value = val;
                               setMinChaosValue(value);
                           }}/>

                </div>
                <div>
                    <span className="expedition-option-text">Max chaos value:</span>
                    <input type="search" className="modifier-quantity-box" id="pack-size" name="search-mod" value={maxChaosValue}
                           onChange={v => {
                               const val = v.target.value;
                               const value = val;
                               setMaxChaosValue(value);
                           }}/>

                </div>
            </div>
            <div className="row beast-options">
                <Checkbox label="Include harvest beasts" value={includeHarvest} onChange={setIncludeHarvest}/>
            </div>
            <div className="row">
                <Collapsable header={"Price data"} isOpenByDefault={true}>
                    <div className="beast-row beast-header">
                        <div className="beast-name-cell">Beast name</div>
                        <div className="beast-regex-cell">Regex</div>
                        <div className="beast-value-cell">Chaos</div>
                        <div className="beast-recipe-cell">Recipe</div>
                    </div>
                    {beastPrices.sort(sortByChaosValue).map((e) => {
                        const highlighted = result.includes(e.regex);
                        const hiddenHarvest = !includeHarvest && e.harvest ? "hidden-beast" : "";
                        const highlightedCss = highlighted && !hiddenHarvest ? "beast-highlighted" : "";
                        return (
                            <div className={`beast-row ${highlightedCss} ${hiddenHarvest}`} key={e.name}>
                                <div className="beast-name-cell" key={e.name}>{e.name}</div>
                                <div className="beast-regex-cell">{e.regex}</div>
                                <div className="beast-value-cell">{e.chaosValue}</div>
                                <div className="beast-recipe-cell">{e.recipe}</div>
                            </div>
                        )
                    })}
                </Collapsable>
            </div>
        </>
    );
}

export default Beast;