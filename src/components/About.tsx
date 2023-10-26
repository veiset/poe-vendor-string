import React from "react";
import './About.css';

const About = () => {
    return (
        <div className="item-wide about-info">
            <p>
                Source code at <a className="source-link" href="https://github.com/veiset/poe-vendor-string">github.com/veiset/poe-vendor-string</a><br/>
                Feature requests, issues and bugs can be reported <a className="source-link" href="https://github.com/veiset/poe-vendor-string/issues">here</a><br/>
                Webpage stats at <a className="source-link" href="https://plausible.vz.is/poe.re">plausible.io/poe.re</a><br/>
            </p>

        </div>
    )
}

export default About;