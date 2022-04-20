import React from "react";
import "./styles/statuscard.css";

const StatusCard = ({ icon, count, title }) => {
  return (
    <article className="status-card">
      <div className="status-card__icon">
        <i className={icon}></i>
      </div>
      <div className="status-card__info">
        <h4>{count}</h4>
        <span>{title}</span>
      </div>
    </article>
  );
};

export default StatusCard;
