import React, {useEffect, useState} from "react";
import "./GroupedTokenList.css";
import SelectableSearch from "../SelectableTokenList/SelectableSearch";

export interface GroupedTokens {
  groupName: string
  tokens: string[]
}

export interface GroupedTokenListProps {
  groups: GroupedTokens[]
  selected: string[]
  setSelected: (key: string) => void
}

const GroupedTokenList = (props: GroupedTokenListProps) => {
  const {groups, selected, setSelected} = props;
  const [grouping, setGrouping] = useState(groups);
  const [search, setSearch] = useState("");
  const [displayedMods, setDisplayedMods] = useState<GroupedTokens[]>(grouping);
  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => {
    setGrouping(groups);
  }, [groups]);

  useEffect(() => {
    const searchResult = grouping.map((e) => {
      if (!search || search.length === 0) return e;
      return {
        groupName: e.groupName,
        tokens: e.tokens.filter((e) => e.toLowerCase().includes(search.toLowerCase()))
      }
    }).filter((e) => e.tokens.length > 0);
    setDisplayedMods(searchResult);
  }, [search, grouping]);

  function isExpanded(group: string): boolean {
    return expanded.includes(group);
  }

  function toggleExpanded(group: string) {
    if (expanded.includes(group)) {
      setExpanded(expanded.filter((e) => e !== group))
    } else {
      setExpanded(expanded.concat(group));
    }
  }

  function hasSelected(group: GroupedTokens): boolean {
    const tokens = group.tokens.map((e) => e);
    return tokens.some((e) => selected.some((f) => f === e))
  }

  return (
    <div>
      <SelectableSearch
        search={search}
        setSearch={setSearch}
        placeholder="Search for a modifier"
        style={"selectable-search-max-width"}
      />
      <div className="grouped-token-list">
        {displayedMods.map((group) => {
          const anyTokenSelected = hasSelected(group);
          const headerClassNames = "grouped-token-list-header " + (anyTokenSelected ? "selected" : "unselected");
          return (
            <div key={group.groupName} className="grouped-token-list-group">
              <div className={headerClassNames}
                   onClick={() => {
                     toggleExpanded(group.groupName)
                   }}
              >
                {group.groupName.replaceAll("|", " ")}
              </div>
              {isExpanded(group.groupName) &&
                  <div className="grouped-token-list-items">
                    {group.tokens.map((token) => {
                      const isSelected = selected.some((f) => f === token);
                      const tokenClassName = "grouped-token-list-item " + (isSelected ? "selected" : "unselected");
                      return (
                        <div
                          className={tokenClassName}
                          key={token}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelected(token);
                          }}
                        >
                         {token.replaceAll("|", " ")}
                        </div>)
                    })}
                  </div>
              }
            </div>)
        })}
      </div>
    </div>
  );
}


export default GroupedTokenList;