import Heist from "../pages/heist/Heist";
import {Route, Routes} from "react-router-dom";
import Vendor from "../pages/vendor/Vendor";
import Maps from "../pages/maps/Maps";
import MapNames from "../pages/maps/MapNames";
import Flasks from "../pages/flasks/Flasks";
import Expedition from "../pages/expedition/Expedition";
import Beast from "../pages/beast/Beast";

const Pages = () => {
    return (
        <Routes>
            <Route path="/" element={<Vendor/>}/>
            <Route path="/vendor" element={<Vendor/>}/>
            <Route path="/maps" element={<Maps/>}/>
            <Route path="/mapnames" element={<MapNames/>}/>
            <Route path="/flasks" element={<Flasks/>}/>
            <Route path="/heist" element={<Heist/>}/>
            <Route path="/expedition" element={<Expedition/>}/>
            <Route path="/beast" element={<Beast/>}/>
        </Routes>
    );
}

export default Pages;