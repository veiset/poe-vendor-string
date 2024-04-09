import './PageLinks.css';
import vendorIcon from '../img/linkicons/fusing.png';
import mapIcon from '../img/linkicons/crimson_temple_map.png';
import mapNameIcon from '../img/linkicons/chateau_map.png';
import flaskIcon from '../img/linkicons/glassblower.png';
import heistIcon from '../img/linkicons/blueprint.png';
import expeditionIcon from '../img/linkicons/expeidition_reroll.png';
import beastIcon from '../img/BestiaryOrbFull.png';
import scarabIcon from '../img/scarab.png';
import coffeeIcon from '../img/bmc-logo-no-background.png';
import githubIcon from '../img/github-mark-white.png';
import plausibleIcon from '../img/plausible_logo_sm.png';
import {Link, useLocation} from 'react-router-dom';


export interface PageLinkProps {
  text: string
  icon: string
  route: string
  currentPage: string
}

const PageLink = (props: PageLinkProps) => {
  const {text, icon, route, currentPage} = props;
  const classes = route === currentPage ? "page-link page-link-current" : "page-link";
  return (
    <div className={classes}>
      <Link to={route}>
        <img alt={text + "-icon"} className="page-link-icon" src={icon}/>
        {text}
      </Link>
    </div>
  );
}

const PageLinks = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  return (<div className="page-link-wrapper">
    <div className="page-link-header">Path of Regex</div>
    <div className="page-links">
      <PageLink text="Vendor" icon={vendorIcon} route={"/"} currentPage={currentPage}/>
      <PageLink text="Map mods" icon={mapIcon} route={"/maps"} currentPage={currentPage}/>
      <PageLink text="Map mods T17" icon={mapIcon} route={"/mapst17"} currentPage={currentPage}/>
      <PageLink text="Map names" icon={mapNameIcon} route={"/mapnames"} currentPage={currentPage}/>
      <PageLink text="Expedition" icon={expeditionIcon} route={"/expedition"} currentPage={currentPage}/>
      <PageLink text="Heist" icon={heistIcon} route={"/heist"} currentPage={currentPage}/>
      <PageLink text="Flasks" icon={flaskIcon} route={"/flasks"} currentPage={currentPage}/>
      <PageLink text="Bestiary" icon={beastIcon} route={"/beast"} currentPage={currentPage}/>
      <PageLink text="Scarab" icon={scarabIcon} route={"/scarab"} currentPage={currentPage}/>
      <p className="support-link">
        <img src={githubIcon} alt="issue tracker" className="support-icon"/>
        <a className="source-link" href="https://github.com/veiset/poe-vendor-string/issues"
           rel="noreferrer">
          Report issue
        </a>
      </p>
      <p className="support-link">
        <img src={coffeeIcon} alt="buy me a coffee" className="support-icon"/>
        <a className="source-link" href="https://www.buymeacoffee.com/veiset" rel="noreferrer">
          Buy me a coffee</a>
      </p>
      <p className="support-link">
        <img src={plausibleIcon} alt="website stats" className="support-icon"/>
        <a className="source-link" href="https://plausible.vz.is/poe.re" rel="noreferrer">
          Website stats</a>
      </p>
    </div>
  </div>)
}


export default PageLinks;
