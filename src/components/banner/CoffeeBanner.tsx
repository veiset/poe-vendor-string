import React, {useReducer} from "react";
import './CoffeeBanner.css';

const CoffeeBanner = () => {
  const currentBannerId = "banner03";

  const dismissedBanner = localStorage.getItem(currentBannerId);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const dismissBanner = () => {
    localStorage.setItem(currentBannerId, "clicked");
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
      </div>
      <div>
        <span onClick={dismissBanner} className="close-banner">&lt;close&gt;</span>
      </div>
    </div>
  )
}

export default CoffeeBanner;
