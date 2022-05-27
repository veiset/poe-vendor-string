import {Link} from "react-router-dom";
import React from "react";

const LinkMenu = () => {
    return (
        <div className="wrapper-link">
            <div className="container">
                <div className="item-wide">
                    <Link to="/vendor">Vendor</Link> {"| "}
                    <Link to="/maps">Map Modifiers</Link> {"| "}
                    <a href="https://xanthics.github.io/poe_gen_gwennen/">Expedition (external link)</a>
                </div>
            </div>
        </div>);
}

export default LinkMenu;