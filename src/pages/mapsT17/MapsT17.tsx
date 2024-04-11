import React from "react";
import '../maps/Maps.css';
import {MapMod} from "../../generated/GeneratedMapMods";
import {getGradientColor} from "../../utils/ColorGradient";
import Header from "../../components/Header";
import {Link} from "react-router-dom";

const MapsT17 = () => {
  return (
    <>
      <Header text={"Map Modifiers T17"}/>
      <p className="warning-banner">
        Moved to be a part of normal map modifiers as part of patch 3.24.1.
        <br/>
        Check out <Link to={"/maps"}> the map section</Link> for rolling.
      </p>
    </>
  );
}

function badMapColor(m: MapMod): string {
  if (m.scary > 480) {
    return "#eab7fc";
  } else {
    return getGradientColor("#FC9090", "#ffffff", (m.scary) / 800);
  }
}


export default MapsT17;
