import Heist from "../pages/heist/Heist";
import {Route, Routes} from "react-router-dom";
import Vendor from "../pages/vendor/Vendor";
import Maps from "../pages/maps/Maps";
import Flasks from "../pages/flasks/Flasks";
import Expedition from "../pages/expedition/Expedition";
import Beast from "../pages/beast/Beast";
import {ProfileContext} from "../components/profile/Profile";
import {useEffect, useState} from "react";
import {loadCurrentProfile, loadProfile, selectedProfile} from "../utils/LocalStorage";

const Pages = () => {
  const [globalProfile, setGlobalProfile] = useState(selectedProfile());
  const [profile, setProfile] = useState(loadCurrentProfile());

  useEffect(() => {
    let savedSettings = loadProfile(globalProfile);
    setProfile(savedSettings);
  }, [globalProfile]);

  return (
    <ProfileContext.Provider value={{globalProfile, setGlobalProfile}}>
      <Routes>
        <Route path="/" element={<Vendor profile={profile} key={"vendor-" + profile.name}/>}/>
        <Route path="/vendor" element={<Vendor profile={profile} key={"vendor-" + profile.name}/>}/>
        <Route path="/maps" element={<Maps profile={profile} key={"map-" + profile.name}/>}/>
        <Route path="/flasks" element={<Flasks profile={profile} key={"flask-" + profile.name}/>}/>
        <Route path="/heist" element={<Heist profile={profile} key={"heist-" + profile.name}/>}/>
        <Route path="/expedition" element={<Expedition profile={profile} key={"expedition-" + profile.name}/>}/>
        <Route path="/beast" element={<Beast profile={profile} key={"beast-" + profile.name}/>}/>
      </Routes>
    </ProfileContext.Provider>
  );
}

export default Pages;