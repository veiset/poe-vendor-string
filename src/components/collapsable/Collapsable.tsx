import React, {useState} from "react";
import "./Collapsable.css";

interface CollapsableProps {
    header: string
    children?: React.ReactNode;
}

const Collapsable = (props: CollapsableProps) => {

    const {header, children} = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="collapsable-wrapper">
            <div className="collapsable-header" onClick={() => setIsOpen(!isOpen)}>
                <div>{header}</div>
                <div>{isOpen ? '-' : '+'}</div>
            </div>
            {isOpen && <div className={"collapsable-content" + (isOpen ? " collapsable-anim" : "")}>{children}</div>}
        </div>
    );
}

export default Collapsable;