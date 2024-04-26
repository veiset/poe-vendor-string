import React, {useContext, useEffect, useState} from "react";
import {ProfileContext} from "../../components/profile/ProfileContext";
import {loadSettings, saveSettings} from "../../utils/LocalStorage";
import Header from "../../components/Header";
import ResultBox from "../../components/ResultBox";
import "./Scarab.css";
import {Scarab, scarabs} from "../../generated/GeneratedScarabs";
import ScarabElement from "./ScarabElement";
import {dateTextFromString} from "../expedition/ExpeditionUtils";
import {leagueName} from "../expedition/Expedition";
import ModSearchBox from "../../components/ModSearchBox";
import {defaultSettings, ScarabSettings} from "../../utils/SavedSettings";
import {generateScarabRegex} from "./ScarabOutput";

export interface PoeNinjaScarab {
  name: string
  chaosValue: number
  listingCount: number
}

export interface PoeNinjaScarabData {
  lines: PoeNinjaScarab[]
}

const sortByChaosValue = (prices: Map<string, number>, e1: Scarab, e2: Scarab) => {
  const chaosValue1 = prices.get(e1.name) ?? 0;
  const chaosValue2 = prices.get(e2.name) ?? 0;
  return chaosValue2 - chaosValue1;
}

const Scarabs = () => {
  const {globalProfile} = useContext(ProfileContext);
  const profile = loadSettings(globalProfile);

  const scarabNames = Array.from(Object.keys(scarabs));
  const scarabList = scarabNames.map((s) => ({...scarabs[s]}));
  const [minPrice, setMinPrice] = useState(profile.scarab.minPrice);
  const [maxPrice, setMaxPrice] = useState(profile.scarab.maxPrice);
  const [lastUpdated, setLastUpdated] = useState("Outdated prices. Check back in a few mins...");
  const [priceLookup, setPriceLookup] = useState(new Map<string, number>());
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>(profile.scarab.selected.filter((e) => scarabNames.includes(e)));

  const [result, setResult] = useState("");

  useEffect(() => {
    fetch(`generated.txt`, {headers: {'Content-Type': 'application/text'}})
      .then((r) => r.text())
      .then((date) => {
        setLastUpdated(dateTextFromString(date));
      });

    const data = fetch(`scarab/scarab_poe_ninja.json`)
      .then((r) => r.json()) as Promise<PoeNinjaScarabData>

    data.then((d) => {
      setPriceLookup(new Map(d.lines.map((b) => [b.name, b.chaosValue])));
    })
  });

  useEffect(() => {
    const settings: ScarabSettings = {minPrice, maxPrice, selected,};
    saveSettings({...profile, scarab: {...settings}});
    setResult(generateScarabRegex(settings));
  }, [minPrice, maxPrice, selected]);


  return (
    <>
      <Header text={"Scarab"}/>
      <ResultBox
        result={result}
        warning={undefined}
        reset={() => {
          setSelected(defaultSettings.scarab.selected);
        }}
      />
      <div className="break"/>
      <p className="beast-price-info">Using price data from the {leagueName} League. Last updated: {lastUpdated}</p>
      <div className="full-size generic-top-element">
        <div className="scarab-options-row">
          <button className="scarab-action-button" onClick={() => {
            const itemsToAdd = scarabList
              .filter((scarab) => {
                const priceOfScarab = priceLookup.get(scarab.name);
                if (!priceOfScarab) return false;
                const withinMaxPrice = Number(maxPrice) >= priceOfScarab;
                const withinMinPrice = Number(minPrice) <= priceOfScarab;
                return withinMinPrice && withinMaxPrice;
              })
              .filter((scarab) => !selected.includes(scarab.name))
              .map((e) => e.name);
            setSelected(selected.concat(itemsToAdd));
          }}>
            Auto select cheap scarabs, with a value between:
          </button>
          <div>
            <input type="search" className="modifier-quantity-box" id="minprice" name="search-mod" value={minPrice}
                   onChange={v => setMinPrice(v.target.value)}/>
          </div>
          <div>
            <input type="search" className="modifier-quantity-box" id="maxPrice" name="search-mod" value={maxPrice}
                   onChange={v => setMaxPrice(v.target.value)}/>
          </div>
          <button className="scarab-action-button" onClick={() => {
            setMinPrice(defaultSettings.scarab.minPrice);
            setMaxPrice(defaultSettings.scarab.maxPrice);
          }}>Reset
          </button>
        </div>
      </div>
      <div className="half-size">
        <ModSearchBox id="scarab-search-box" search={search} setSearch={setSearch}
                      placeholder={"Search for a Scarab..."}/>
      </div>
      <div className="full-size scarab-list">
        {scarabList
          .filter((e) => search.length < 2 || e.name.toLowerCase().includes(search.toLowerCase()))
          .sort((e1, e2) => sortByChaosValue(priceLookup, e1, e2))
          .map((scarab) => {
            const isSelected = selected.includes(scarab.name);
            const price = priceLookup.get(scarab.name) ?? 0;
            return (
              <ScarabElement
                key={scarab.name}
                selected={selected}
                setSelected={setSelected}
                isSelected={isSelected}
                scarab={scarab}
                price={price}
              />)
          })}
      </div>
    </>
  );
}

export default Scarabs;