import {Dispatch, SetStateAction} from "react";
import "./SelectableSearch.css";

export interface SelectableSearchProps {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  placeholder?: string
}

const SelectableSearch = (props: SelectableSearchProps) => {
  const {search, setSearch, placeholder} = props;
  const placeholderText = placeholder ?? "Search for a modifier  (tip: paste regex here)";
  return (
    <div className="selectable-search-layout">
      <input
        className="selectable-search-input"
        value={search}
        type="search"
        placeholder={placeholderText}
        onChange={(v) => setSearch(v.target.value)}
      />
    </div>
  )
}

export default SelectableSearch;