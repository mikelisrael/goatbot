import React, { useState } from "react";
import "./styles/accountdropdown.css";
import OutsideClickHandler from "react-outside-click-handler";
import { v4 as uuidv4 } from "uuid";
import { useGlobalContext } from "../context";

const AccountsDropdown = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);
  const { validAccounts } = useGlobalContext();

  return (
    <OutsideClickHandler onOutsideClick={() => setIsActive(false)}>
      <div className="account-dropdown">
        <div
          className="account-dropdown-btn"
          onClick={() => setIsActive(!isActive)}
        >
          <span>{selected.email || "Select Account"}</span>
          <span className={`${isActive && "flip"}`}>
            <i className="bx bx-chevron-down"></i>
          </span>
        </div>
        {isActive && (
          <div className="account-dropdown-content" data-aos="fade-up">
            {validAccounts
              .sort((a, b) => a.email.localeCompare(b.email))
              .map((account) => {
                const { userId, email } = account;
                return (
                  <p
                    className="account-dropdown-item"
                    onClick={() => {
                      setSelected({ email, userId });
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

export default React.memo(AccountsDropdown);
