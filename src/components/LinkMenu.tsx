import {Link} from "react-router-dom";
import React from "react";

const LinkMenu = () => {
    return (
        <div className="wrapper-link">
            <div className="container">
                <div className="item-wide">
                    <Link to="/vendor">Vendor</Link> {"| "}
                    <Link to="/maps">Map Modifiers</Link>
                </div>
            </div>
        </div>);
}

export default LinkMenu;