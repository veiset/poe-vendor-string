import React, {Dispatch, SetStateAction, useEffect} from "react";
import "./ResultBox.css";

export interface ResultBoxProps {
  result: string
  warning?: string
  error?: string
  reset: () => any
  maxLength?: number;
}


const ResultBox = (props: ResultBoxProps) => {
  const {result, warning, error, reset} = props;
  const maxLength = props.maxLength || 50;

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
        <span className="result-regex">{result}</span>
        {result.length > maxLength &&
            <div className="error">Error: {result.length} / 50 characters used - PoE client has a max limit of 50
                characters</div>}
        {!error && result.length <= maxLength && result.length > 0 &&
            <div className="size-info">length: {result.length} / {maxLength}</div>}
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
      <input type="checkbox" className="checkbox-autocopy" checked={props.value}
             onChange={e => props.onChange(e.target.checked)}/>
      <span className="auto-copy-text">Auto-copy</span>
    </label>
  )
}

export default ResultBox;
