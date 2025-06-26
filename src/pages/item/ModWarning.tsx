import {ItemRegex} from "../../generated/GeneratedItemMods";
import Collapsable from "../../components/collapsable/Collapsable";

interface ModWarningProps {
  itemRegex: ItemRegex
}

const ModWarning = (props: ModWarningProps) => {
  const {itemRegex} = props;
  const warnings = itemRegex.categoryRegex.flatMap((e) => e.warnings);

  return <Collapsable
    header={`Show all possible warnings / mod conflicts for ${itemRegex.basetype}`}>{warnings.map((e) =>
    <div className="mod-warning">duplicate: {e}</div>)}</Collapsable>;
}

export default ModWarning;