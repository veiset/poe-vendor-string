import React, {useReducer} from "react";
import "./Banner.css";

const PoeInfoBanner = () => {
  const currentBannerId = "poeInfoBanner0";

  const dismissedBanner = localStorage.getItem(currentBannerId);
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  const dismissBanner = () => {
    localStorage.setItem(currentBannerId, "clicked");
    forceUpdate();
  };

  if (dismissedBanner) return <></>;

  return (
    <div className="info-banner">
      <div className="full-size coffee-banner-text">
        <p className="coffee-text banner-text-medium">
          Prices might not load due to architecture migration (dns propagation), this should fix itself in a few hours at most.
        </p>
      </div>
      <div>
        <span onClick={dismissBanner} className="close-banner">&lt;close&gt;</span>
      </div>
    </div>
  );
};

export default PoeInfoBanner;