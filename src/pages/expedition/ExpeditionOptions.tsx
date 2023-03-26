import {Checkbox} from "../vendor/Vendor";
import {Dispatch, SetStateAction} from "react";
import {leagueName} from "./Expedition";

interface ExpeditionOptionProps {
    expensiveUniques: boolean
    league: string
    lastUpdate: string
    minAddValue: number
    setLeague: Dispatch<SetStateAction<string>>
    setExpensiveUniques: Dispatch<SetStateAction<boolean>>
    setMinAddValue: Dispatch<SetStateAction<number>>
}

const ExpeditionOptions = (props: ExpeditionOptionProps) => {
    const { expensiveUniques, setExpensiveUniques, setMinAddValue, league, lastUpdate, setLeague, minAddValue } = props;
    const leagues = [leagueName, "Hardcore " + leagueName, "Standard", "Hardcore"];
    const hasCurrentLeague = leagues.some((l) => l === league);
    return (
        <div className="row">
            <div className="expedition-col-40">
                <span className="select-league-info">League:</span>
                <select name="league" className="select-league" value={league} id="league-select" onChange={(e) => setLeague(e.target.value)}>
                    {!hasCurrentLeague && <option className={"option-league"} value={league}>{league}</option>}
                    <option className="option-league" value={leagueName}>{leagueName}</option>
                    <option className="option-league" value={"Hardcore " + leagueName}>Hardcore {leagueName}</option>
                    <option className="option-league" value="Standard">Standard</option>
                    <option className="option-league" value="Hardcore">Hardcore</option>
                </select>
                <p className="economy-info">{lastUpdate}</p>
            </div>
            <div className="expedition-col-60 expedition-options-row">
                <Checkbox className="auto-add-items" label="Automatically add most expensive uniques," value={expensiveUniques}
                          onChange={setExpensiveUniques}/>
                <div>
                    <span className="expedition-option-text">with min value</span>
                    <input type="search" className="modifier-quantity-box" id="pack-size" name="search-mod" value={minAddValue}
                           onChange={v => setMinAddValue(v.target.value as unknown as number)}/>

                </div>
            </div>
        </div>
    );
}

export default ExpeditionOptions;