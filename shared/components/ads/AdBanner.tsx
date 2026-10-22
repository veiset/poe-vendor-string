import {useLocation} from "react-router-dom";
import NitroAd from "@shared/components/ads/NitroAd";
import type {NitroAdOptions} from "@shared/core/nitroAds";
import "./AdBanner.css";

interface AdBannerProps {
  id: string;
  // A module constant at the call site: NitroAd keys the placement off the id,
  // so this object must stay referentially stable across renders.
  options: NitroAdOptions;
}

// Rendered by each app's page header, so it sits under the page title. Keyed by
// pathname so every navigation tears the placement down and creates a new one,
// which is what NitroPay asks single-page apps to do (removed, not hidden or reused).
export const AdBanner = ({id, options}: AdBannerProps) => {
  const {pathname} = useLocation();
  return <NitroAd key={pathname} id={id} options={options} className="ad-banner"/>;
};

export default AdBanner;
