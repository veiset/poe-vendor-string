import Header from "../../components/Header";
import ResultBox from "../../components/ResultBox";
import React, { useContext, useEffect, useState } from "react";
import { leagueName } from "../expedition/Expedition";
import "./Runegraft.css";
import Collapsable from "../../components/collapsable/Collapsable";
import { dateTextFromString } from "../expedition/ExpeditionUtils";
import { loadSettings, saveSettings } from "../../utils/LocalStorage";
import { defaultSettings } from "../../utils/SavedSettings";
import { ProfileContext } from "../../components/profile/ProfileContext";
import { runegraftRegex } from "../../generated/GeneratedRunegraft";
import { tattooRegex } from "../../generated/GeneratedTattoo";

interface PoeNinjaRunegraftLine {
    id: number
    name: string
    chaosValue: number
    explicitModifiers: { text: string, optional: boolean }[]
}


export interface PoeNinjaRunegraftData {
    lines: PoeNinjaRunegraftLine[]
}

interface PoeNinjaTattooLine {
    id: string
    primaryValue: number
}

interface PoeNinjaTattooItem {
    id: string
    name: string
}

export interface PoeNinjaTattooData {
    lines: PoeNinjaTattooLine[]
    items: PoeNinjaTattooItem[]
}

interface RunegraftPriceRegex {
    name: string
    chaosValue: number
    regex: string
    description: string
}

const sortByChaosValue = (e1: RunegraftPriceRegex, e2: RunegraftPriceRegex) => e2.chaosValue - e1.chaosValue;

const generateRegex = (
    prices: RunegraftPriceRegex[],
    minValue: number | undefined,
    maxValue: number | undefined,
): string => {
    const regex = prices
        .filter((e) => e.chaosValue > 0)
        .filter((e) => {
            if (minValue && e.chaosValue < minValue) return false;
            if (maxValue && e.chaosValue > maxValue) return false;
            return true;
        })
        .reduce((acc, e) => {
            const currentLength = acc.length;
            const newLength = currentLength + e.regex.length + (currentLength > 0 ? 1 : 0);
            if (newLength > 100) return acc;
            return currentLength > 0 ? `${acc}|${e.regex}` : e.regex;
        }, "");
    return `"${regex}"`;
}

const Runegraft = () => {
    const { globalProfile } = useContext(ProfileContext);
    const profile = loadSettings(globalProfile);
    const [minChaosValue, setMinChaosValue] = useState<string>(profile.runegraft.minValue);
    const [maxChaosValue, setMaxChaosValue] = useState<string>(profile.runegraft.maxValue);
    const [includeTattoos, setIncludeTattoos] = useState<boolean>(profile.runegraft.includeTattoos ?? false);

    const [runegraftPrices, setRunegraftPrices] = useState<RunegraftPriceRegex[]>([]);
    const [tattooPrices, setTattooPrices] = useState<RunegraftPriceRegex[]>([]);
    const [displayedPrices, setDisplayedPrices] = useState<RunegraftPriceRegex[]>([]);
    const [lastUpdated, setLastUpdated] = useState("Outdated prices. Check back in a few mins...");
    const [result, setResult] = useState<string>("");

    useEffect(() => {
        fetch(`generated.txt`, { headers: { 'Content-Type': 'application/text' } })
            .then((r) => r.text())
            .then((date) => {
                setLastUpdated(dateTextFromString(date));
            });
        const data = fetch(`runegraft/runegraft_poe_ninja.json`)
            .then((r) => r.json()) as Promise<PoeNinjaRunegraftData>;

        data.then((d) => {
            // Create a map from name to price since the logic relies on regex matching names
            // The JSON has flat lines with name and chaosValue
            const nameToPrice = new Map(d.lines.map((l) => [l.name, l.chaosValue]));

            // Map regexes to prices
            const pricedRegex: RunegraftPriceRegex[] = runegraftRegex.map((t) => {
                const price = nameToPrice.get(t.runegraft) ?? 0;
                return {
                    name: t.runegraft,
                    chaosValue: Math.ceil(price),
                    regex: t.regex,
                    description: t.description
                };
            });

            pricedRegex.sort(sortByChaosValue);
            setRunegraftPrices(pricedRegex);
        });

        const tattooData = fetch(`runegraft/tattoos.json`)
            .then((r) => r.json()) as Promise<PoeNinjaTattooData>;

        tattooData.then((d) => {
            const idToName = new Map(d.items.map((i) => [i.id, i.name]));
            const nameToRegex = new Map(tattooRegex.map((t) => [t.tattoo, t]));
            const tattoos: RunegraftPriceRegex[] = d.lines.map((l) => {
                const name = idToName.get(l.id) ?? l.id;
                const tattooInfo = nameToRegex.get(name);
                return {
                    name: name,
                    chaosValue: Math.ceil(l.primaryValue),
                    regex: tattooInfo?.regex ?? name.toLowerCase(),
                    description: tattooInfo?.description ?? "Tattoo"
                };
            });
            setTattooPrices(tattoos);
        }).catch(e => console.error("Failed to load tattoos", e));
    }, []);

    useEffect(() => {
        saveSettings({
            ...profile,
            runegraft: {
                minValue: minChaosValue,
                maxValue: maxChaosValue,
                includeTattoos: includeTattoos
            }
        });
        const minChaosN = minChaosValue ? minChaosValue as unknown as number : undefined;
        const maxChaosN = maxChaosValue ? maxChaosValue as unknown as number : undefined;

        let prices = [...runegraftPrices];
        if (includeTattoos) {
            prices = [...prices, ...tattooPrices];
        }
        prices.sort(sortByChaosValue);
        setDisplayedPrices(prices);

        setResult(generateRegex(prices, minChaosN, maxChaosN));
    }, [minChaosValue, maxChaosValue, runegraftPrices, includeTattoos, tattooPrices]);

    return (
        <>
            <Header text={"Runegraft"} />
            <ResultBox result={result} warning={""} reset={() => {
                setMinChaosValue("0");
                setMaxChaosValue("999");
            }} />
            <p className="runegraft-price-info">Using price data from the {leagueName} League. Last updated: {lastUpdated}</p>
            <div className="row runegraft-options">
                <div>
                    <span className="expedition-option-text">Min chaos value:</span>
                    <input type="search" className="modifier-quantity-box" id="pack-size" name="search-mod" value={minChaosValue}
                        onChange={v => {
                            const val = v.target.value;
                            const value = val;
                            setMinChaosValue(value);
                        }} />

                </div>
                <div>
                    <span className="expedition-option-text">Max chaos value:</span>
                    <input type="search" className="modifier-quantity-box" id="pack-size" name="search-mod" value={maxChaosValue}
                        onChange={v => {
                            const val = v.target.value;
                            const value = val;
                            setMaxChaosValue(value);
                        }} />

                </div>
                <div>
                    <span className="expedition-option-text">Include tattoos:</span>
                    <input type="checkbox" checked={includeTattoos}
                        onChange={v => {
                            setIncludeTattoos(v.target.checked);
                        }} />
                </div>
            </div>
            <div className="row">
                <Collapsable header={"Price data"} isOpenByDefault={true}>
                    <div className="runegraft-row runegraft-header">
                        <div className="runegraft-name-cell">Runegraft name</div>
                        <div className="runegraft-regex-cell">Regex</div>
                        <div className="runegraft-value-cell">Chaos</div>
                        <div className="runegraft-description-cell">Effect</div>
                    </div>
                    {displayedPrices.map((e) => {
                        const highlighted = result.includes(e.regex);
                        const highlightedCss = highlighted ? "runegraft-highlighted" : "";
                        return (
                            <div className={`runegraft-row ${highlightedCss}`} key={e.name}>
                                <div className="runegraft-name-cell" key={e.name}>{e.name}</div>
                                <div className="runegraft-regex-cell">{e.regex}</div>
                                <div className="runegraft-value-cell">{e.chaosValue}</div>
                                <div className="runegraft-description-cell">{e.description}</div>
                            </div>
                        )
                    })}
                </Collapsable>
            </div>
        </>
    );
}

export default Runegraft;
