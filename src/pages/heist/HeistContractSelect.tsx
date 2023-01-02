import {Dispatch, SetStateAction} from "react";
import {ContractLevel} from "./Heist";

import agility from '../../img/heist/Agility.png';
import bruteForce from '../../img/heist/Brute Force.png';
import counterThaumaturgy from '../../img/heist/Counter-Thaumaturgy.png';
import deception from '../../img/heist/Deception.png';
import demolition from '../../img/heist/Demolition.png';
import engineering from '../../img/heist/Engineering.png';
import lockpicking from '../../img/heist/Lockpicking.png';
import perception from '../../img/heist/Perception.png';
import trapDisarmament from '../../img/heist/Trap Disarmament.png';

interface HeistContractSelectProps {
    label: string
    contract: ContractLevel
    contracts: ContractLevel[]
    onChange: Dispatch<SetStateAction<ContractLevel[]>>
    className?: string
}

export const HeistContractSelect = (props: HeistContractSelectProps) => {
    const startValue = props.contract.start === 0 ? "" : props.contract.start;
    const endValue = props.contract.end === 0 ? "" : props.contract.end;
    return (
        <div className="heist-level-input">
            <div className="item-half-size">
                <img className="heist-icon" src={heistImg(props.contract.type.name)} alt={props.contract.type.name}/>
                <label className="numberinput heist-contract-type" htmlFor={props.contract.type.name}>
                    <span>{props.label}</span>
                </label>
            </div>
            <div className="item-half-size heist-level-input-boxes" id={props.contract.type.name}>
                Min:
                <input className="numberinput-input" type="number" min="0" max="6" value={startValue} onChange={e => {
                    props.onChange(changeVal(props.contracts, {
                        ...props.contract,
                        start: Number(e.target.value),
                    }));
                }}/>
                Max:
                <input className="numberinput-input" type="number" min="0" max="6" value={endValue} onChange={e => {
                    props.onChange(changeVal(props.contracts, {
                        ...props.contract,
                        end: Number(e.target.value),
                    }));
                }}/>
            </div>
        </div>
    );
}

const heistImg = (type: string) => {
    switch (type) {
        case "Agility":
            return agility;
        case "Brute Force":
            return bruteForce;
        case "Counter-Thaumaturgy":
            return counterThaumaturgy;
        case "Deception":
            return deception;
        case "Demolition":
            return demolition;
        case "Engineering":
            return engineering;
        case "Lockpicking":
            return lockpicking;
        case "Perception":
            return perception;
        case "Trap Disarmament":
            return trapDisarmament;
    }
}

export default HeistContractSelect;

export const changeVal = (contracts: ContractLevel[], conctract: ContractLevel): ContractLevel[] => {
    return contracts.map((v) => {
        if (v.type === conctract.type) {
            return conctract;
        } else {
            return v;
        }
    })

}

