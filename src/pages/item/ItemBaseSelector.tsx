import Dropdown from "../../components/dropdown/Dropdown";
import React, {useEffect, useState} from "react";
import {ReactSearchAutocomplete} from 'react-search-autocomplete';
import "./ItemBaseSelector.css";
import {basetypes} from "../../generated/GeneratedItemBases";

type Rarity = "Magic" | "Rare";

export interface Itembase {
  baseType: string,
  item: string,
  rarity: Rarity,
}

interface ItemBaseSelectorProps {
  setItemBase: (itemBase: Itembase) => void
  itemBase: Itembase | undefined
}

const ItemBaseSelector = (props: ItemBaseSelectorProps) => {
  const {setItemBase, itemBase} = props;
  const search = basetypes.flatMap((base) =>
    base.items.map((item) => `${base.name} - ${item}`)
  ).map((e, index) => ({
    id: index,
    name: e
  }));

  const rarity: Rarity[] = ["Magic", "Rare"];
  const [selectedRarity, setSelectedRarity] = useState(itemBase?.rarity ?? "Rare");

  useEffect(() => {
    if (itemBase) {
      setItemBase({...itemBase, rarity: selectedRarity})
    }
  }, [selectedRarity]);

  return (<>
    <div className="full-size generic-top-element">
      <h2>Select item base</h2>
      <div id="search" className="item-search">
        <ReactSearchAutocomplete
          items={search}
          styling={{
            borderRadius: "4px",
            height: "38px",
            searchIconMargin: "0 0 0 10px",
            backgroundColor: "#444e5b",
            border: "1px solid #000000",
            color: "#fff",
            placeholderColor: "#afaeae",
            iconColor: "#fff",
            hoverBackgroundColor: "#283242",
          }}
          inputDebounce={100}
          placeholder="Search for item"
          onSelect={(selected) => {
            const s = selected.name.split(" - ");
            setItemBase({
              baseType: s[0],
              item: s[1],
              rarity: selectedRarity,
            })
          }}
        />
      </div>
      <h2>Item rarity</h2>
      <Dropdown
        elements={rarity}
        selected={selectedRarity}
        setSelected={(selected) => {
          setSelectedRarity(selected as Rarity);
        }}
        style={"dropdown-sm"}
      />
    </div>
  </>)
}

export default ItemBaseSelector