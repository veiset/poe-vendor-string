import "./Header.css";
import type {ReactNode} from "react";

interface PageHeaderProps {
  text: string;
  children: ReactNode;
}

export const PageHeader = ({text, children}: PageHeaderProps) => (
  <div className="page-header-container">
    <h1 className="page-header">{text} Regex</h1>
    <div className="page-header-profile">{children}</div>
  </div>
);
