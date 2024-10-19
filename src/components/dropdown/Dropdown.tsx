import "./Dropdown.css";

interface DropdownProps {
  elements: string[]
  selected: string
  setSelected: (ele: string) => void;
  style?: string | undefined
}
const Dropdown = (props: DropdownProps) => {
  const {elements, selected, setSelected, style} = props;

  const className = "dropdown-select " + style ?? "";
  return (
    <select className={className} id="dropdown"
            value={selected}
            onChange={v => {
      setSelected(v.target.value);
    }}>
      {elements.map((ele) => {
        return (<option key={ele} value={ele}>{ele}</option>)
      })}
    </select>
  )
}

export default Dropdown;