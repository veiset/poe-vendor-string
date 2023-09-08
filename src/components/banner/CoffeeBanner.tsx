import React, {useReducer} from "react";
import './CoffeeBanner.css';

const CoffeeBanner = () => {

    const dismissedBanner = localStorage.getItem("banner01");
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const dismissBanner = () => {
        localStorage.setItem("banner01", "clicked");
        forceUpdate();
    }

    if (dismissedBanner) return <></>;

    return (
        <div className="coffee-banner">
                Please consider donating by <a className="banner-link" target="_blank" href="https://www.buymeacoffee.com/veiset">buying me a coffee</a> to keep this webpage ad-free and privacy friendly
                <span onClick={dismissBanner} className="close-banner">&lt;close banner&gt;</span>
        </div>
    )
}

export default CoffeeBanner;
