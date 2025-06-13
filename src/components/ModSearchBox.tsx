import React, {Dispatch, SetStateAction} from "react";

export interface ModSearchBoxProps {
    id: string
    search: string
    placeholder?: string
    setSearch: Dispatch<SetStateAction<string>>
}

const ModSearchBox = (props: ModSearchBoxProps) => {
    const {id, search, setSearch, placeholder} = props;
    const placeholderText = placeholder ?? "Search for a modifier...";
    return (
        <div className="map-search-bar">
            <input
                type="search"
                value={search}
                className="modifier-search-box"
                id={id}
                placeholder={placeholderText}
                name="search-mod"
                onChange={(v) => setSearch(v.target.value)}/>
        </div>
    )
}

export default ModSearchBox;