import React, {Suspense, useEffect} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {lazyPages} from "@shared/core/lazyPages";
import {Poe1Layout} from "./Poe1Layout";

const {page, preload} = lazyPages();

const PobCodesImport = page(() => import("../pages/import/PobCodesImport"));
const Vendor = page(() => import("../pages/vendor/Vendor"));
const OptimizedMapMods = page(() => import("../pages/maps/OptimizedMapMods"));
const Boat = page(() => import("../pages/boat/Boat"));
const Item = page(() => import("../pages/item/Item"));
const MovedContent = page(() => import("../pages/moved/MovedContent"));
const Heist = page(() => import("../pages/heist/Heist"));
const Expedition = page(() => import("../pages/expedition/Expedition"));
const Beast = page(() => import("../pages/beast/Beast"));
const Scarabs = page(() => import("../pages/scarab/Scarabs"));
const Tattoo = page(() => import("../pages/tattoo/Tattoo"));
const Runegraft = page(() => import("../pages/runegraft/Runegraft"));
const Jewel = page(() => import("../pages/jewel/Jewel"));
const Favorites = page(() => import("../pages/favorites/Favorites"));
const Gems = page(() => import("../pages/gems/Gems"));

export const Poe1Routes = () => {
  // Once the site has rendered, so a click on a page doesn't wait for its code
  useEffect(preload, []);
  return (
    <Suspense fallback={<div className="route-loading" role="status" aria-live="polite">Loading…</div>}>
      <Routes>
      <Route element={<Poe1Layout/>}>
        <Route index element={<Favorites/>}/>
        <Route path="favorites" element={<Favorites/>}/>
        <Route path="vendor" element={<Vendor/>}/>
        <Route path="gems" element={<Gems/>}/>
        <Route path="import-pob-codes" element={<PobCodesImport/>}/>
        <Route path="maps" element={<OptimizedMapMods/>}/>
        <Route path="boat" element={<Boat/>}/>
        <Route path="items" element={<Item/>}/>
        <Route path="flasks" element={
          <MovedContent title="[Moved] Flasks" newPath="/items" linkText="Items"
                        extraInfo="Under the item section, select the flask base you want to craft and then select mods."/>
        }/>
        <Route path="heist" element={<Heist/>}/>
        <Route path="expedition" element={<Expedition/>}/>
        <Route path="beast" element={<Beast/>}/>
        <Route path="scarab" element={<Scarabs/>}/>
        <Route path="tattoo" element={<Tattoo/>}/>
        <Route path="runegraft" element={<Runegraft/>}/>
        <Route path="jewel" element={<Jewel/>}/>
      </Route>

      <Route path="*" element={<Navigate to="/vendor" replace/>}/>
      </Routes>
    </Suspense>
  );
};

export default Poe1Routes;
