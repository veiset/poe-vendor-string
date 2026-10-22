import "@fontsource/manrope/400.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@shared/styles/layout.css';
import '@shared/styles/global.css';
import {BrowserRouter} from "react-router-dom";
import {Poe1Routes} from "./layout/Poe1Routes";
import {migrateHashRoute} from "@shared/core/migrateHashRoute";
import {recoverFromDynamicImportFailure} from "@shared/core/recoverFromDynamicImportFailure";
import {installNitroAdsDetection} from "@shared/core/nitroAdsDetect";
import {migrateStoredProfiles} from "./migration/migrations";
import {GeneratedDataProvider} from "@shared/components/GeneratedData/GeneratedDataProvider";

migrateHashRoute();
recoverFromDynamicImportFailure();
installNitroAdsDetection();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GeneratedDataProvider game="poe1" beforeRender={migrateStoredProfiles}>
      <BrowserRouter>
        <Poe1Routes/>
      </BrowserRouter>
    </GeneratedDataProvider>
  </React.StrictMode>
);
