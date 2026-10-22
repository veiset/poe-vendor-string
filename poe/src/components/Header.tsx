import {PageHeader} from "@shared/components/PageHeader";
import AdBanner from "@shared/components/ads/AdBanner";
import type {NitroAdOptions} from "@shared/core/nitroAds";
import Profile from "./profile/Profile";

const BANNER_ID = "ad-std-banner-poere-nitro-001";

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

export interface HeaderProps {
  text: string
}

const Header = ({text}: HeaderProps) => <>
  <PageHeader text={text}>
    <Profile/>
  </PageHeader>
  <AdBanner id={BANNER_ID} options={BANNER_OPTIONS}/>
</>;

export const HeaderWithLanguage = ({text}: HeaderProps) => <>
  <PageHeader text={text}>
    <Profile languageSelect/>
  </PageHeader>
  <AdBanner id={BANNER_ID} options={BANNER_OPTIONS}/>
</>;

export default Header;
