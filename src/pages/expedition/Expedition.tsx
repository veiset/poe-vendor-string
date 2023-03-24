import {useEffect, useState} from "react";
import {BaseTypeRegex, baseTypeRegex, Item} from "../../generated/GeneratedExpedition";
import Header from "../../components/Header";
import ResultBox from "../../components/ResultBox";
import ExpeditionRow, {ItemDisplay} from "./ExpeditionRow";
import "./Expedition.css";
import ExpeditionOptions from "./ExpeditionOptions";
import ModSearchBox from "../../components/ModSearchBox";
import Collapsable from "../../components/collapsable/Collapsable";
import {distinct, groupBy} from "../../utils/ListUtils";
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";

dayjs.extend(relativeTime);

export const leagueName = "Sanctum";

export interface PoeNinjaItem {
    name: string
    baseType: string
    chaosValue: number
    icon: string
    links?: number
    detailsId?: string
}

interface PoeNinjaData {
    lines: PoeNinjaItem[]
}

export interface PricedItemWithFallback {
    item: Item
    price: number | undefined
    fallbackPrice: number
    displayPrice: number
}

export interface PricedBaseType {
    baseType: string
    items: PricedItemWithFallback[]
    regex: string
    mostExpensiveItem: number
}

interface PriceData {
    pricedBaseTypes: PricedBaseType[]
    unknownItems: string[]
    usingOnlyFallback: boolean
}


const sortByValue = (a: PricedItemWithFallback, b: PricedItemWithFallback): number => b.displayPrice - a.displayPrice

const allItemsFromGeneratedItems = (baseTypeRegex: { [key: string]: BaseTypeRegex }): Item[] => {
    const baseTypes: string[] = Array.from(Object.keys(baseTypeRegex));
    return baseTypes.flatMap((baseType) => {
        return baseTypeRegex[baseType].items;
    });
}


const fallbackPricing = (type: string): Promise<PoeNinjaData> => {
    return fetch(`expedition/eco_fallback_Unique${type}.json`)
        .then((r) => r.json())
}

const fetchLeaguePricing = (league: string, type: string): Promise<PoeNinjaData> => {
    return fetch(`expedition/eco_${league}_Unique${type}.json`)
        .then((r) => r.json());
}

const generateRegex = (selectedBases: string[], fillerBases: string[]): string => {
    const allBases = distinct(selectedBases.concat(fillerBases));
    if (allBases.length === 0) {
        return "";
    }

    const regex = allBases.map((e) => baseTypeRegex[e].regex).join("|").replaceAll("\"", "");
    return `"${regex}"`;
}

const generateFillerBases = (selectedBases: string[], priceData: PriceData): PricedBaseType[] => {
    const currentRegexLength = generateRegex(selectedBases, []).length;
    let count = Math.max(currentRegexLength);

    return priceData.pricedBaseTypes.reduce((acc: PricedBaseType[], el: PricedBaseType) => {
        let currentBases = selectedBases.concat(acc.map((e) => e.baseType));
        if (currentBases.includes(el.baseType)) {
            return acc;
        }
        const regexAddition = "|" + baseTypeRegex[el.baseType].regex.replaceAll("\"", "");
        const newRegexSize = count + regexAddition.length;
        if (newRegexSize <= 50 && el.mostExpensiveItem > 69) {
            count += regexAddition.length;
            return acc.concat(el);
        } else {
            return acc;
        }
    }, []);
}

const generateSortedPriceData = (allItems: Item[], fallbackPrices: PoeNinjaItem[], leaguePrices: PoeNinjaItem[]): PriceData => {
    const fallbackMap = new Map(fallbackPrices.map(i => [i.name, i.chaosValue]));
    const leagueMap = new Map(leaguePrices?.map(i => [i.name, i.chaosValue]));

    // Find items not in the generated base items
    const allSeenItems = allItems.map((item) => item.name)
        .concat(fallbackPrices.map((pricedItem) => pricedItem.name))
        .concat(leaguePrices.map((pricedItem) => pricedItem.name));
    const itemsToRemove = new Set(allItems.map((item) => item.name));
    const itemsNotInGenerator = allSeenItems.filter(itemName => !itemsToRemove.has(itemName));
    if (itemsNotInGenerator.length > 0) {
        console.warn(itemsNotInGenerator);
    }

    const pricedItemsWithFallback: PricedItemWithFallback[] = allItems.map((item) => {
        const price = leagueMap.get(item.name);
        const fallbackPrice = fallbackMap.get(item.name) ?? -1;
        return {
            item: item,
            price: price,
            fallbackPrice: fallbackPrice,
            displayPrice: price ?? fallbackPrice,
        }
    });

    // Generate priced base types
    const groupedItems: { [key: string]: PricedItemWithFallback[] } = groupBy(pricedItemsWithFallback, (e) => e.item.baseType);
    const baseTypes: string[] = Array.from(Object.keys(groupedItems));
    const pricedBaseTypes = baseTypes.map((baseType) => {
        const items = groupedItems[baseType].sort(sortByValue);
        return {
            baseType: baseType,
            items: items,
            mostExpensiveItem: items[0].displayPrice,
            regex: baseTypeRegex[baseType].regex,
        }
    });

    return {
        pricedBaseTypes: pricedBaseTypes.sort((e1, e2) => e2.mostExpensiveItem - e1.mostExpensiveItem),
        unknownItems: itemsNotInGenerator,
        usingOnlyFallback: leaguePrices.length === 0,
    }
}

const cleanUpPoeNinjaItems = (data: PoeNinjaItem[]): PoeNinjaItem[] => {
    return data
        .filter((e) => e.links === undefined)
        .filter((e) => !e.detailsId?.endsWith("relic"))
        .filter((e) => {
            const baseType: BaseTypeRegex | undefined = e.baseType in baseTypeRegex ? baseTypeRegex[e.baseType] : undefined;
            return baseType?.items.map((item) => item.name).includes(e.name);
        })
}

const filterPricedItems = (
    pricedBaseTypes: PricedBaseType[],
    predicate: (pricedBaseType: PricedBaseType, item: PricedItemWithFallback) => boolean
): PricedItemWithFallback[] => {
    return pricedBaseTypes
        .flatMap((pricedBaseType: PricedBaseType) => {
            return pricedBaseType.items.filter((item) => predicate(pricedBaseType, item))
        })
}
const showMostExpensiveAndValuedItems = (minValueToDisplay: number) => (pricedBaseType: PricedBaseType, item: PricedItemWithFallback) => {
    return item.displayPrice >= minValueToDisplay || item.displayPrice === pricedBaseType.mostExpensiveItem
}

const showLowValueItems = (minValueToDisplay: number) => (pricedBaseType: PricedBaseType, item: PricedItemWithFallback) => {
    return item.displayPrice < minValueToDisplay && item.displayPrice !== pricedBaseType.mostExpensiveItem
}

const dateTextFromString = (date: string): string => {
    const d2 = dayjs(date);
    if (d2.isValid()) {
        const nextUpdate = d2.add(4, "hour");
        if (dayjs(new Date()).diff(d2, "day") > 1) {
            return `Old economy. Using data from ${d2.fromNow()}. Prices will soon be updated.`;
        } else {
            return `Economy last updated ${d2.fromNow()}, next update at ~${nextUpdate.format("HH:mm:00 (Z)")}`;
        }
    }
    return "Economy updated is unknown.";
}

const Expedition = () => {

    const allItems = allItemsFromGeneratedItems(baseTypeRegex);

    const [leaguePrices, setLeaguePrices] = useState<PoeNinjaItem[]>([]);
    const [fallbackPrices, setFallbackPrices] = useState<PoeNinjaItem[]>([]);
    const [priceData, setPriceData] = useState<PriceData>();
    const [fillerBases, setFillerBases] = useState<PricedBaseType[]>([]);

    // Settings
    const [selectedBaseTypes, setSelectedBaseTypes] = useState<string[]>([]); // local storage
    const [league, setLeague] = useState(leagueName); // should use local storage where Standard/Hardcore/League IFNOT currentLeague
    const [minValueToDisplay, setMinValueToDisplay] = useState<number>(90); // local storage
    const [addFillerItems, setAddFillerItems] = useState<boolean>(true); // local storage

    // Temporary settings
    const [itemSearch, setItemSearch] = useState("");
    const [result, setResult] = useState("");
    const [lastUpdated, setLastUpdated] = useState("Outdated prices. Check back in a few mins...");
    const [displayedItems, setDisplayedItems] = useState(15);

    useEffect(() => {
        console.log("Fetching pre-data");
        Promise.all([
            fallbackPricing("Accessory"),
            fallbackPricing("Armour"),
            fallbackPricing("Jewel"),
            fallbackPricing("Weapon"),
        ]).then((responses) => {
            const valuedItems = cleanUpPoeNinjaItems(responses.flatMap((d) => d.lines));
            setFallbackPrices(valuedItems);
        });
        fetch(`generated.txt`, {headers: {'Content-Type': 'application/text'}})
            .then((r) => r.text())
            .then((date) => {
                setLastUpdated(dateTextFromString(date));
            });
    }, []);

    useEffect(() => {
        const priceData = generateSortedPriceData(allItems, fallbackPrices, leaguePrices);
        setPriceData(priceData)
    }, [fallbackPrices, leaguePrices]);

    useEffect(() => {
        Promise.all([
            fetchLeaguePricing(league, "Accessory"),
            fetchLeaguePricing(league, "Armour"),
            fetchLeaguePricing(league, "Jewel"),
            fetchLeaguePricing(league, "Weapon"),
        ]).then((responses) => {
            const pricedObtainableItems = cleanUpPoeNinjaItems(responses.flatMap((d) => d.lines));
            setLeaguePrices(pricedObtainableItems);
        }).catch(() => {
            console.warn("Fetching of real time data failed");
        });
    }, [league]);


    useEffect(() => {
        if (priceData && addFillerItems) {
            const fillerBases = generateFillerBases(selectedBaseTypes, priceData);
            setFillerBases(fillerBases);
            setResult(generateRegex(selectedBaseTypes, fillerBases.map((e) => e.baseType)));
        } else {
            setFillerBases([]);
            setResult(generateRegex(selectedBaseTypes, []));
        }
    }, [priceData, addFillerItems, selectedBaseTypes]);

    if (priceData === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header text={"Gwennen Expedition"}/>
            <ResultBox result={result} warning={undefined} reset={() => {
                setSelectedBaseTypes([]);
                setMinValueToDisplay(90);
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
                    {filterPricedItems(
                        priceData.pricedBaseTypes.filter((pricedBase) => selectedBaseTypes.includes(pricedBase.baseType)),
                        showMostExpensiveAndValuedItems(minValueToDisplay)
                    ).map((pricedItem) => {
                        return <ItemDisplay key={pricedItem.item.name} pricedItem={pricedItem}/>
                    })}
                </div>
                <div className={"expedition-col-60" + (addFillerItems ? "" : " expedition-fade")}>
                    {filterPricedItems(
                        fillerBases,
                        showMostExpensiveAndValuedItems(minValueToDisplay)
                    ).map((pricedItem) => {
                        return <ItemDisplay key={pricedItem.item.name} pricedItem={pricedItem}/>;
                    })}
                </div>
            </div>
            <div className="row">
                <Collapsable header={"Show all other items that will also match (based on selected basetypes)"}>
                    {filterPricedItems(
                        priceData.pricedBaseTypes
                            .filter((pricedBase) => selectedBaseTypes.includes(pricedBase.baseType))
                            .concat(fillerBases),
                        showLowValueItems(minValueToDisplay)
                    ).map((pricedItem, i) => {
                        return <ItemDisplay key={pricedItem.item.name + i} pricedItem={pricedItem}/>
                    })}
                </Collapsable>
            </div>
            <div className="row">
                <div className="expedition-col-40">
                    <ModSearchBox id="item-search" placeholder="Search for an item ..." search={itemSearch} setSearch={setItemSearch}/>
                </div>
                <div className="expedition-col-60">
                    Minimum chaos value to display:
                    <input type="search" className="modifier-quantity-box" id="pack-size" name="search-mod" value={minValueToDisplay}
                           onChange={v => setMinValueToDisplay(v.target.value as unknown as number)}/>
                    (most expensive of a base will still be shown)
                </div>
            </div>
            <div className="full-size expedition-row-container">
                {priceData.pricedBaseTypes
                    .filter((e) => {
                        if (!itemSearch || itemSearch.length < 3) return true;
                        if (e.baseType.toLowerCase().includes(itemSearch.toLowerCase())) return true;

                        const search = itemSearch.toLowerCase();
                        return e.baseType.toLowerCase().includes(search) || e.items.some((e) => e.item.name.toLowerCase().includes(search));
                    })
                    .slice(0, displayedItems).map((base) => {
                        return (<ExpeditionRow
                            pricedBaseType={base}
                            setSelectedBaseType={setSelectedBaseTypes}
                            selectedBaseTypes={selectedBaseTypes}
                            minValueToDisplay={minValueToDisplay}
                            itemSearch={itemSearch}
                            key={base.baseType}
                        />)
                    })}
            </div>
            <div onClick={() => {
                console.log("Loading more");
                setDisplayedItems(20);
            }}>Load more...
            </div>
            <div className="full-size"></div>
        </>
    );
};

export default Expedition;
