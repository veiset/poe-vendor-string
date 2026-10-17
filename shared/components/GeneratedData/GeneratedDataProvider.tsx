import {ReactNode, Suspense, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Spinner} from "@shared/components/Spinner/Spinner";
import {getBugReportUrl} from "@shared/core/issueTracker";
import {dataSource, Game, GeneratedDataError, loadGeneratedData, onGeneratedDataError} from "@shared/generatedData";
import discordIcon from "@shared/img/discord.svg";
import githubIcon from "@shared/img/github-mark-white.png";
import "./GeneratedData.css";

type State = "loading" | "ready" | {failed: string};

const discordUrl = "https://discord.gg/T8BzKnatY6";

const messageOf = (error: unknown) => error instanceof Error ? error.message : String(error);

const ReportLinks = ({problem}: {problem: string}) => (
  <>
    <a href={discordUrl} target="_blank" rel="noopener noreferrer">
      <img src={discordIcon} alt="" className="generated-data-icon generated-data-icon-discord"/>
      Report on Discord
    </a>
    <a href={getBugReportUrl(problem)} target="_blank" rel="noopener noreferrer">
      <img src={githubIcon} alt="" className="generated-data-icon"/>
      Report on GitHub
    </a>
  </>
);

/** Finds the game's generated data before it renders the page, and says what failed to load. */
export const GeneratedDataProvider = ({game, children}: {game: Game, children: ReactNode}) => {
  const [state, setState] = useState<State>(dataSource === "local" ? "ready" : "loading");
  const [attempt, setAttempt] = useState(0);
  const [fileError, setFileError] = useState<GeneratedDataError>();
  const {pathname} = useLocation();

  useEffect(() => {
    let active = true;
    loadGeneratedData(game).then(
      () => active && setState("ready"),
      (error) => active && setState({failed: messageOf(error)}),
    );
    return () => { active = false; };
  }, [game, attempt]);

  useEffect(() => onGeneratedDataError(setFileError), []);
  // A failed file belongs to the page that loaded it
  useEffect(() => setFileError(undefined), [pathname]);

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
          <div className="generated-data-actions">
            <button type="button" onClick={() => window.location.reload()}>Try again</button>
            <ReportLinks problem={`Game data failed to load: ${fileError.file}`}/>
          </div>
        </div>
      )}
      {state === "loading" && <Spinner label="Loading game data…"/>}
      {typeof state === "object" && (
        <div className="generated-data-error" role="alert">
          <div className="generated-data-error-card">
            <h2>Error loading data</h2>
            <p>This page has data that couldn't be loaded right now.</p>
            <p>Please try again in a few moments, if that fails report the issue on github or discord.</p>
            <div className="generated-data-actions">
              <button type="button" className="generated-data-primary" onClick={retry}>Try again</button>
              <ReportLinks problem={`Error loading data (${state.failed})`}/>
            </div>
            <p className="generated-data-detail">{state.failed}</p>
          </div>
        </div>
      )}
      {/* The page's own code loads here too, so the layout stays while it does */}
      {state === "ready" && <Suspense fallback={<Spinner label="Loading game data…"/>}>{children}</Suspense>}
    </>
  );
};
