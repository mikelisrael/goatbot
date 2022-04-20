import sidebar_items from "../assets/JsonData/sidebar_routes.json";
import { Link, useLocation } from "react-router-dom";
import "./styles/sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">GoatBot</div>
      {sidebar_items.map((item, index) => {
        return (
          <Link to={item.route} key={index}>
            <div className="sidebar_item">
              <div
                className={`sidebar__item-inner ${
                  location.pathname === item.route && "active"
                }`}
              >
                <i className={item.icon}></i>
                <span>{item.display_name}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </aside>
  );
};

export default Sidebar;
