import {Checkbox} from "../vendor/Vendor";
import {Dispatch, SetStateAction} from "react";
import {leagueName} from "./Expedition";

interface ExpeditionOptionProps {
    expensiveUniques: boolean,
    league: string
    lastUpdate: string
    setLeague: Dispatch<SetStateAction<string>>
    setExpensiveUniques: Dispatch<SetStateAction<boolean>>
}

const ExpeditionOptions = (props: ExpeditionOptionProps) => {
    const { expensiveUniques, setExpensiveUniques, league, lastUpdate, setLeague } = props;
    return (
        <div className="row">
            <div className="expedition-col-40">
                <span className="select-league-info">League:</span>
                <select name="league" className="select-league" value={league} id="league-select" onChange={(e) => setLeague(e.target.value)}>
                    <option className="option-league" value={leagueName}>{leagueName}</option>
                    <option className="option-league" value={"Hardcore " + leagueName}>Hardcore {leagueName}</option>
                    <option className="option-league" value="Standard">Standard</option>
                    <option className="option-league" value="Hardcore">Hardcore</option>
                </select>
                <p className="economy-info">{lastUpdate}</p>
            </div>
            <div className="expedition-col-60">
                <Checkbox className="auto-add-items" label="Automatically add most expensive uniques" value={expensiveUniques}
                          onChange={setExpensiveUniques}/>
            </div>
        </div>
    );
}

export default ExpeditionOptions;