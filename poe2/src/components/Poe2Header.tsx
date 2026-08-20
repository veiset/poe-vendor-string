import {PageHeader} from "@shared/components/PageHeader";
import Poe2ProfileSelector from "./Poe2ProfileSelector";

export interface Poe2HeaderProps {
  text: string
}

export const Poe2Header = ({text}: Poe2HeaderProps) => (
  <PageHeader text={text}>
    <Poe2ProfileSelector/>
  </PageHeader>
);

export default Poe2Header;
