import "./SelectList.css";
import React, {Dispatch, SetStateAction, useState} from "react";

interface SelectLisProps<T> {
  items: T[]
  keyFn: (e: T) => string
  display: (e: T) => string
  selected: T[]
  setSelected: (e: T[]) => void
  id: string
}

const SelectList = <T, >(props: SelectLisProps<T>) => {
  const {items, keyFn, display, selected, setSelected, id} = props;
  const [search, setSearch] = useState("");

  const toggle = (e: T) => {
    if (selected.includes(e)) {
      setSelected(selected.filter((el) => el !== e))
    } else {
      setSelected(selected.concat(e))
    }
  }

  return (
    <div className="select-list">
      <div className="select-list-search">
        <SearchBox id={"search-list-" + id} search={search} setSearch={setSearch}/>
      </div>
      <div className="select-list-items">
        {items
          .filter((e) => search.length === 0 || display(e).toLowerCase().includes(search.toLowerCase())).map((item) => {
            const isSelected = selected.includes(item);
            return (
              <div key={keyFn(item)}
                   className={isSelected ? "select-list-item select-list-selected" : "select-list-item"}
                   onClick={() => {
                     toggle(item);
                   }}>
                {display(item)}
              </div>
            )
          })}
      </div>
    </div>
  )
}

interface ModSearchBoxProps {
  id: string
  search: string
  placeholder?: string
  setSearch: Dispatch<SetStateAction<string>>
}

const SearchBox = (props: ModSearchBoxProps) => {
  const {id, search, setSearch, placeholder} = props;
  const placeholderText = placeholder ?? "Search for a modifier...";
  return (
    <div className="select-list-search">
      <input
        type="search"
        value={search}
        className="select-list-search-box"
        id={id}
        placeholder={placeholderText}
        name={"search-list-name-" + id}
        onChange={(v) => setSearch(v.target.value)}/>
    </div>
  )
}

export default SelectList;