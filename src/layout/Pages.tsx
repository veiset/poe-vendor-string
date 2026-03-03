import Heist from "../pages/heist/Heist";
import { Route, Routes } from "react-router-dom";
import Vendor from "../pages/vendor/Vendor";
import Flasks from "../pages/flasks/Flasks";
import Expedition from "../pages/expedition/Expedition";
import Beast from "../pages/beast/Beast";
import React, { useEffect, useState } from "react";
import { loadSettings, selectedProfile } from "../utils/LocalStorage";
import { ProfileContext } from "../components/profile/ProfileContext";
import MapNames from "../pages/mapnames/MapNames";
import Scarabs from "../pages/scarab/Scarabs";
import Jewel from "../pages/jewel/Jewel";
import OptimizedMapMods from "../pages/maps/OptimizedMapMods";
import MagicItem from "../pages/magicitem/MagicItem";
import Item from "../pages/item/Item";
import Tattoo from "../pages/tattoo/Tattoo";
import Runegraft from "../pages/runegraft/Runegraft";


const Pages = () => {
  const [globalProfile, setGlobalProfile] = useState(selectedProfile());
  const [profile, setProfile] = useState(loadSettings(globalProfile));
  const [lang, setLang] = useState(profile.language);

  useEffect(() => {
    console.log(`Loading profile: ${globalProfile}, lang: ${lang}`)
    let savedSettings = loadSettings(globalProfile);
    setProfile(savedSettings);
  }, [globalProfile, lang]);

  return (
    <ProfileContext.Provider value={{ globalProfile, setGlobalProfile, lang, setLang }}>
      <Routes>
        <Route path="/" element={<Vendor key={`vendor-${profile.name}-${profile.language}`} />} />
        <Route path="/vendor" element={<Vendor key={`vendor-${profile.name}-${profile.language}`} />} />
        <Route path="/maps" element={<OptimizedMapMods key={`map-${profile.name}-${profile.language}`} />} />
        <Route path="/items-old" element={<MagicItem key={`items-${profile.name}-${profile.language}`} />} />
        <Route path="/items" element={<Item key={`items-${profile.name}-${profile.language}`} />} />
        <Route path="/mapnames" element={<MapNames key={`mapnames-${profile.name}-${profile.language}`} />} />
        <Route path="/flasks" element={<Flasks key={`flask-${profile.name}-${profile.language}`} />} />
        <Route path="/heist" element={<Heist key={`heist-${profile.name}-${profile.language}`} />} />
        <Route path="/expedition" element={<Expedition key={`expedition-${profile.name}-${profile.language}`} />} />
        <Route path="/beast" element={<Beast key={`beast-${profile.name}-${profile.language}`} />} />
        <Route path="/scarab" element={<Scarabs key={`scarab-${profile.name}-${profile.language}`} />} />
        <Route path="/tattoo" element={<Tattoo key={`tattoo-${profile.name}-${profile.language}`} />} />
        <Route path="/runegraft" element={<Runegraft key={`runegraft-${profile.name}-${profile.language}`} />} />
        <Route path="/jewel" element={<Jewel key={`jewel-${profile.name}-${profile.language}`} />} />
      </Routes>
    </ProfileContext.Provider>
  );
}

export default Pages;