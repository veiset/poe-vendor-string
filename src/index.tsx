import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Vendor from './pages/Vendor';
import {HashRouter, Route, Routes} from "react-router-dom";
import Maps from "./pages/Maps";
import LinkMenu from "./components/LinkMenu";
import About from "./components/About";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <HashRouter>
            <LinkMenu/>
            <Routes>
                <Route path="/" element={<Vendor/>}/>
                <Route path="/vendor" element={<Vendor/>}/>
                <Route path="/maps" element={<Maps/>}/>
            </Routes>
            <About />
        </HashRouter>
    </React.StrictMode>
);

