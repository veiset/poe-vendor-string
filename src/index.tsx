import "@fontsource/manrope";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './layout.css';
import linkGraphic from './img/pagegfx/chain_icon.png';
import PageLinks from "./layout/link/PageLinks";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <div className="content-height-wrapper">
            <div className="content-container">
                <div className="content-links">
                    <img src={linkGraphic} className="content-link-icon" />
                    <PageLinks />
                </div>
                <div className="content-main">
                    <div className="content-left-gfx"></div>
                    <div className="content-main-area">
                        hello
                        <p>Hello<br/>Hello<br/>Hello<br/>Hello<br/>Hello<br/>Hello<br/></p>
                        <p>Hello<br/>Hello<br/>Hello<br/>Hello<br/>Hello<br/>Hello<br/></p>
                        <p>Hello<br/>Hello<br/>Hello<br/>Hello<br/>Hello<br/>Hello<br/></p>
                    </div>
                    <div className="content-right-gfx"></div>
                </div>
            </div>
        </div>
    </React.StrictMode>
);

