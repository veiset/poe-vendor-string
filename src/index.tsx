import "@fontsource/manrope";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './layout.css';
import linkGraphic from './img/pagegfx/chain_icon.png';
import PageLinks from "./layout/PageLinks";
import {HashRouter} from "react-router-dom";
import Pages from "./layout/Pages";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <HashRouter>
            <div className="content-height-wrapper">
                <div className="content-container">
                    <div className="content-links">
                        <img alt="chain-gfx" src={linkGraphic} className="content-link-icon"/>
                        <PageLinks/>
                    </div>
                    <div className="content-main">
                        <div className="content-left-gfx"/>
                        <div className="content-main-area"><Pages /></div>
                        <div className="content-right-gfx"/>
                    </div>
                </div>
            </div>
        </HashRouter>
    </React.StrictMode>
);

