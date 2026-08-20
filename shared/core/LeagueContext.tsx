import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {challengeLeague, getLeagues} from "@shared/core/TradeUrlBuilder";
import {loadWebSettings, saveWebSettings} from "@shared/core/WebSettings";

interface LeagueContextValue {
  league: string;
  leagues: string[];
  loading: boolean;
  setLeague: (league: string) => void;
}

const LeagueContext = createContext<LeagueContextValue | undefined>(undefined);

export const LeagueProvider = ({children}: { children: ReactNode }) => {
  const [league, setLeague] = useState(() => loadWebSettings().poe1League);
  const [leagues, setLeagues] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const selectLeague = (nextLeague: string) => {
    setLeague(nextLeague);
    saveWebSettings({...loadWebSettings(), poe1League: nextLeague});
  };

  useEffect(() => {
    getLeagues("poe1")
      .then((availableLeagues) => {
        setLeagues(availableLeagues);
        const savedLeague = loadWebSettings().poe1League;
        const nextLeague = availableLeagues.includes(savedLeague)
          ? savedLeague
          : challengeLeague(availableLeagues);
        selectLeague(nextLeague);
      })
      .catch((error) => {
        console.error("Failed to fetch PoE1 leagues:", error);
        setLeagues([]);
        setLeague("");
      })
      .finally(() => setLoading(false));
  }, []);

  return <LeagueContext.Provider value={{league, leagues, loading, setLeague: selectLeague}}>{children}</LeagueContext.Provider>;
};

export function usePoe1League(): LeagueContextValue {
  const context = useContext(LeagueContext);
  if (!context) throw new Error("usePoe1League must be used within LeagueProvider");
  return context;
}

export function useOptionalPoe1League(): LeagueContextValue | undefined {
  return useContext(LeagueContext);
}
