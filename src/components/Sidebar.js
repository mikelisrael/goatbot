import { useState } from "react";
import sidebar_items from "../assets/JsonData/sidebar_routes.json";
import { Link } from "react-router-dom";
import "./styles/sidebar.css";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">GoatBot</div>
      {sidebar_items.map((item, index) => {
        return (
          <Link to={item.route} key={index}>
            <div className="sidebar_item" onClick={() => setActiveItem(index)}>
              <div
                className={`sidebar__item-inner ${
                  activeItem === index && "active"
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
