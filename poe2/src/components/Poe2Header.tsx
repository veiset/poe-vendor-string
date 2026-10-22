import {PageHeader} from "@shared/components/PageHeader";
import Poe2ProfileSelector from "./Poe2ProfileSelector";
import Poe2LeagueSelect from "./Poe2LeagueSelect";
import AdBanner from "@shared/components/ads/AdBanner";
import type {NitroAdOptions} from "@shared/core/nitroAds";

const BANNER_ID = "ad-std-banner-nitro-001";

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

export interface Poe2HeaderProps {
  text: string
  languageSelect?: boolean
}

export const Poe2Header = ({text, languageSelect = false}: Poe2HeaderProps) => {
  return <>
    <PageHeader text={text}>
      <div className="profile-container">
        <div>League:</div>
        <Poe2LeagueSelect/>
        <Poe2ProfileSelector languageSelect={languageSelect}/>
      </div>
    </PageHeader>
    <AdBanner id={BANNER_ID} options={BANNER_OPTIONS}/>
  </>;
};

export default Poe2Header;
