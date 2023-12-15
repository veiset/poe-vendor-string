import "@fontsource/manrope";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/layout.css';
import './styles/global.css';
import linkGraphic from './img/pagegfx/chain_icon.png';
import PageLinks from "./layout/PageLinks";
import {HashRouter} from "react-router-dom";
import Pages from "./layout/Pages";
import About from "./components/About";
import CoffeeBanner from "./components/banner/CoffeeBanner";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <div className="content-height-wrapper">
        <div className="content-container">
          <div className="content-links">
            <PageLinks/>
          </div>
          <div className="content-main">
            <div className="content-left-gfx"/>
            <div className="content-main-area">
              <div className="page-content">
                <Pages/>
                <About/>
              </div>
            </div>
            <div className="content-right-gfx"/>
          </div>
        </div>
      </div>
    </HashRouter>
  </React.StrictMode>
);

