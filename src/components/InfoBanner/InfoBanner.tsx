import {Children, ReactNode} from "react";
import "./InfoBanner.css"

interface InfoBannerProps {
  children: ReactNode | ReactNode[];
}

export default function InfoBanner({children}: InfoBannerProps) {

  return <div className="infobanner">{children}</div>
}
