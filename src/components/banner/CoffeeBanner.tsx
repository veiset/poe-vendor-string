import React, {useReducer} from "react";
import './CoffeeBanner.css';

const CoffeeBanner = () => {

  const dismissedBanner = localStorage.getItem("banner02");
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const dismissBanner = () => {
    localStorage.setItem("banner02", "clicked");
    forceUpdate();
  }

  if (dismissedBanner) return <></>;

  return (
    <div className="coffee-banner">
      <div className="full-size coffee-banner-text">
        <p className="coffee-text coffee-banner-text-big">
          Help keep this page ad-free: <a className="banner-link" target="_blank"
                                          href="https://www.buymeacoffee.com/veiset"
                                          rel="noreferrer">donate</a>
        </p>
        <p className="coffee-text">
          I’ve disabled the ads. This should make the page <b>faster</b> and more <b>privacy</b> friendly.
        </p>

      </div>
      <div>
        <span onClick={dismissBanner} className="close-banner">&lt;close&gt;</span>
      </div>
    </div>
  )
}

export default CoffeeBanner;
