import React from "react";
import Header from "@poe/components/Header";
import { Link } from "react-router-dom";
import "./MovedContent.css";

type MovedContentProps = {
  title: string;
  newPath: string;
  linkText: string;
  extraInfo?: string;
}

const MovedContent = ({ title, newPath, linkText, extraInfo }: MovedContentProps) => {
  return (
    <>
      <Header text={title} />
      <div>
        <p className="moved-content">
          This content has moved and is now a part of <span className="moved-link"><Link to={newPath}>{linkText}</Link></span>.
        </p>
        {extraInfo && <p className="moved-content-extra"> {extraInfo}</p>}
      </div>
    </>
  );
}

export default MovedContent;