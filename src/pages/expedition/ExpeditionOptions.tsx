import {Checkbox} from "../vendor/Vendor";
import {Dispatch, SetStateAction} from "react";
import './ExpeditionOptions.css';

interface ExpeditionOptionProps {
    expensiveUniques: boolean,
    setExpensiveUniques: Dispatch<SetStateAction<boolean>>
}

const ExpeditionOptions = (props: ExpeditionOptionProps) => {
    const { expensiveUniques, setExpensiveUniques } = props;
    return (
        <div className="row">
            <div className="expedition-col-40"><h2>Will match the following items:</h2></div>
            <div className="expedition-col-40">
                <Checkbox label="Automatically add most expensive uniques" value={expensiveUniques}
                          onChange={setExpensiveUniques}/>
            </div>
            <div className="expedition-col-20">
                <select name="league" id="league-select">
                    <option value="league">Sanctum</option>
                    <option value="league hardcore">Sanctum Hardcore</option>
                    <option value="standard">Standard</option>
                    <option value="standard hardcore">Standard Hardcore</option>
                </select>
            </div>
        </div>
    );
}

export default ExpeditionOptions;