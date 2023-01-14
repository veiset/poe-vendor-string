import {ValuedBaseType, ValuedItem} from "./Expedition";
import {Dispatch, SetStateAction} from "react";

interface ItemDisplayProps {
    selectedItems: ValuedItem[]
    setSelectedItems: Dispatch<SetStateAction<ValuedItem[]>>
    valuedItem: ValuedItem | undefined
}

const normalizeValue = (chaosValue: number): string => {
    if (chaosValue > 1000) {
        const kvalue = chaosValue / 1000;
        const value = Math.round(kvalue);
        return `${value}k`
    }
    return `${Math.round(chaosValue)}`;
}
export const ItemDisplay = (props: ItemDisplayProps) => {
    const {valuedItem, selectedItems, setSelectedItems } = props;

    if (!valuedItem) {
        return (<div>!</div>);
    }
    const selected = selectedItems.some((e) => e.name === valuedItem.name);
    return (
        <div className={`expedition-img-container item-tooltip ` + (selected ? "expedition-selected-item" : "")} onClick={() => {
            if (selected) {
                setSelectedItems(selectedItems.filter((e) => e.name !== valuedItem?.name));
            } else {
                setSelectedItems([...selectedItems, valuedItem])
            }
        }}>
            <img alt={valuedItem.name} className="expedition-img" src={valuedItem.icon}>
            </img>
            <span className="expedition-img-value">
                {normalizeValue(valuedItem.chaosValue)}
                <span className="item-tooltip-text"><a className="item-link" target="_blank" href={`https://www.poewiki.net/w/index.php?search=${valuedItem.name}`}>{valuedItem.name}</a></span>
            </span>
        </div>
    );
}

interface ExpeditionRowProps {
    valuedBaseType: ValuedBaseType
    itemSearch: string
    showLowValueUniques: boolean
    selectedItems: ValuedItem[]
    setSelectedItems: Dispatch<SetStateAction<ValuedItem[]>>
}

export const ExpeditionRow = (props: ExpeditionRowProps) => {
    const {valuedBaseType, itemSearch, showLowValueUniques, selectedItems, setSelectedItems} = props;
    const baseTypeMatch = itemSearch && valuedBaseType.baseType.toLowerCase().includes(itemSearch.toLowerCase());

    return (
        <div className="full-size expedition-row">
            <div className="expedition-basetype-cell">
                {valuedBaseType.baseType}
            </div>
            <div>
                <ItemDisplay selectedItems={selectedItems} setSelectedItems={setSelectedItems} valuedItem={valuedBaseType.mostValuedItem}/>
            </div>
            <div>
                {valuedBaseType.otherItems
                    .filter((e) => {
                        if (showLowValueUniques) return true;
                        if (itemSearch && itemSearch.length > 2 && baseTypeMatch) return true;
                        const matchName = e.name.toLowerCase().includes(itemSearch.toLowerCase());
                        if (itemSearch && itemSearch.length > 2 && matchName) return true;
                        return showLowValueUniques || e.chaosValue > 100;
                    }).map((v) => <ItemDisplay selectedItems={selectedItems} setSelectedItems={setSelectedItems} key={v.name} valuedItem={v}/>)}
            </div>
        </div>
    );
};

export default ExpeditionRow;
