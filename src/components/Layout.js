import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CreateOffers from "../pages/CreateOffers";
import Topnav from "../components/Topnav";
import Accounts from "../pages/Accounts";
import { useSelector, useDispatch } from "react-redux";
import ThemeAction from "../redux/actions/ThemeAction";
import History from "../pages/History";
import OutstandingOffers from "../pages/OutstandingOffers";
import Storage from "../pages/Storage";
import { ToastContainer } from "react-toastify";
import Notifications from "../pages/Notifications";
import AOS from "aos";

import "aos/dist/aos.css";
import "./styles/layout.css";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode", "theme-mode-light");

    const colorClass = localStorage.getItem("colorMode", "theme-mode-light");

    dispatch(ThemeAction.setMode(themeClass));

    dispatch(ThemeAction.setColor(colorClass));
  }, [dispatch]);

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 200,
    });
  }, []);

  return (
    <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
      <Router>
        <Sidebar />
        <div className="layout__content">
          <Topnav />
          <div className="layout__content-main">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create-offers" element={<CreateOffers />} />
              <Route path="/history" element={<History />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/current-storage" element={<Storage />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route
                path="/outstanding-offers"
                element={<OutstandingOffers />}
              />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </Router>
    </div>
  );
};

export default Layout;
