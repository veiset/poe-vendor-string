import React from "react";

export interface ExactOptimizedToggleProps {
  name: string;
  optimized: boolean;
  setOptimized: (value: boolean) => void;
}

const ExactOptimizedToggle = ({name, optimized, setOptimized}: ExactOptimizedToggleProps) => (
  <div className="radio-button-modgroup radio-button-modgroup-sm">
    <input type="radio" id={`${name}-exact`} name={name} value="exact"
           checked={!optimized}
           onChange={() => setOptimized(false)}/>
    <label htmlFor={`${name}-exact`} className="radio-button-map">Exact</label>
    <input type="radio" id={`${name}-optimized`} name={name} value="optimized"
           checked={optimized}
           onChange={() => setOptimized(true)}/>
    <label htmlFor={`${name}-optimized`} className="radio-button-map">Optimized</label>
  </div>
);

export default ExactOptimizedToggle;
