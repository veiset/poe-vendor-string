import Header from "../../components/Header";
import ResultBox from "../../components/ResultBox";
import React, { useContext, useEffect, useState } from "react";
import { leagueName } from "../expedition/Expedition";
import "./Tattoo.css";
import Collapsable from "../../components/collapsable/Collapsable";
import { dateTextFromString } from "../expedition/ExpeditionUtils";
import { loadSettings, saveSettings } from "../../utils/LocalStorage";
import { defaultSettings } from "../../utils/SavedSettings";
import { ProfileContext } from "../../components/profile/ProfileContext";
import { tattooRegex } from "../../generated/GeneratedTattoo";

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

interface TattooPriceRegex {
    name: string
    chaosValue: number
    regex: string
    description: string
}

const sortByChaosValue = (e1: TattooPriceRegex, e2: TattooPriceRegex) => e2.chaosValue - e1.chaosValue;

const generateRegex = (
    prices: TattooPriceRegex[],
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
        // .slice(0, 50)
        .reduce((acc, e) => {
            const currentLength = acc.length;
            const newLength = currentLength + e.regex.length + (currentLength > 0 ? 1 : 0);
            if (newLength > 100) return acc;
            return currentLength > 0 ? `${acc}|${e.regex}` : e.regex;
        }, "");
    return `"${regex}"`;
}

const Tattoo = () => {
    const { globalProfile } = useContext(ProfileContext);
    const profile = loadSettings(globalProfile);
    const [minChaosValue, setMinChaosValue] = useState<string>(profile.tattoo.minValue || "0");
    const [maxChaosValue, setMaxChaosValue] = useState<string>(profile.tattoo.maxValue || "999");

    const [tattooPrices, setTattooPrices] = useState<TattooPriceRegex[]>([]);
    const [lastUpdated, setLastUpdated] = useState("Outdated prices. Check back in a few mins...");
    const [result, setResult] = useState<string>("");

    useEffect(() => {
        fetch(`generated.txt`, { headers: { 'Content-Type': 'application/text' } })
            .then((r) => r.text())
            .then((date) => {
                setLastUpdated(dateTextFromString(date));
            });
        const data = fetch(`tattoo/tattoo_poe_ninja.json`)
            .then((r) => r.json()) as Promise<PoeNinjaTattooData>;

        data.then((d) => {
            // Map items (name -> id)
            const nameToId = new Map(d.items.map((i) => [i.name, i.id]));
            // Map lines (id -> price)
            const idToPrice = new Map(d.lines.map((l) => [l.id, l.primaryValue]));

            // Map regexes to prices
            const pricedRegex: TattooPriceRegex[] = tattooRegex.map((t) => {
                const id = nameToId.get(t.tattoo);
                const price = id ? (idToPrice.get(id) ?? 0) : 0;
                return {
                    name: t.tattoo,
                    chaosValue: Math.ceil(price),
                    regex: t.regex,
                    description: t.description
                };
            });

            pricedRegex.sort(sortByChaosValue);
            setTattooPrices(pricedRegex);
        });
    }, []);

    useEffect(() => {
        saveSettings({
            ...profile,
            tattoo: {
                minValue: minChaosValue,
                maxValue: maxChaosValue,
            }
        });
        const minChaosN = minChaosValue ? minChaosValue as unknown as number : undefined;
        const maxChaosN = maxChaosValue ? maxChaosValue as unknown as number : undefined;
        setResult(generateRegex(tattooPrices, minChaosN, maxChaosN));
    }, [minChaosValue, maxChaosValue, tattooPrices]);

    return (
        <>
            <Header text={"Tattoo"} />
            <ResultBox result={result} warning={""} reset={() => {
                setMinChaosValue(defaultSettings.tattoo.minValue);
                setMaxChaosValue(defaultSettings.tattoo.maxValue);
            }} />
            <p className="tattoo-price-info">Using price data from the {leagueName} League. Last updated: {lastUpdated}</p>
            <div className="row tattoo-options">
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
            </div>
            <div className="row">
                <Collapsable header={"Price data"} isOpenByDefault={true}>
                    <div className="tattoo-row tattoo-header">
                        <div className="tattoo-name-cell">Tattoo name</div>
                        <div className="tattoo-regex-cell">Regex</div>
                        <div className="tattoo-value-cell">Chaos</div>
                        <div className="tattoo-description-cell">Effect</div>
                    </div>
                    {tattooPrices.map((e) => {
                        const highlighted = result.includes(e.regex);
                        const highlightedCss = highlighted ? "tattoo-highlighted" : "";
                        return (
                            <div className={`tattoo-row ${highlightedCss}`} key={e.name}>
                                <div className="tattoo-name-cell" key={e.name}>{e.name}</div>
                                <div className="tattoo-regex-cell">{e.regex}</div>
                                <div className="tattoo-value-cell">{e.chaosValue}</div>
                                <div className="tattoo-description-cell">{e.description}</div>
                            </div>
                        )
                    })}
                </Collapsable>
            </div>
        </>
    );
}

export default Tattoo;
