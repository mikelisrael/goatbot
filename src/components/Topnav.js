import React from "react";
import Dropdown from "./Dropdown";
import notifications from "../assets/JsonData/notification.json";
import { Link } from "react-router-dom";
// import userMenu from "../assets/JsonData/user_menus.json";
// import userImage from "../assets/images/cat.png";
import ThemeMenu from "./ThemeMenu";
import "./styles/topnav.css";

const renderNotificationItem = (item, index) => {
  return (
    <div className="notification-item" key={index}>
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  );
};

const Topnav = () => {
  return (
    <div className="topnav">
      <div className="topnav__right">
        <div className="topnav__right-item">
          <Dropdown
            icon="bx bx-bell"
            badge="5"
            contentData={notifications}
            renderItems={renderNotificationItem}
            renderFooter={() => <Link to="/">View All</Link>}
          />
        </div>
        <div className="topnav__right-item">
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
