import React from "react";
import "./MatchAnyAllToggle.css";

export interface MatchAnyAllToggleProps {
  id: string;
  value: string;
  onChange: (value: "any" | "all") => void;
}

const MatchAnyAllToggle = ({id, value, onChange}: MatchAnyAllToggleProps) => (
  <div className="match-any-all-toggle">
    <span className="match-any-all-toggle-label">Match</span>
    <div className="radio-button-modgroup">
      <input type="radio" id={`${id}-any`} name={id} value="any"
             checked={value === "any"}
             onChange={() => onChange("any")}/>
      <label htmlFor={`${id}-any`} className="radio-button-map radio-first-ele">Any</label>
      <input type="radio" id={`${id}-all`} name={id} value="all"
             checked={value === "all"}
             onChange={() => onChange("all")}/>
      <label htmlFor={`${id}-all`} className="radio-button-map">All</label>
    </div>
  </div>
);

export default MatchAnyAllToggle;
