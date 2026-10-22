import {useLocation} from "react-router-dom";
import NitroAd from "@shared/components/ads/NitroAd";
import type {NitroAdOptions} from "@shared/core/nitroAds";

const BANNER_ID = "ad-std-banner-poere-nitro-001";

// Module constant: NitroAd keys the placement off the id, so this object must
// stay referentially stable across renders.
const BANNER_OPTIONS: NitroAdOptions = {
  height: 250,
  delayLoading: true,
  report: {
    enabled: true,
    icon: true,
    wording: "Report Ad",
    position: "top-right",
  },
};

// Rendered by poe's Header, so it sits under the page title. Keyed by pathname so
// every navigation tears the placement down and creates a new one, which is
// what NitroPay asks single-page apps to do (removed, not hidden or reused).
export const Poe1AdBanner = () => {
  const {pathname} = useLocation();
  return <NitroAd key={pathname} id={BANNER_ID} options={BANNER_OPTIONS}/>;
};

export default Poe1AdBanner;
