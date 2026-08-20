import Dropdown from "@shared/components/dropdown/Dropdown";
import {useOptionalPoe1League} from "@shared/core/LeagueContext";

const LeagueSelect = () => {
  const leagueContext = useOptionalPoe1League();
  if (!leagueContext) return null;

  const elements = leagueContext.loading
    ? ["Loading leagues…"]
    : leagueContext.leagues.length === 0
      ? ["No leagues available"]
      : leagueContext.leagues;

  const selected = leagueContext.loading
    ? ""
    : leagueContext.league || leagueContext.leagues[0] || "";

  return (
    <Dropdown
      elements={elements}
      selected={selected}
      setSelected={leagueContext.setLeague}
      style="dropdown-sm"
    />
  );
};

export default LeagueSelect;
