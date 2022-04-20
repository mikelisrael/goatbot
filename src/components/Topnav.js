import React from "react";
import Dropdown from "./Dropdown";
import notifications from "../assets/JsonData/notification.json";
import { Link } from "react-router-dom";
import userMenu from "../assets/JsonData/user_menus.json";
import userImage from "../assets/images/cat.png";
import ThemeMenu from "./ThemeMenu";
import "./styles/topnav.css";

const currentUser = {
  name: "Rycao",
  image: userImage,
};

const renderNotificationItem = (item, index) => {
  return (
    <div className="notification-item" key={index}>
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  );
};

const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img src={user.image} alt={user.name} />
    </div>
    <div className="topnav__right-user__name">{user.name}</div>
  </div>
);

const renderUserMenu = (item, index) => {
  return (
    <Link to="/" key={index}>
      <div className="notification-item">
        <i className={item.icon}></i>
        <span>{item.content}</span>
      </div>
    </Link>
  );
};

const Topnav = () => {
  return (
    <div className="topnav">
      <div className="topnav__right">
        <div className="topnav__right-item">
          <Dropdown
            customToggle={() => renderUserToggle(currentUser)}
            contentData={userMenu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
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
