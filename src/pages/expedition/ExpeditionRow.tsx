import {PricedBaseType, PricedItemWithFallback} from "./ExpeditionTypes";
import {Dispatch, SetStateAction} from "react";
import {toggleSelectBaseType} from "./ExpeditionUtils";
import chaosOrb from "../../img/Chaos_Orb_inventory_icon.png";

interface ItemDisplayProps {
    pricedItem: PricedItemWithFallback
    onClick?: (e: any) => any
}

const normalizeValue = (item: PricedItemWithFallback): string => {
    if (item.displayPrice > 1000) {
        const kvalue = item.displayPrice / 1000;
        const value = Math.round(kvalue);
        return `${value}k`
    }
    return `${Math.round(item.displayPrice)}`;
}

const isFallbackPrice = (pricedItem: PricedItemWithFallback) =>
    pricedItem.displayPrice === -1 || pricedItem.price === undefined;

export const ItemDisplay = (props: ItemDisplayProps) => {
    const {pricedItem, onClick} = props;
    const item = pricedItem.item;

    return (
        <div onClick={onClick} className="expedition-img-container item-tooltip">
            <img alt={item.name} className="expedition-img" src={item.icon}>
            </img>
            <span className="expedition-img-value">
                {normalizeValue(pricedItem)}{isFallbackPrice(pricedItem) && <span className="expedition-fallback-price">?</span>}
                <img src={chaosOrb} className="chaos-orb-price-icon" />
                <span className="item-tooltip-text">
                    <span className="hover-img-text">{item.name}&nbsp;</span>
                    <div>
                    <a className="item-tooltip-text-wiki" onClick={(e) => e.stopPropagation()} target="_blank"
                       href={`https://www.poewiki.net/w/index.php?search=${item.name}`}>[wiki]</a>
                    </div>
                </span>
            </span>
        </div>
    );
}

interface ExpeditionRowProps {
    pricedBaseType: PricedBaseType
    itemSearch: string
    minValueToDisplay: number
    selectedBaseTypes: string[]
    setSelectedBaseType: Dispatch<SetStateAction<string[]>>
}


export const ExpeditionRow = (props: ExpeditionRowProps) => {
    const {pricedBaseType, selectedBaseTypes, minValueToDisplay, setSelectedBaseType, itemSearch} = props;

    const baseTypeIsSelected = selectedBaseTypes.some((e) => e === pricedBaseType.baseType);
    const valuedItems = pricedBaseType.items.filter((e) => e.displayPrice >= minValueToDisplay);
    const itemsMatchingSearch = itemSearch.length > 2 ? pricedBaseType.items.filter((e) => e.item.name.includes(itemSearch)) : [];
    const itemsToDisplay = valuedItems.length === 0 ? [pricedBaseType.items[0]] : valuedItems;
    const itemsToDisplayWithSearch = Array.from(new Set(itemsMatchingSearch.concat(itemsToDisplay)));

    return (
        <div
            className={baseTypeIsSelected ? "expedition-selected-basetype full-size expedition-row" : "full-size expedition-row"}
            onClick={() => {
                toggleSelectBaseType(selectedBaseTypes, setSelectedBaseType, pricedBaseType.baseType)
            }}
        >
            <div className="expedition-basetype-cell">
                {pricedBaseType.baseType}
            </div>
            {itemsToDisplayWithSearch.map((item) => <ItemDisplay key={item.item.name} pricedItem={item}/>)}
        </div>
    );
};

export default ExpeditionRow;
