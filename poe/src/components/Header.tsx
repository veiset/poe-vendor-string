import {PageHeader} from "@shared/components/PageHeader";
import Profile from "./profile/Profile";
import Poe1AdBanner from "@shared/components/ads/banners/Poe1AdBanner";

export interface HeaderProps {
  text: string
}

const Header = ({text}: HeaderProps) => <>
  <PageHeader text={text}>
    <Profile/>
  </PageHeader>
  <Poe1AdBanner/>
</>;

export const HeaderWithLanguage = ({text}: HeaderProps) => <>
  <PageHeader text={text}>
    <Profile languageSelect/>
  </PageHeader>
  <Poe1AdBanner/>
</>;

export default Header;
