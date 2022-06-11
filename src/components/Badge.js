import React from "react";
import "./styles/badge.css";

const Badge = ({ type }) => {
  return (
    <div className={`badge badge-${type === "goat_consigned" ? "yes" : "no"}`}>
      {type === "goat_consigned" ? (
        <i className="bx bx-check"></i>
      ) : (
        <i className="bx bx-x"></i>
      )}
    </div>
  );
};

export default Badge;
