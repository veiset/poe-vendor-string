import React from "react";
import './About.css';

const About = () => {
    return (
        <div className="item-wide about-info">
            <p>
                Source code at <a className="source-link" href="https://github.com/veiset/poe-vendor-string">github.com/veiset/poe-vendor-string</a><br/>
                Feature requests, issues and bugs can be reported <a className="source-link" href="https://github.com/veiset/poe-vendor-string/issues">here</a><br/>
                Webpage stats at <a className="source-link" href="https://plausible.io/poe.re">plausible.io/poe.re</a><br/>
            </p>
            <p>
                Want to help me keep the webpage up and running? <br/>
                <a className="source-link" target="_blank" href="https://www.buymeacoffee.com/veiset">Buy me a coffee</a> to help with the server costs.
            </p>

        </div>
    )
}

export default About;