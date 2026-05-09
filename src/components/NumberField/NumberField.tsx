import React from "react";
import {TradeAsterisk} from "../TradeAsterisk";
import "./NumberField.css";

export interface NumberFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  trade?: boolean;
  primary?: boolean;
}

const NumberField = ({id, label, value, onChange, trade, primary}: NumberFieldProps) => (
  <div className="nf-field">
    <label htmlFor={id} className={`nf-field-label${primary ? " nf-field-label-primary" : ""}`}>
      {label}
      {trade && <TradeAsterisk/>}
    </label>
    <input
      type="search"
      className="nf-field-input"
      id={id}
      name={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default NumberField;
