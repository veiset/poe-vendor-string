import {useEffect, useState} from "react";
import {BaseTypeRegex, baseTypeRegex} from "../../generated/GeneratedExpedition";
import Header from "../../components/Header";
import ResultBox from "../../components/ResultBox";
import ExpeditionRow, {ItemDisplay} from "./ExpeditionRow";
import "./Expedition.css";
import {Checkbox} from "../vendor/Vendor";
import ExpeditionOptions from "./ExpeditionOptions";
import ModSearchBox from "../../components/ModSearchBox";

const leagueName = "Sanctum";

export interface ValuedItem {
    name: string
    baseType: string
    chaosValue: number
    icon: string
    links?: number
}

export interface ValuedBaseType {
    baseType: string
    regex: string
    maxChaosValue: number
    mostValuedItem: ValuedItem | undefined
    otherItems: ValuedItem[]
}

interface PoeNinjaData {
    lines: ValuedItem[]
}

function takeWhile<T>(arr: T[], func: (all: T[], current: T) => boolean): T[] {
    return arr.reduce((acc: T[], el: T) => (!func(acc, el) ? acc : acc.concat(el)), []);
}

const generateValuedBaseTypes = (baseTypeRegex: { [key: string]: BaseTypeRegex }, items: ValuedItem[]): ValuedBaseType[] => {
    const itemValueMap: Map<string, ValuedItem> = new Map(items.map(i => [i.name, i]));
    const baseTypes: string[] = Array.from(Object.keys(baseTypeRegex))

    return baseTypes.map((baseType) => {
        const baseRegex = baseTypeRegex[baseType];

        const valuedItems: (ValuedItem | undefined)[] = baseRegex.items.map((item) => {
            return itemValueMap.get(item.name);
        });

        if (valuedItems.includes(undefined)) {
            return {
                baseType: baseRegex.baseType,
                regex: baseRegex.regex,
                maxChaosValue: -1,
                mostValuedItem: undefined,
                otherItems: baseRegex.items.map((item) => {
                    return itemValueMap.get(item.name) ?? {
                        name: item.name,
                        baseType: item.baseType,
                        chaosValue: -1,
                        icon: item.icon
                    }
                })
            }
        }

        const items = (valuedItems as ValuedItem[]).sort((a, b) => b.chaosValue - a.chaosValue);

        return {
            baseType: baseRegex.baseType,
            regex: baseRegex.regex,
            maxChaosValue: items[0].chaosValue,
            mostValuedItem: items[0],
            otherItems: items.slice(1, items.length)
        }
    }).sort((a, b) => b.maxChaosValue - a.maxChaosValue);
}

const priceData = (league: string, type: string): Promise<PoeNinjaData> => {
    return fetch(`expedition/eco_${league}_Unique${type}.json`)
        .then((r) => r.json());
}

const generateFillerItems = (selected: ValuedItem[], allItems: ValuedItem[]): ValuedItem[] => {
    const currentRegexLength = selected
        .map((e) => baseTypeRegex[e.baseType].regex)
        .join("|")
        .replaceAll("\"", "").length;

    const itemsSortedByValue = allItems
        .filter((e) => !selected.some((ev) => ev.name === e.name))
        .sort((a, b) => b.chaosValue - a.chaosValue);

    const mostValuedItems = takeWhile(itemsSortedByValue, (all) =>
        all.map((e) => baseTypeRegex[e.baseType].regex).join("|").replaceAll("\"", "").length < 50 - currentRegexLength - 2
    );

    return mostValuedItems.slice(0, mostValuedItems.length - 1);
}

const Expedition = () => {

    // ValueMap: Str -> Chaos
    const [data, setData] = useState<ValuedItem[]>();
    const [valuedBases, setValuedBases] = useState<ValuedBaseType[]>([]);
    const [itemSearch, setItemSearch] = useState("");
    const [expensiveUniques, setExpensiveUniques] = useState<boolean>(true);
    const [lowValueUniques, setLowValueUniques] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<ValuedItem[]>([]);
    const [fillerItems, setFillerItems] = useState<ValuedItem[]>([]);

    const [result, setResult] = useState("");

    useEffect(() => {
        Promise.all([
            priceData(leagueName, "Accessory"),
            priceData(leagueName, "Armour"),
            priceData(leagueName, "Jewel"),
            priceData(leagueName, "Weapon"),
        ]).then((responses) => {
            const allItems: ValuedItem[] = responses.flatMap((d) => d.lines);
            const pricedObtainableItems = allItems
                .filter((e) => {
                    return e.links === undefined;
                })
                .filter((e) => {
                    const baseType: BaseTypeRegex | undefined = e.baseType in baseTypeRegex ? baseTypeRegex[e.baseType] : undefined;
                    return baseType?.items.map((item) => item.name).includes(e.name);
                })
                .sort((a, b) => b.chaosValue - a.chaosValue);
            setData(pricedObtainableItems);
            setFillerItems(generateFillerItems(selectedItems, pricedObtainableItems));
        });
    }, []);

    useEffect(() => {
        if (data !== undefined) {
            setValuedBases(generateValuedBaseTypes(baseTypeRegex, data));
            console.log("Missing economy data on:", valuedBases.flatMap((e) => e.otherItems).filter((e) => e.chaosValue === -1));
        }
    }, [data]);


    useEffect(() => {
        if (data) {
            let valuedItems = generateFillerItems(selectedItems, data);
            const regex = selectedItems.concat(expensiveUniques ? valuedItems : [])
                .map((e) => baseTypeRegex[e.baseType].regex.replaceAll("\"", "")).join("|");
            setFillerItems(valuedItems);
            setResult(`"${regex}"`);
        }
    }, [data, selectedItems, expensiveUniques]);


    if (data === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header text={"Gwennen Expedition"}/>
            <ResultBox result={result} warning={undefined} reset={() => {
            }}/>
            <ExpeditionOptions
                expensiveUniques={expensiveUniques}
                setExpensiveUniques={setExpensiveUniques}
            />
            <div className="row">
                <div className="expedition-col-40">User selected items</div>
                <div className="expedition-col-60">Automatically added</div>
            </div>
            <div className="row expedition-item-regex-area">
                <div className="expedition-col-40">
                    {selectedItems.map((selected) => {
                        return (<ItemDisplay key={selected.name} selectedItems={selectedItems} setSelectedItems={setSelectedItems} valuedItem={selected} />);
                    })}
                </div>
                <div className={"expedition-col-60" + (expensiveUniques ? "" : " expedition-fade")}>
                    {fillerItems.map((selected) => {
                        return (<ItemDisplay key={selected.name} selectedItems={selectedItems} setSelectedItems={setSelectedItems} valuedItem={selected} />);
                    })}
                </div>
            </div>
            <div className="row">
                <div className="expedition-col-40">
                    <ModSearchBox id="item-search" placeholder={"Search for an item ..."} search={itemSearch} setSearch={setItemSearch}/>
                </div>
                <div className="expedition-col-60">
                    <Checkbox label="Display low value uniques" value={lowValueUniques}
                              onChange={setLowValueUniques}/>
                </div>
            </div>
            <div className="full-size expedition-row-container">
                {valuedBases
                    .filter((e) => {
                        if (!itemSearch || itemSearch.length < 2) return true;
                        if (e.baseType.toLowerCase().includes(itemSearch.toLowerCase())) return true;

                        const search = itemSearch.toLowerCase();
                        return e.mostValuedItem?.name.toLowerCase().includes(search) || e.otherItems.some((e) => e.name.toLowerCase().includes(search));
                    })
                    .slice(0, 10).map((base) => {
                        return (<ExpeditionRow
                            setSelectedItems={setSelectedItems}
                            selectedItems={selectedItems}
                            showLowValueUniques={lowValueUniques}
                            itemSearch={itemSearch}
                            valuedBaseType={base}
                            key={base.baseType}
                        />)
                    })}
            </div>
            <div className="full-size"></div>
        </>
    );
};

export default Expedition;
