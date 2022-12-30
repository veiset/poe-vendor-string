import Heist from "../pages/Heist";
import {Route, Routes} from "react-router-dom";
import Vendor from "../pages/Vendor";
import Maps from "../pages/Maps";
import Flasks from "../pages/Flasks";

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