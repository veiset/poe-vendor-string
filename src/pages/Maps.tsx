import React from "react";
import ResultBox from "../components/ResultBox";

const Maps = () => {
    return (
        <div className="wrapper">
            <div className="container">
                <div className="item-wide info-header">Path of Exile - Map search tool</div>
                <ResultBox result={"123-26-23-622|abc"} warning={"Help"} error={undefined} />
            </div>
        </div>
    );
}

export default Maps;
