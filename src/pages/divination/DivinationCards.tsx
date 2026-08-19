import Header from "../../components/Header";
import ResultBox from "../../components/ResultBox";
import React, {useContext, useEffect, useState} from "react";
import {ProfileContext} from "../../components/profile/ProfileContext";
import {loadSettings, saveSettings} from "../../utils/LocalStorage";
import {defaultSettings, DivinationSettings, leagueName} from "../../utils/SavedSettings";
import {dateTextFromString} from "../expedition/ExpeditionUtils";
import FilterCard from "../../components/FilterCard/FilterCard";
import {DivinationCardRegex, maxDivinationRegexLength, selectDivinationPriceRegex} from "./DivinationOutput";
import {divinationCards} from "../../generated/GeneratedDivinationCards";
import "./Divination.css";

interface PoeNinjaDivinationLine { id: string; primaryValue: number; }
interface PoeNinjaDivinationItem { id: string; name: string; }
interface PoeNinjaDivinationData { lines: PoeNinjaDivinationLine[]; items: PoeNinjaDivinationItem[]; }

const sortByChaosValue = (first: DivinationCardRegex, second: DivinationCardRegex) => second.chaosValue - first.chaosValue;

const DivinationCards = () => {
  const {globalProfile} = useContext(ProfileContext);
  const profile = loadSettings(globalProfile);
  const [minPrice, setMinPrice] = useState(profile.divination.minPrice);
  const [maxPrice, setMaxPrice] = useState(profile.divination.maxPrice);
  const [cards, setCards] = useState<DivinationCardRegex[]>([]);
  const [generatedRegexes, setGeneratedRegexes] = useState<string[]>([]);
  const [warning, setWarning] = useState<string | undefined>(undefined);
  const [result, setResult] = useState("");
  const [lastUpdated, setLastUpdated] = useState("Outdated prices. Check back in a few mins...");

  useEffect(() => {
    fetch("generated.txt", {headers: {"Content-Type": "application/text"}})
      .then((response) => response.text())
      .then((date) => setLastUpdated(dateTextFromString(date)));

    fetch("divination/divination_poe_ninja.json")
      .then((response) => response.json() as Promise<PoeNinjaDivinationData>)
      .then((data) => {
        const idToPrice = new Map(data.lines.map((line) => [line.id, line.primaryValue]));
        setCards(data.items.flatMap((item) => {
          const card = divinationCards[item.name];
          if (!card) return [];
          return [{
            name: card.name,
            regex: card.regex,
            chaosValue: Math.ceil(idToPrice.get(item.id) ?? 0),
          }];
        }).sort(sortByChaosValue));
      });
  }, []);

  useEffect(() => {
    const settings: DivinationSettings = {minPrice, maxPrice};
    saveSettings({...profile, divination: settings});
  }, [minPrice, maxPrice]);

  const generate = () => {
    const min = minPrice === "" ? undefined : Number(minPrice);
    const max = maxPrice === "" ? undefined : Number(maxPrice);
    const generated = selectDivinationPriceRegex(cards, min, max);
    setGeneratedRegexes(generated.included.map((card) => card.regex));
    setWarning(generated.included.length < generated.eligibleCount
      ? `${generated.included.length} of ${generated.eligibleCount} eligible cards fit the ${maxDivinationRegexLength}-character limit. Narrow the price range to include different cards.`
      : undefined);
    setResult(generated.regex);
  };

  return <>
    <Header text="Divination Card"/>
    <ResultBox result={result} warning={warning} maxLength={maxDivinationRegexLength} reset={() => {
      setMinPrice(defaultSettings.divination.minPrice);
      setMaxPrice(defaultSettings.divination.maxPrice);
      setResult("");
      setGeneratedRegexes([]);
      setWarning(undefined);
    }}/>
    <p className="divination-price-info">Using price data from the {leagueName} League. Last updated: {lastUpdated}</p>
    <div className="filter-card-grid">
      <FilterCard title="Generate regex">
        <div className="divination-options-row">
          <div className="divination-field">
            <label htmlFor="divination-min-price">Min chaos</label>
            <input id="divination-min-price" className="divination-field-input" type="number" min="0" value={minPrice}
                   onChange={(event) => setMinPrice(event.target.value)}/>
          </div>
          <div className="divination-field">
            <label htmlFor="divination-max-price">Max chaos</label>
            <input id="divination-max-price" className="divination-field-input" type="number" min="0" value={maxPrice}
                   onChange={(event) => setMaxPrice(event.target.value)}/>
          </div>
          <button className="divination-action-button" onClick={generate}>Generate regex</button>
        </div>
      </FilterCard>
    </div>
    <div className="divination-card">
      <div className="divination-card-header">Divination Cards</div>
      <div className="divination-list divination-list-header"><span>Name</span><span>Regex</span><span>Chaos</span></div>
      {cards.map((card) => <div className={generatedRegexes.includes(card.regex) ? "divination-list divination-list-selected" : "divination-list"} key={card.name}>
        <span>{card.name}</span><code>{card.regex}</code><span>{card.chaosValue}</span>
      </div>)}
    </div>
  </>;
};

export default DivinationCards;
