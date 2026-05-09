import React from "react";
import "./FilterCard.css";

export interface FilterCardProps {
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
  wide?: boolean;
  className?: string;
}

const FilterCard = (props: FilterCardProps) => {
  const {title, children, disabled, wide, className} = props;
  const classes = ["filter-card"];
  if (wide) classes.push("filter-card-wide");
  if (className) classes.push(className);
  return (
    <section className={classes.join(" ")} data-disabled={disabled ? "true" : "false"}>
      <header className="filter-card-title">{title}</header>
      <div className="filter-card-body">{children}</div>
    </section>
  );
};

export default FilterCard;
