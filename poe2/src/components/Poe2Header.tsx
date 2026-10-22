import {PageHeader} from "@shared/components/PageHeader";
import Poe2ProfileSelector from "./Poe2ProfileSelector";
import Poe2LeagueSelect from "./Poe2LeagueSelect";
import Poe2AdBanner from "./ads/Poe2AdBanner";

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
    <Poe2AdBanner/>
  </>;
};

export default Poe2Header;
