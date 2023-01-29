import {useEffect, useState} from "react";
import {BaseTypeRegex, baseTypeRegex} from "../../generated/GeneratedExpedition";
import Header from "../../components/Header";
import ResultBox from "../../components/ResultBox";
import ExpeditionRow, {ItemDisplay} from "./ExpeditionRow";
import "./Expedition.css";
import {Checkbox} from "../vendor/Vendor";
import ExpeditionOptions from "./ExpeditionOptions";
import ModSearchBox from "../../components/ModSearchBox";
import Collapsable from "../../components/collapsable/Collapsable";
import {distinct} from "../../utils/ListUtils";
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";

dayjs.extend(relativeTime);

export const leagueName = "Sanctum";

export interface ValuedItem {
    name: string
    baseType: string
    chaosValue: number
    icon: string
    links?: number
    detailsId?: string
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

const sortByChaosValue = (a: ValuedItem, b: ValuedItem): number => b.chaosValue - a.chaosValue

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

        const items = (valuedItems as ValuedItem[]).sort(sortByChaosValue);

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

const generateRegex = (selected: ValuedItem[], fillerItems: ValuedItem[]): string => {
    const allBases = distinct(selected.concat(fillerItems).map((e) => e.baseType));
    if (allBases.length === 0) {
        return "";
    }

    const regex = allBases.map((e) => baseTypeRegex[e].regex).join("|").replaceAll("\"", "");
    return `"${regex}"`;
}

const generateFillerItems = (selected: ValuedItem[], allItems: ValuedItem[]): ValuedItem[] => {
    const selectedBases = distinct(selected.map((e) => e.baseType));
    const currentRegexLength = generateRegex(selected, []).length;
    const baseRegexSpace = Math.max(currentRegexLength, 2);

    const itemsSortedByValue = allItems
        .filter((e) => !selected.some((ev) => ev.name === e.name))
        .sort(sortByChaosValue);

    let count = baseRegexSpace;
    return itemsSortedByValue.reduce((acc: ValuedItem[], el: ValuedItem) => {
        let currentBases = selectedBases.concat(acc.map((e) => e.baseType));
        if (currentBases.includes(el.baseType) && el.chaosValue > 200) {
            return acc.concat(el);
        }
        const regexAddition = "|" + baseTypeRegex[el.baseType].regex.replaceAll("\"", "");
        const newRegexSize = count + regexAddition.length;
        if (newRegexSize <= 50 && el.chaosValue > 200) {
            count += regexAddition.length;
            return acc.concat(el);
        } else {
            return acc;
        }
    }, []);
}

const Expedition = () => {

    // Item data
    const [items, setItems] = useState<ValuedItem[]>();
    const [valuedBases, setValuedBases] = useState<ValuedBaseType[]>([]);
    const [selectedItems, setSelectedItems] = useState<ValuedItem[]>([]);
    const [fillerItems, setFillerItems] = useState<ValuedItem[]>([]);
    const [otherMatchingItems, setOtherMatchingItems] = useState<ValuedItem[]>([]);
    const [valueMap, setValueMap] = useState<Map<string, ValuedItem>>(new Map());
    // Settings
    const [addFillerItems, setAddFillerItems] = useState<boolean>(true);
    const [displayLowValue, setDisplayLowValue] = useState<boolean>(false);

    const [itemSearch, setItemSearch] = useState("");
    const [result, setResult] = useState("");
    const [league, setLeague] = useState(leagueName);
    const [lastUpdated, setLastUpdated] = useState("Outdated prices. Check back in a few mins...");

    useEffect(() => {
        Promise.all([
            priceData(league, "Accessory"),
            priceData(league, "Armour"),
            priceData(league, "Jewel"),
            priceData(league, "Weapon"),
        ]).then((responses) => {
            const pricedObtainableItems = responses.flatMap((d) => d.lines)
                .filter((e) => e.links === undefined)
                .filter((e) => !e.detailsId?.endsWith("relic"))
                .filter((e) => {
                    const baseType: BaseTypeRegex | undefined = e.baseType in baseTypeRegex ? baseTypeRegex[e.baseType] : undefined;
                    return baseType?.items.map((item) => item.name).includes(e.name);
                })
                .sort(sortByChaosValue);

            setItems(pricedObtainableItems);
            setFillerItems(generateFillerItems(selectedItems, pricedObtainableItems));
            const valuedItems = new Map(pricedObtainableItems.map(i => [i.name, i]));
            setValueMap(valuedItems);
            if (selectedItems.length > 0) {
                setSelectedItems(selectedItems
                    .map((s) => valuedItems.get(s.name))
                    .filter((e) => e !== undefined) as ValuedItem[]);
            }
        }).catch(() => {
            if (league !== "Standard") {
                setLeague("Standard");
            }
        });
    }, [league]);

    useEffect(() => {
        fetch(`generated.txt`, {headers: {'Content-Type': 'application/text'}})
            .then((r) => r.text())
            .then((date) => {
                const d2 = dayjs(date);
                if (d2.isValid()) {
                    const nextUpdate = d2.add(4, "hour");
                    if (dayjs(new Date()).diff(d2, "day") > 1) {
                        setLastUpdated(`Old economy. Using data from ${d2.fromNow()}. Prices will soon be updated.`);
                    } else {
                        setLastUpdated(`Economy last updated ${d2.fromNow()}, next update at ~${nextUpdate.format("HH:mm:00 (Z)")}`)
                    }
                }
            });
    }, []);


    useEffect(() => {
        if (items !== undefined) {
            setValuedBases(generateValuedBaseTypes(baseTypeRegex, items));
            console.log("total items:", items.length);
            console.log("Missing economy items on:", valuedBases.flatMap((e) => e.otherItems).filter((e) => e.chaosValue === -1));
            console.log("Missing economy items on:", items.filter((e) => e.chaosValue === 0).length);
        }
    }, [items]);


    useEffect(() => {
        if (items) {
            const displayedFillerItems = generateFillerItems(selectedItems, items);
            setFillerItems(displayedFillerItems);

            const fillerItems = addFillerItems ? displayedFillerItems : [];
            setResult(generateRegex(selectedItems, fillerItems));

            const allMatchedItems = selectedItems
                .concat(fillerItems)
                .flatMap((e) => baseTypeRegex[e.baseType].items)
                .map((item) => valueMap.get(item.name))
                .filter((x, i, a) => a.indexOf(x) === i);
            const allOtherItems = allMatchedItems.filter((vi) => !selectedItems.concat(fillerItems).some((e) => e.name === vi?.name));
            setOtherMatchingItems((allOtherItems.filter((e) => e !== undefined) as ValuedItem[]).sort(sortByChaosValue));
        }
    }, [items, selectedItems, addFillerItems, league]);

    if (items === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header text={"Gwennen Expedition"}/>
            <ResultBox result={result} warning={undefined} reset={() => {
                setSelectedItems([]);
            }}/>
            <ExpeditionOptions
                league={league}
                lastUpdate={lastUpdated}
                setLeague={setLeague}
                expensiveUniques={addFillerItems}
                setExpensiveUniques={setAddFillerItems}
            />
            <div className="row expedition-selection-header">
                <div className="expedition-col-40">Selected items</div>
                <div className="expedition-col-60">Automatically added</div>
            </div>
            <div className="row expedition-item-regex-area">
                <div className="expedition-col-40">
                    {selectedItems.sort(sortByChaosValue).map((selected) => {
                        return (<ItemDisplay key={selected.name} selectedItems={selectedItems} setSelectedItems={setSelectedItems} valuedItem={selected}/>);
                    })}
                </div>
                <div className={"expedition-col-60" + (addFillerItems ? "" : " expedition-fade")}>
                    {fillerItems.map((selected) => {
                        return (<ItemDisplay key={selected.name} selectedItems={selectedItems} setSelectedItems={setSelectedItems} valuedItem={selected}/>);
                    })}
                </div>
            </div>
            <div className="row">
                <Collapsable header={"Show all other items that will also match (based on selected basetypes)"}>
                    {otherMatchingItems.map((item) => {
                        return (<ItemDisplay key={item.name} selectedItems={selectedItems} setSelectedItems={setSelectedItems} valuedItem={item}/>);
                    })}
                </Collapsable>
            </div>
            <div className="row">
                <div className="expedition-col-40">
                    <ModSearchBox id="item-search" placeholder="Search for an item ..." search={itemSearch} setSearch={setItemSearch}/>
                </div>
                <div className="expedition-col-60">
                    <Checkbox className="low-value-uniques" label="Display low value uniques" value={displayLowValue}
                              onChange={setDisplayLowValue}/>
                </div>
            </div>
            <div className="full-size expedition-row-container">
                {valuedBases
                    .filter((e) => {
                        if (!itemSearch || itemSearch.length < 3) return true;
                        if (e.baseType.toLowerCase().includes(itemSearch.toLowerCase())) return true;

                        const search = itemSearch.toLowerCase();
                        return e.mostValuedItem?.name.toLowerCase().includes(search) || e.otherItems.some((e) => e.name.toLowerCase().includes(search));
                    })
                    .slice(0, 10).map((base) => {
                        return (<ExpeditionRow
                            setSelectedItems={setSelectedItems}
                            selectedItems={selectedItems}
                            showLowValueUniques={displayLowValue}
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
