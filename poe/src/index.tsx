import "@fontsource/manrope/400.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@shared/styles/layout.css';
import '@shared/styles/global.css';
import {BrowserRouter} from "react-router-dom";
import {Poe1Routes} from "./layout/Poe1Routes";
import {migrateHashRoute} from "@shared/core/migrateHashRoute";
import {recoverFromDynamicImportFailure} from "@shared/core/recoverFromDynamicImportFailure";
import {migrateStoredProfiles} from "./migration/migrations";

migrateHashRoute();
recoverFromDynamicImportFailure();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
migrateStoredProfiles().finally(() => root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Poe1Routes/>
    </BrowserRouter>
  </React.StrictMode>
));
