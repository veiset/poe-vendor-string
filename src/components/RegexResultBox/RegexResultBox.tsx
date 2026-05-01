import "./RegexResultBox.css";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Checkbox} from "../../pages/vendor/Vendor";
import {BugReport} from "../bugreport/BugReport";
import {generatePriceNoteRegex} from "../../utils/regex/PriceNoteRegex";

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
  enableBug?: boolean
  onTradeSearch?: () => void
  tradeSearchLoading?: boolean
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
    maxLength,
    enableBug,
    onTradeSearch,
    tradeSearchLoading,
  } = props;

  const maxLen = maxLength ?? 250;
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = React.useState<string | undefined>(undefined);
  const [autoCopy, setAutoCopy] = React.useState(false);
  const [priceFilterEnabled, setPriceFilterEnabled] = useState(false);
  const [priceFilterCurrency, setPriceFilterCurrency] = useState("");
  const [priceFilterMax, setPriceFilterMax] = useState("");
  const bugButton = enableBug ?? false;

  const customTextTerm = (customText.length > 0 && enableCustomText) ? customText : "";
  const priceFilterPreview = generatePriceNoteRegex({
    enabled: true,
    currency: priceFilterCurrency,
    max: priceFilterMax,
  });
  const priceFilterTerm = priceFilterEnabled ? priceFilterPreview : "";

  const compose = (noteTerm: string) =>
    [result, customTextTerm, noteTerm].filter((e) => e.length > 0).join(" ");

  const finalResult = compose(priceFilterTerm);
  const projectedLength = !priceFilterEnabled && priceFilterPreview.length > 0
    ? compose(priceFilterPreview).length
    : null;
  const priceMaxInvalid = priceFilterMax.trim().length > 0 && priceFilterPreview.length === 0;

  useEffect(() => {
    if (autoCopy) {
      navigator.clipboard.writeText(finalResult);
      setCopied(finalResult);
    }
  }, [finalResult, autoCopy]);

  return (
    <div className="rrb-layout">
      <div className="rrb-result">
        <div data-testid="rrb-result-text"
             className={finalResult === copied ? "rrb-result-text copied-good" : "rrb-result-text"}>
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
        {onTradeSearch && (
          <button
            className="rrb-trade-button"
            onClick={onTradeSearch}
            disabled={tradeSearchLoading}
          >
            {tradeSearchLoading ? "Loading..." : "Trade"}
          </button>
        )}
        <button className="rrb-option-button" onClick={() => {
          setShowOptions(!showOptions)
        }}>
          Options
        </button>
        {bugButton && <button className="rrb-bug">
            <BugReport regex={result} />
        </button> }
      </div>
      {showOptions && <div className="rrb-options">
          <Checkbox label={"Enable custom text"} value={enableCustomText} onChange={setEnableCustomText}/>
          <div className="rrb-options-custom-text">
              <input type="text" value={customText} onChange={(e) => setCustomText(e.target.value)}/>
          </div>
          <Checkbox label={"Auto copy result text"} value={autoCopy} onChange={setAutoCopy}/>
          <div className="rrb-break"/>
          <Checkbox label={"Enable max price"} value={priceFilterEnabled} onChange={setPriceFilterEnabled}/>
          <input data-testid="rrb-options-price-max"
                 className="rrb-options-price-max" type="text" inputMode="numeric"
                 placeholder="100" value={priceFilterMax}
                 onChange={(e) => setPriceFilterMax(e.target.value)}/>
          <label className="rrb-options-price-label">
              <span>Currency</span>
              <input className="rrb-options-price-currency" type="text"
                     placeholder="chaos" value={priceFilterCurrency}
                     onChange={(e) => setPriceFilterCurrency(e.target.value)}/>
          </label>
          <div className="rrb-break"/>
          {projectedLength !== null &&
              <div className="rrb-options-projected-length">
                  Projected length if enabled: {projectedLength} / {maxLen}
              </div>
          }
          {priceMaxInvalid &&
              <div className="rrb-options-price-warning">
                  Max value is invalid or out of range (0..999)
              </div>
          }
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
