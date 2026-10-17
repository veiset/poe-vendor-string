import {ReactNode, useEffect, useState} from "react";
import {Spinner} from "@shared/components/Spinner/Spinner";
import {dataSource, Game, GeneratedDataError, loadGeneratedData, onGeneratedDataError} from "@shared/generatedData";
import "./GeneratedData.css";

type State = "loading" | "ready" | {failed: string};

const messageOf = (error: unknown) => error instanceof Error ? error.message : String(error);

/** Finds the game's generated data before it renders the page, and says what failed to load. */
export const GeneratedDataProvider = ({game, children}: {game: Game, children: ReactNode}) => {
  const [state, setState] = useState<State>(dataSource === "local" ? "ready" : "loading");
  const [attempt, setAttempt] = useState(0);
  const [fileError, setFileError] = useState<GeneratedDataError>();

  useEffect(() => {
    let active = true;
    loadGeneratedData(game).then(
      () => active && setState("ready"),
      (error) => active && setState({failed: messageOf(error)}),
    );
    return () => { active = false; };
  }, [game, attempt]);

  useEffect(() => onGeneratedDataError(setFileError), []);

  const retry = () => {
    setState("loading");
    setAttempt((count) => count + 1);
  };

  return (
    <>
      {fileError && (
        <div className="generated-data-message" role="alert">
          <p>Some of the game data failed to load ({fileError.file}), so this page may be incomplete.</p>
          <p className="generated-data-detail">{fileError.message}</p>
          <button type="button" onClick={() => window.location.reload()}>Try again</button>
        </div>
      )}
      {state === "loading" && <Spinner label="Loading game data…"/>}
      {typeof state === "object" && (
        <div className="generated-data-message" role="alert">
          <p>Couldn't load the game data.</p>
          <p className="generated-data-detail">{state.failed}</p>
          <button type="button" onClick={retry}>Try again</button>
        </div>
      )}
      {state === "ready" && children}
    </>
  );
};
