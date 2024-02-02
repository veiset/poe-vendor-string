import "@fontsource/manrope";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/layout.css';
import './styles/global.css';
import PageLinks from "./layout/PageLinks";
import {HashRouter} from "react-router-dom";
import Pages from "./layout/Pages";
import {migrateSavedSettings_V1} from "./utils/LocalStorageMigration";

migrateSavedSettings_V1();

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
              <ins className="adsbygoogle"
                   style={{display: "block", width: "728px", height: "90px"}}
                   data-ad-client="ca-pub-3293934477815502"
              >
              </ins>
              <div className="page-content">
                <Pages/>
              </div>
            </div>
            <div className="content-right-gfx"/>
          </div>
        </div>
      </div>
    </HashRouter>
  </React.StrictMode>
);

