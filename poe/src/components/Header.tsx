import {PageHeader} from "@shared/components/PageHeader";
import Profile from "./profile/Profile";

export interface HeaderProps {
  text: string
}

const Header = ({text}: HeaderProps) => (
  <PageHeader text={text}>
    <Profile/>
  </PageHeader>
);

export const HeaderWithLanguage = ({text}: HeaderProps) => (
  <PageHeader text={text}>
    <Profile languageSelect/>
  </PageHeader>
);

export default Header;
