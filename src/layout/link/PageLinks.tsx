import './PageLinks.css';
import vendorIcon from './../../img/linkicons/fusing.png'

export interface PageLinkProps {
    text: string
    icon: string
}

const PageLink = (props: PageLinkProps) => {
    const {text, icon} = props;
    return (
        <div className="page-link">
            <img alt={text + "-icon"} className="page-link-icon" src={icon}/>
            {text}
        </div>
    );
}

const PageLinks = () => {
    return (<>
        <div className="page-link-header">Path of Regex</div>
        <PageLink text="Vendor" icon={vendorIcon}/>
        <PageLink text="Map modifiers" icon={vendorIcon}/>
        <PageLink text="Expedition" icon={vendorIcon}/>
        <PageLink text="Flasks" icon={vendorIcon}/>
        <PageLink text="Heist" icon={vendorIcon}/>
    </>)
}

export default PageLinks;
