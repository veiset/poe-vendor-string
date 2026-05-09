import React from "react";
import "./FilterCard.css";

export interface FilterCardProps {
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  headerControl?: React.ReactNode;
}

const FilterCard = (props: FilterCardProps) => {
  const {title, children, disabled, className, headerControl} = props;
  const classes = ["filter-card"];
  if (className) classes.push(className);
  return (
    <section className={classes.join(" ")} data-disabled={disabled ? "true" : "false"}>
      <header className="filter-card-title">
        <span className="filter-card-title-text">{title}</span>
        <span className="filter-card-title-divider"/>
        {headerControl && <div className="filter-card-title-control">{headerControl}</div>}
      </header>
      <div className="filter-card-body">{children}</div>
    </section>
  );
};

export default FilterCard;
