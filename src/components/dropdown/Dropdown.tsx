import "./Dropdown.css";

interface DropdownProps {
  elements: string[]
  selected: string
  setSelected: (ele: string) => void;
}
const Dropdown = (props: DropdownProps) => {
  const {elements, selected, setSelected} = props;

  return (
    <select className="dropdown-select" id="dropdown"
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