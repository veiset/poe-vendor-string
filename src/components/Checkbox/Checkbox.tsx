import {Dispatch, ReactNode, SetStateAction} from "react";

interface CheckboxProps {
  label: ReactNode
  value: boolean
  onChange: Dispatch<SetStateAction<boolean>>
  className?: string
  disabled?: boolean
}

export const Checkbox = (props: CheckboxProps) => {
  return (
    <div className={props.className}>
      <label className={`checkbox checkbox-text${props.disabled ? " checkbox-disabled" : ""}`}>
        <input className="checkbox-input" type="checkbox" checked={props.value}
               disabled={props.disabled}
               onChange={e => props.onChange(e.target.checked)}/>
        <span>{props.label}</span>
      </label>
    </div>
  );
}