import React from "react";
import "./styles/badge.css";

const Badge = ({ type }) => {
  return (
    <div className={`badge badge-${type ? "yes" : "no"}`}>
      {type ? <i className="bx bx-check"></i> : <i className="bx bx-x"></i>}
    </div>
  );
};

export default Badge;
