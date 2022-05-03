import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Vendor from './pages/Vendor';
import {HashRouter, Route, Routes} from "react-router-dom";
import Maps from "./pages/Maps";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <HashRouter>
          <Routes>
              <Route path="/" element={<Vendor />} />
              <Route path="/vendor" element={<Vendor />} />
              <Route path="/maps" element={<Maps />} />
          </Routes>
      </HashRouter>
  </React.StrictMode>
);

