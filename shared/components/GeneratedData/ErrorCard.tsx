import {getBugReportUrl} from "@shared/core/issueTracker";
import discordIcon from "@shared/img/discord.svg";
import githubIcon from "@shared/img/github-mark-white.png";
import "./GeneratedData.css";

const discordUrl = "https://discord.gg/T8BzKnatY6";

// A broken regex across the top of the error, in place of a coloured border
const brokenRegex = String.raw`"!ir p|au c|ss lo" "^(?=.*?ma(?!ps))[^\d]{2,}" "!nt$|ce\b|\(1[0-9]" "rr(?<=o)r|lo?ad.*d(at|a)?$" "[^x]+?|¿?|$^" "(?!data)|\[\]{,}" "!err|or!|(?=" "m(?:ap|od)s?\s{0}[^]" "^tr.*y(\d+)?ag(?:ain)?$" "!(?<=x)y|\b\B|.{-1}" "wa?ys?t(on)?e|ta?bl.t|re?l[i!]c" "(?=(?=(?=" "![\x00-\x1f]|\p{?}|$$" "lo+a+d+i+n+g+" "!ex(?!p)|ed.*n(?=$" "^^" "|||" "[a-Z]|\2|(?#)" "fai?l(ed)?.*4[0o]4"`;

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

/** An error loading the generated data, with buttons to try again or report it. */
export const ErrorCard = ({title, text, detail, onRetry, problem, partial}: ErrorCardProps) => (
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
