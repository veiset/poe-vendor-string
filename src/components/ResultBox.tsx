import React, {Dispatch, SetStateAction, useEffect} from "react";
import "./ResultBox.css";

export interface ResultBoxProps {
    result: string
    warning?: string
    error?: string
    reset: () => any
}

const maxLength = 50;

const ResultBox = (props: ResultBoxProps) => {
    const {result, warning, error, reset} = props;

    const [copied, setCopied] = React.useState<string | undefined>(undefined);
    const [autoCopy, setAutoCopy] = React.useState(false);

    useEffect(() => {
        if (autoCopy && !error && result.length < maxLength) {
            navigator.clipboard.writeText(result);
            setCopied(result);
        }
    }, [result, autoCopy, error]);

    return (
        <div className="row result-box">
            <div className={result.length > maxLength ? "result" : result === copied ? "result copied-good" : "result"}>
                {result}
                {result.length > maxLength && <div className="error">Error: more than 50 characters, cannot be used in the PoE client</div>}
                {!error && result.length <= maxLength && result.length > 0 && <div className="size-info">length: {result.length} / 50</div>}
                {error && <div className="error">Error: {error}</div>}
                {warning && <div className="warning">{warning}</div>}
            </div>
            <div className="col-align-right">
                <div className="result-action">
                    <div className="row">
                        <button className="copy-button" onClick={() => {
                            setCopied(result);
                            navigator.clipboard.writeText(result);
                        }}>
                            Copy
                        </button>
                        <button className="reset-button" onClick={() => {
                            reset()
                        }}>
                            Reset
                        </button>
                    </div>
                    <div className="row">
                        <AutoCopyCheckbox value={autoCopy} onChange={setAutoCopy}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface AutoCopyCheckboxProps {
    value: boolean
    onChange: Dispatch<SetStateAction<boolean>>
}

const AutoCopyCheckbox = (props: AutoCopyCheckboxProps) => {
    return (
        <label className="auto-copy">
            <input type="checkbox" className="checkbox-autocopy" checked={props.value} onChange={e => props.onChange(e.target.checked)}/>
            <span className="auto-copy-text">Auto-copy</span>
        </label>
    )
}

export default ResultBox;
