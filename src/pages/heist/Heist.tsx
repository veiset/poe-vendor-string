import ResultBox from "../../components/ResultBox";
import Header from "../../components/Header";
import {HeistContractType, heistContractTypes, heistTargetValues} from "../../generated/GeneratedHeist";
import {useEffect, useState} from "react";
import './Heist.css';
import HeistContractSelect, {changeVal} from "./HeistContractSelect";
import {Checkbox} from "../vendor/Vendor";
import {addExpression} from "../../utils/OutputString";

export interface ContractLevel {
    start: number
    end: number
    type: HeistContractType
}

const generateContractResultStr = (contractLevels: ContractLevel[]): string => {
    const selected = contractLevels.filter((v) => {
        return v.start > 0 || v.end > 0;
    });
    return selected.map((v) => {
        const level = levelRegex(v.start, v.end)
        return v.type.matchSafe + level;
    }).join("|");
}

const targetValueRegex = (value: number): string => {
    if (value === 0) {
        return "";
    } else {
        return "t:.*(" + Object.values(heistTargetValues)
            .filter((v) => v.coinValue > value)
            .map((v) => v.matchSafe)
            .join("|") + ")";
    }
}

const levelRegex = (start: number, end: number): string => {
    if (end === 0) {
        end = 5;
    }
    if (start === 0) {
        start = 1;
    }
    if (start <= 1 && end >= 5) {
        return "";
    }
    const prefix = ".*";
    if (start === end) {
        return `${prefix}${start}`;
    } else if (end === 0) {
        return `${prefix}${start}`;
    } else if (start === 0) {
        return `${prefix}${end}`;
    } else if (end - start === 1) {
        return `${prefix}[${start}${end}]`;
    } else {
        return `${prefix}[${start}-${end}]`;
    }
}

const generateHeistStr = (contractLevels: ContractLevel[], targetValue: number, requireCoinValue: boolean): string => {
    if (requireCoinValue) {
        return (generateContractResultStr(contractLevels) + " " + targetValueRegex(targetValue)).trim();
    } else {
        return addExpression(generateContractResultStr(contractLevels), targetValueRegex(targetValue));
    }
}

const Heist = () => {
    const contractTypes = Object.keys(heistContractTypes).map((key) => heistContractTypes[key]);
    const [result, setResult] = useState("");
    const [contractLevels, setContractLevels] = useState<ContractLevel[]>(contractTypes.map((type) => ({
        start: 0,
        end: 0,
        type: type,
    })));
    const [targetValue, setTargetValue] = useState<number>(0);
    const [requireCoinValue, setRequireCoinValue] = useState(false);

    useEffect(() => {
        setResult(generateHeistStr(contractLevels, targetValue, requireCoinValue));
    }, [contractLevels, targetValue, requireCoinValue]);


    return (
        <>
            <Header text={"Heist"}/>
            <ResultBox result={result} warning={undefined} reset={() => {
                setContractLevels(contractTypes.map((type) => ({
                    start: 0,
                    end: 0,
                    type,
                })));
                setTargetValue(0);
            }}/>
            <h2 className="row">Presets</h2>
            <div className="row">
                <button className="heist-action-button" onClick={() => {
                    const gienna = changeVal(changeVal(changeVal(contractLevels, {
                        ...contractLevels.find((e) => e.type.name === "Deception")!!,
                        start: 1,
                        end: 5,
                    }), {
                        ...contractLevels.find((e) => e.type.name === "Perception")!!,
                        start: 1,
                        end: 2,
                    }), {
                        ...contractLevels.find((e) => e.type.name === "Counter-Thaumaturgy")!!,
                        start: 1,
                        end: 3,
                    });
                    setContractLevels(gienna);
                }}>Gianna
                </button>
                <button className="heist-action-button" onClick={() => {
                    const giennaPlus1 = changeVal(changeVal(changeVal(contractLevels, {
                        ...contractLevels.find((e) => e.type.name === "Deception")!!,
                        start: 1,
                        end: 6,
                    }), {
                        ...contractLevels.find((e) => e.type.name === "Perception")!!,
                        start: 1,
                        end: 3,
                    }), {
                        ...contractLevels.find((e) => e.type.name === "Counter-Thaumaturgy")!!,
                        start: 1,
                        end: 4,
                    });
                    setContractLevels(giennaPlus1);
                }}>Gianna (+1 job items)
                </button>
            </div>
            <h2 className="row">Minimum target coin value</h2>
            <div className="row">
                <Checkbox label="Require that both coin value AND contract level matches" value={requireCoinValue}
                          onChange={setRequireCoinValue}/>
            </div>
            <div className="row">
                <input type="number" className="numberinput-large-input heist-value-input" value={targetValue} onChange={(e) => {
                    setTargetValue(Number(e.target.value));
                }}/>
                <button className="heist-action-button" onClick={() => setTargetValue(3000)}>High value targets</button>
                <button className="heist-action-button" onClick={() => setTargetValue(0)}>Reset</button>
            </div>
            <h2 className="row">Contract types</h2>
            <div className="row heist-input-container">
                {contractLevels.map((t) => {
                    return (<div key={t.type.name}>
                        <HeistContractSelect label={t.type.name} contract={t} contracts={contractLevels} onChange={setContractLevels}/>
                    </div>);
                })}
            </div>
        </>);
}

export default Heist;


