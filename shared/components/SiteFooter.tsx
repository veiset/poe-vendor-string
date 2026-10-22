import {Link} from "react-router-dom";
import NitroConsentLinks from "@shared/components/ads/NitroConsentLinks";
import "./SiteFooter.css";

// Rendered on every page, which is what NitroPay asks for: the CCPA opt-out has
// to be reachable from the home page as well as the privacy policy.
export const SiteFooter = () => (
  <footer className="site-footer">
    <Link className="site-footer-link" to="/privacy">Privacy policy</Link>
    <NitroConsentLinks/>
  </footer>
);

export default SiteFooter;
