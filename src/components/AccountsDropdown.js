import { useState } from "react";
import "./styles/accountdropdown.css";
import customersList from "../assets/JsonData/customers-list.json";
import OutsideClickHandler from "react-outside-click-handler";
import { v4 as uuidv4 } from "uuid";

const AccountsDropdown = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <OutsideClickHandler onOutsideClick={() => setIsActive(false)}>
      <div className="account-dropdown">
        <div
          className="account-dropdown-btn"
          onClick={() => setIsActive(!isActive)}
        >
          <span>{selected || "select account"}</span>
          <span className={`${isActive && "flip"}`}>
            <i className="bx bx-chevron-down"></i>
          </span>
        </div>
        {isActive && (
          <div className="account-dropdown-content">
            {customersList
              .sort((a, b) => a.email.localeCompare(b.email))
              .map((customer) => {
                const { email } = customer;
                return (
                  <p
                    className="account-dropdown-item"
                    onClick={() => {
                      setSelected(email);
                      setIsActive(false);
                    }}
                    key={uuidv4()}
                  >
                    {email}
                  </p>
                );
              })}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default AccountsDropdown;
