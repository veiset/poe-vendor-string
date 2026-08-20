import {Checkbox} from "@shared/components/Checkbox/Checkbox";
import {Dispatch, SetStateAction} from "react";

interface ExpeditionOptionProps {
    expensiveUniques: boolean
    lastUpdate: string
    minAddValue: number
    setExpensiveUniques: Dispatch<SetStateAction<boolean>>
    setMinAddValue: Dispatch<SetStateAction<number>>
}

const ExpeditionOptions = (props: ExpeditionOptionProps) => {
    const { expensiveUniques, setExpensiveUniques, setMinAddValue, lastUpdate, minAddValue } = props;
    return (
        <div className="row">
            <div className="expedition-col-40">
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
