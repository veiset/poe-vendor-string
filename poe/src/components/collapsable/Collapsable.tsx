import React, {useState} from "react";
import "./Collapsable.css";

interface CollapsableProps {
    header: string
    isOpenByDefault?: boolean
    children?: React.ReactNode;
}

const Collapsable = (props: CollapsableProps) => {

    const {header, isOpenByDefault, children} = props;

    const [isOpen, setIsOpen] = useState<boolean>(isOpenByDefault ?? false);

    return (
        <div className="collapsable-wrapper">
            <div className="collapsable-header" onClick={() => setIsOpen(!isOpen)}>
                <div className="collapsable-icon">{isOpen ? '-' : '+'}</div>
                <div>{header}</div>
            </div>
            {isOpen && <div className={"collapsable-content" + (isOpen ? " collapsable-anim" : "")}>{children}</div>}
        </div>
    );
}

export default Collapsable;