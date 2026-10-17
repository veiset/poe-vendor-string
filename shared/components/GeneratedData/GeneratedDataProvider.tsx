import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Spinner} from "@shared/components/Spinner/Spinner";
import {
  DataSource,
  dataSource,
  defaultDataSource,
  Game,
  GeneratedData,
  GeneratedDataError,
  loadGeneratedData,
  onGeneratedDataError,
  switchDataSource,
} from "@shared/generatedData";
import "./GeneratedData.css";

type State = {status: "loading"} | {status: "ready", data: GeneratedData} | {status: "failed", message: string};

const GeneratedDataContext = createContext<GeneratedData | undefined>(undefined);

const sourceName: Record<DataSource, string> = {
  r2: "the latest game data",
  local: "the game data bundled with the site",
};

const messageOf = (error: unknown) => error instanceof Error ? error.message : String(error);

const SwitchSourceButton = () => {
  const other: DataSource = dataSource() === "r2" ? "local" : "r2";
  return <button type="button" onClick={() => switchDataSource(other)}>Use {sourceName[other]}</button>;
};

/** Finds the game's generated data before it renders the page, and says what failed to load. */
export const GeneratedDataProvider = ({game, children}: {game: Game, children: ReactNode}) => {
  const [state, setState] = useState<State>(() =>
    dataSource() === "local" ? {status: "ready", data: {source: "local"}} : {status: "loading"});
  const [attempt, setAttempt] = useState(0);
  const [fileError, setFileError] = useState<GeneratedDataError>();

  useEffect(() => {
    let active = true;
    loadGeneratedData(game).then(
      (data) => active && setState({status: "ready", data}),
      (error) => active && setState({status: "failed", message: messageOf(error)}),
    );
    return () => { active = false; };
  }, [game, attempt]);

  useEffect(() => onGeneratedDataError(setFileError), []);

  const retry = () => {
    setState({status: "loading"});
    setAttempt((count) => count + 1);
  };

  return (
    <GeneratedDataContext.Provider value={state.status === "ready" ? state.data : undefined}>
      {dataSource() !== defaultDataSource() && (
        <div className="generated-data-message notice" role="status">
          <span>Showing {sourceName[dataSource()]}.</span>
          <SwitchSourceButton/>
        </div>
      )}
      {fileError && (
        <div className="generated-data-message" role="alert">
          <p>Some of {sourceName[dataSource()]} failed to load ({fileError.file}), so this page may be incomplete.</p>
          <p className="generated-data-detail">{fileError.message}</p>
          <div className="generated-data-actions">
            <button type="button" onClick={() => window.location.reload()}>Try again</button>
            <SwitchSourceButton/>
          </div>
        </div>
      )}
      {state.status === "loading" && <Spinner label="Loading game data…"/>}
      {state.status === "failed" && (
        <div className="generated-data-message" role="alert">
          <p>Couldn't find {sourceName[dataSource()]}.</p>
          <p className="generated-data-detail">{state.message}</p>
          <div className="generated-data-actions">
            <button type="button" onClick={retry}>Try again</button>
            <SwitchSourceButton/>
          </div>
        </div>
      )}
      {state.status === "ready" && children}
    </GeneratedDataContext.Provider>
  );
};

/** The game's generated data, once GeneratedDataProvider has found it. */
export function useGeneratedData(): GeneratedData | undefined {
  return useContext(GeneratedDataContext);
}
