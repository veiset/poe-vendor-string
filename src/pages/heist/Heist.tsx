import ResultBox from "../../components/ResultBox";
import Header from "../../components/Header";
import {HeistContractType, heistContractTypes, heistTargetValues} from "../../generated/GeneratedHeist";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

interface ContractLevel {
    start: number
    end: number
    type: HeistContractType
}

const generateResultStr = (contractLevels: ContractLevel[]): string => {
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
        return "|t:.*(" + Object.values(heistTargetValues)
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
    } else if (end-start == 1) {
        return `${prefix}[${start}${end}]`;
    } else {
        return `${prefix}[${start}-${end}]`;
    }
}


const Heist = () => {
    const contractTypes = Object.keys(heistContractTypes).map((key) => heistContractTypes[key]);
    const [contractLevels, setContractLevels] = useState<ContractLevel[]>(contractTypes.map((type) => ({
      start: 0,
      end: 0,
      type: type,
    })));
    let [targetValue, setTargetValue] = useState<number>(0);
    let [result, setResult] = useState("");

    useEffect(() => {
        setResult(generateResultStr(contractLevels) + targetValueRegex(targetValue));
    }, [contractLevels, targetValue]);


    return (
        <div className="wrapper">
            <p className="error">
                Warning: Very proof of concept. Not ready for use!
            </p>
            <div className="container-maps">
                <Header text={"Heist"}/>
                <ResultBox result={result} warning={undefined} reset={() => {
                    setContractLevels(contractTypes.map((type) => ({
                        start: 0,
                        end: 0,
                        type,
                    })));
                    setTargetValue(0);
                }}/>
            </div>
            <div><button onClick={() => {
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
            }}>use gianna preset</button></div>
            <div><button onClick={() => {
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
            }}>use gianna preset (+1 job items)</button></div>
            <div><button onClick={() => setTargetValue(3000)}>High value targets</button></div>
            <div>
                Min value of target: <input type="number" className="numberinput-large-input" value={targetValue} onChange={(e) => {
                    setTargetValue(Number(e.target.value));
            }} />
            </div>
            <div className="wrapper">
                <div className="container">
                {contractLevels.map((t) => {
                    return (<div key={t.type.name}>
                        <LevelInput label={t.type.name} contract={t} contracts={contractLevels} onChange={setContractLevels} />
                    </div>);
                })}
                    </div>
            </div>
        </div>);
}

export default Heist;

interface LevelInputProps {
    label: string
    contract: ContractLevel
    contracts: ContractLevel[]
    onChange: Dispatch<SetStateAction<ContractLevel[]>>
    className?: string
}

const changeVal = (contracts: ContractLevel[], conctract: ContractLevel): ContractLevel[] => {
    return contracts.map((v) => {
        if (v.type === conctract.type) {
            return conctract;
        } else {
            return v;
        }
    })

}

export const LevelInput = (props: LevelInputProps) => {
    const startValue = props.contract.start === 0 ? "" : props.contract.start;
    const endValue = props.contract.end === 0 ? "" : props.contract.end;
    return (
        <div className="item">
            <div className="item-half-size">
                <label className="numberinput">
                <span>{props.label}</span>
                </label>
            </div>
            <div className="item-half-size">
                <input className="numberinput-input" type="number" min="0" max="6" value={startValue} onChange={e => {
                    props.onChange(changeVal(props.contracts, {
                        ...props.contract,
                        start: Number(e.target.value),
                    }));
                }}/>
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

