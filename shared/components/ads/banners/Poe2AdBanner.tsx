import AdBanner from "@shared/components/ads/AdBanner";
import type {NitroAdOptions} from "@shared/core/nitroAds";

const BANNER_ID = "ad-std-banner-nitro-001";

// Module constant: NitroAd keys the placement off the id, so this object must
// stay referentially stable across renders.
const BANNER_OPTIONS: NitroAdOptions = {
  height: 250,
  delayLoading: true,
  report: {
    enabled: true,
    icon: true,
    wording: "Report Ad",
    position: "bottom-right",
  },
};

// Rendered by Poe2Header, so it sits under the page title.
export const Poe2AdBanner = () => <AdBanner id={BANNER_ID} options={BANNER_OPTIONS}/>;

export default Poe2AdBanner;
