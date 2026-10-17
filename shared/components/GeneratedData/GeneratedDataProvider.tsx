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

// A broken regex across the top of the error, in place of a coloured border
const brokenRegex = String.raw`"!ir p|au c|ss lo" "^(?=.*?ma(?!ps))[^\d]{2,}" "!nt$|ce\b|\(1[0-9]" "rr(?<=o)r|lo?ad.*d(at|a)?$" "[^x]+?|¿?|$^" "(?!data)|\[\]{,}" "!err|or!|(?=" "m(?:ap|od)s?\s{0}[^]" "^tr.*y(\d+)?ag(?:ain)?$" "!(?<=x)y|\b\B|.{-1}" "wa?ys?t(on)?e|ta?bl.t|re?l[i!]c" "(?=(?=(?=" "![\x00-\x1f]|\p{?}|$$" "lo+a+d+i+n+g+" "!ex(?!p)|ed.*n(?=$" "^^" "|||" "[a-Z]|\2|(?#)" "fai?l(ed)?.*4[0o]4"`;

const messageOf = (error: unknown) => error instanceof Error ? error.message : String(error);

interface ErrorCardProps {
  title: string;
  text: string;
  detail: string;
  onRetry: () => void;
  /** The GitHub issue's title */
  problem: string;
  /** Orange instead of red: the page still shows, without some of its data */
  partial?: boolean;
}

const ErrorCard = ({title, text, detail, onRetry, problem, partial}: ErrorCardProps) => (
  <section className={partial ? "generated-data-card partial" : "generated-data-card"}>
    <div className="generated-data-regex" aria-hidden="true">{brokenRegex}</div>
    <h2>{title}</h2>
    <p>{text}</p>
    <p className="generated-data-detail">{detail}</p>
    <div className="generated-data-actions">
      <button type="button" className="generated-data-retry" onClick={onRetry}>Try again</button>
      <a href={discordUrl} target="_blank" rel="noopener noreferrer">
        <img src={discordIcon} alt="" className="generated-data-icon generated-data-icon-discord"/>
        Discord
      </a>
      <a href={getBugReportUrl(problem)} target="_blank" rel="noopener noreferrer">
        <img src={githubIcon} alt="" className="generated-data-icon"/>
        GitHub
      </a>
    </div>
  </section>
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
        <div className="generated-data-file-error" role="alert">
          <ErrorCard
            partial
            title="Some data couldn't be loaded"
            text="This page may be incomplete. Try again in a few minutes, and if it still fails, let us know on Discord or GitHub."
            detail={fileError.message}
            onRetry={() => window.location.reload()}
            problem={`Error loading data: ${fileError.file}`}
          />
        </div>
      )}
      {state === "loading" && <Spinner label="Loading game data…"/>}
      {typeof state === "object" && (
        <div className="generated-data-error" role="alert">
          <ErrorCard
            title="Error loading data"
            text="This page's data couldn't be loaded. Try again in a few minutes, and if it still fails, let us know on Discord or GitHub."
            detail={state.failed}
            onRetry={retry}
            problem={`Error loading data (${state.failed})`}
          />
        </div>
      )}
      {/* The page's own code loads here too, so the layout stays while it does */}
      {state === "ready" && <Suspense fallback={<Spinner label="Loading game data…"/>}>{children}</Suspense>}
    </>
  );
};
