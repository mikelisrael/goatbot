import { useRef, useState } from "react";
import sidebar_items from "../assets/JsonData/sidebar_routes.json";
import { Link, useLocation } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";

import "./styles/sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const [showSideLabels, setshowSideLabels] = useState(true);
  const sidebarRef = useRef(null);

  const showLabels = () => {
    if (showSideLabels) {
      sidebarRef.current.classList.add("sidebar_extend");
    }
    if (!showSideLabels) {
      sidebarRef.current.classList.remove("sidebar_extend");
    }
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        sidebarRef.current.classList.remove("sidebar_extend");
        setshowSideLabels(true);
      }}
    >
      <aside className="sidebar" ref={sidebarRef}>
        <div className="sidebar__top">
          <div className="sidebar__logo">GoatBot</div>
          <div className="sidebar__logo2">
            <i
              className="bx bx-menu"
              onClick={() => {
                showLabels();
                setshowSideLabels(!showSideLabels);
              }}
            ></i>
          </div>
        </div>
        {sidebar_items.map((item, index) => {
          return (
            <Link to={item.route} key={index}>
              <div
                className="sidebar_item"
                onClick={() => {
                  sidebarRef.current.classList.remove("sidebar_extend");
                  setshowSideLabels(true);
                }}
              >
                <div
                  className={`sidebar__item-inner ${
                    location.pathname === item.route && "active"
                  }`}
                >
                  <i className={item.icon}></i>
                  <span className={`${showSideLabels ? "" : "active"}`}>
                    {item.display_name}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
        <div className="sidebar__item-inner">
          <i className="bx bx-log-out-circle bx-rotate-180"></i>
          <span className={`${showSideLabels ? "" : "active"}`}>log out</span>
        </div>
      </aside>
    </OutsideClickHandler>
  );
};

export default Sidebar;
