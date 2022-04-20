import React from "react";
import "./styles/badge.css";

const Badge = ({ content, type }) => {
  return <div className={`badge badge-${type}`}>{content}</div>;
};

export default Badge;
