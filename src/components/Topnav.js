import { useRef, useEffect } from "react";
import Dropdown from "./Dropdown";
import notifications from "../assets/JsonData/notification.json";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import Alert from "./Alert";
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
  const refreshBtnRef = useRef(null);
  const { showAlert, displayAlert } = useGlobalContext();

  const refreshClick = () => {
    const endTimeout = new Date();
    endTimeout.setMinutes(endTimeout.getMinutes() + 60);
    localStorage.setItem("refreshAfter__", endTimeout.toUTCString());
  };

  const displayRefreshClick = () => {
    const timed = localStorage.getItem("refreshAfter__");
    if (!timed) return true;
    return new Date() > new Date(timed);
  };

  useEffect(() => {
    displayRefreshClick() && refreshBtnRef.current.classList.remove("hide");
  }, []);

  const hideShowRefresh = () => {
    refreshBtnRef.current.classList.add("hide");
    displayAlert(true, "syncing systems", "success");
    refreshClick();
  };

  return (
    <div className="topnav">
      <div className="topnav__right">
        <div className="topnav__right-item">
          <div
            className="refresh-btn hide"
            ref={refreshBtnRef}
            onClick={hideShowRefresh}
            title="Syns Systems"
          >
            <i className="bx bx-refresh"></i>
          </div>
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

      {showAlert.show && <Alert {...showAlert} removeAlert={displayAlert} />}
    </div>
  );
};

export default Topnav;
