import React from "react";
import "./IncludeExcludeToggle.css";

export interface IncludeExcludeToggleProps {
  name: string;
  include: boolean;
  setInclude: (value: boolean) => void;
  includeLabel?: string;
  excludeLabel?: string;
}

const IncludeExcludeToggle = (props: IncludeExcludeToggleProps) => {
  const {name, include, setInclude, includeLabel = "Include", excludeLabel = "Exclude"} = props;
  const includeId = `${name}-include`;
  const excludeId = `${name}-exclude`;
  return (
    <div className="iet-group" role="radiogroup">
      <label className={`iet-option ${include ? "iet-active iet-include" : ""}`} htmlFor={includeId}>
        <input
          type="radio"
          id={includeId}
          name={name}
          checked={include}
          onChange={() => setInclude(true)}
        />
        <span>{includeLabel}</span>
      </label>
      <label className={`iet-option ${!include ? "iet-active iet-exclude" : ""}`} htmlFor={excludeId}>
        <input
          type="radio"
          id={excludeId}
          name={name}
          checked={!include}
          onChange={() => setInclude(false)}
        />
        <span>{excludeLabel}</span>
      </label>
    </div>
  );
};

export default IncludeExcludeToggle;
