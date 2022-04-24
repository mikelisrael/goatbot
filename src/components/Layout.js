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
import "./styles/layout.css";

const Layout = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode", "theme-mode-light");

    const colorClass = localStorage.getItem("colorMode", "theme-mode-light");

    dispatch(ThemeAction.setMode(themeClass));

    dispatch(ThemeAction.setColor(colorClass));
  }, [dispatch]);

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
              <Route
                path="/outstanding-offers"
                element={<OutstandingOffers />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default Layout;
