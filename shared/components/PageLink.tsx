import {Link} from "react-router-dom";

export interface PageLinkProps {
  text: string;
  icon: string;
  route: string;
  currentPage: string;
}

export const PageLink = ({text, icon, route, currentPage}: PageLinkProps) => {
  const classes = route === currentPage ? "page-link page-link-current" : "page-link";
  return (
    <div className={classes}>
      <Link to={route}>
        <img alt={`${text}-icon`} className="page-link-icon" src={icon}/>
        {text}
      </Link>
    </div>
  );
};
