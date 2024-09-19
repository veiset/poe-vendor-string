import "./RegexResultBox.css";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Checkbox} from "../../pages/vendor/Vendor";

export interface RegexResultBoxProps {
  result: string
  reset: () => any
  customText: string
  setCustomText: Dispatch<SetStateAction<string>>
  enableCustomText: boolean
  setEnableCustomText: Dispatch<SetStateAction<boolean>>
  warning?: string
  error?: string
  maxLength?: number
}

const RegexResultBox = (props: RegexResultBoxProps) => {
  const {
    result,
    warning,
    error,
    reset,
    customText,
    setCustomText,
    enableCustomText,
    setEnableCustomText,
    maxLength
  } = props;

  const maxLen = maxLength ?? 50;
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = React.useState<string | undefined>(undefined);
  const [autoCopy, setAutoCopy] = React.useState(false);

  const finalResult = (customText.length > 0 && enableCustomText)
    ? `${result} ${customText}`
    : result;

  useEffect(() => {
    if (autoCopy) {
      navigator.clipboard.writeText(result);
      setCopied(result);
    }
  }, [result, autoCopy]);

  return (
    <div className="rrb-layout">
      <div className="rrb-result">
        <div className={finalResult === copied ? "rrb-result-text copied-good" : "rrb-result-text"}>
          {finalResult}
        </div>
        {error && <div className="error">Error: {error}</div>}
        {warning && <div className="warning">{warning}</div>}
        {finalResult.length > maxLen &&
            <div className="error">Error: {finalResult.length} / {maxLen} characters used - PoE client has a max limit
                of {maxLen} characters
            </div>
        }
        {finalResult.length <= maxLen &&
            <div className="rrb-result-info">
                length: {finalResult.length} / {maxLen}
            </div>
        }
      </div>
      <div className="rrb-actions">
        <button className="rrb-copy-button" onClick={() => {
          setCopied(finalResult);
          navigator.clipboard.writeText(finalResult);
        }}>
          Copy
        </button>
        <button className="rrb-reset-button" onClick={() => {
          reset();
        }}>
          Reset
        </button>
        <button className="rrb-option-button" onClick={() => {
          setShowOptions(!showOptions)
        }}>
          Options
        </button>
      </div>
      {showOptions && <div className="rrb-options">
          <Checkbox label={"Enable custom text"} value={enableCustomText} onChange={setEnableCustomText}/>
          <div className="rrb-options-custom-text">
              <input type="text" value={customText} onChange={(e) => setCustomText(e.target.value)}/>
          </div>
          <Checkbox label={"Auto copy result text"} value={autoCopy} onChange={setAutoCopy}/>
      </div>
      }
    </div>
  )

}

export interface AutoCopyCheckboxProps {
  value: boolean
  onChange: Dispatch<SetStateAction<boolean>>
}

export const AutoCopyCheckbox = (props: AutoCopyCheckboxProps) => {
  return (
    <label className="auto-copy">
      <input type="checkbox" className="checkbox-autocopy" checked={props.value}
             onChange={e => props.onChange(e.target.checked)}/>
      <span className="auto-copy-text">Auto-copy</span>
    </label>
  )
}

export default RegexResultBox;
