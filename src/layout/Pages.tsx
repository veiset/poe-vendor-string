import Heist from "../pages/heist/Heist";
import {Route, Routes} from "react-router-dom";
import Vendor from "../pages/vendor/Vendor";
import Maps from "../pages/maps/Maps";
import Flasks from "../pages/flasks/Flasks";
import Expedition from "../pages/expedition/Expedition";
import Beast from "../pages/beast/Beast";
import React, {useEffect, useState} from "react";
import {loadSettings, selectedProfile} from "../utils/LocalStorage";
import {ProfileContext} from "../components/profile/ProfileContext";
import MapNames from "../pages/mapnames/MapNames";
import CompassRegex from "../pages/compass/CompassRegex";

const Pages = () => {
  const [globalProfile, setGlobalProfile] = useState(selectedProfile());
  const [profile, setProfile] = useState(loadSettings(globalProfile));

  useEffect(() => {
    console.log(`Loading profile: ${globalProfile}`)
    let savedSettings = loadSettings(globalProfile);
    setProfile(savedSettings);
  }, [globalProfile]);

  return (
    <ProfileContext.Provider value={{globalProfile, setGlobalProfile}}>
      <Routes>
        <Route path="/" element={<Vendor key={"vendor-" + profile.name}/>}/>
        <Route path="/vendor" element={<Vendor key={"vendor-" + profile.name}/>}/>
        <Route path="/maps" element={<Maps key={"map-" + profile.name}/>}/>
        <Route path="/mapnames" element={<MapNames key={"mapnames-" + profile.name}/>}/>
        <Route path="/flasks" element={<Flasks key={"flask-" + profile.name}/>}/>
        <Route path="/heist" element={<Heist key={"heist-" + profile.name}/>}/>
        <Route path="/expedition" element={<Expedition key={"expedition-" + profile.name}/>}/>
        <Route path="/compass" element={<CompassRegex key={"expedition-" + profile.name}/>}/>
        <Route path="/beast" element={<Beast key={"beast-" + profile.name}/>}/>
      </Routes>
    </ProfileContext.Provider>
  );
}

export default Pages;