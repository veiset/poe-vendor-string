import './PageLinks.css';
import vendorIcon from '../img/linkicons/fusing.png';
import mapIcon from '../img/linkicons/crimson_temple_map.png';
import flaskIcon from '../img/linkicons/glassblower.png';
import heistIcon from '../img/linkicons/blueprint.png';
import expeditionIcon from '../img/linkicons/expeidition_reroll.png';
import beastIcon from '../img/BestiaryOrbFull.png';
import coffeeIcon from '../img/bmc-logo-no-background.png';
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

const ExternalLink = (props: PageLinkProps) => {
  const {text, icon, route} = props;
  return (
    <div className="page-link">
      <a href={route}>
        <img alt={text + "-icon"} className="page-link-icon" src={icon}/>
        {text}
      </a>
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
      <PageLink text="Map modifiers" icon={mapIcon} route={"/maps"} currentPage={currentPage}/>
      <PageLink text="Map Name" icon={mapIcon} route={"/mapnames"} currentPage={currentPage}/>
      <PageLink text="Expedition" icon={expeditionIcon} route={"/expedition"} currentPage={currentPage}/>
      <PageLink text="Heist" icon={heistIcon} route={"/heist"} currentPage={currentPage}/>
      <PageLink text="Flasks" icon={flaskIcon} route={"/flasks"} currentPage={currentPage}/>
      <PageLink text="Bestiary" icon={beastIcon} route={"/beast"} currentPage={currentPage}/>
      <p className="support-coffee">
        <img src={coffeeIcon} alt="buy me a coffee" className="coffee-icon"/>
        <a className="source-link" target="_blank" href="https://www.buymeacoffee.com/veiset">Buy me a coffee</a>
      </p>
    </div>
  </div>)
}


export default PageLinks;
