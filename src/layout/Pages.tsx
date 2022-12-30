import Heist from "../pages/heist/Heist";
import {Route, Routes} from "react-router-dom";
import Vendor from "../pages/vendor/Vendor";
import Maps from "../pages/maps/Maps";
import Flasks from "../pages/flasks/Flasks";

const Pages = () => {
    return (
        <Routes>
            <Route path="/" element={<Vendor/>}/>
            <Route path="/vendor" element={<Vendor/>}/>
            <Route path="/maps" element={<Maps/>}/>
            <Route path="/flasks" element={<Flasks/>}/>
            <Route path="/heist" element={<Heist/>}/>
        </Routes>
    );
}

export default Pages;