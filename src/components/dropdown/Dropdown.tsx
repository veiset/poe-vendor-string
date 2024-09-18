import "./Dropdown.css";

interface DropdownProps {
  elements: string[]
  selected: string
  setSelected: (ele: string) => void;
}
const Dropdown = (props: DropdownProps) => {
  const {elements, selected, setSelected} = props;

  return (
    <select className="dropdown-select" name="cars" id="cars" onChange={v => {
      setSelected(v.target.value);
    }}>
      {elements.map((ele) => {
        return (<option value={ele} selected={ele === selected}>{ele}</option>)
      })}
    </select>
  )
}

export default Dropdown;