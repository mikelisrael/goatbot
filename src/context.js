import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "user", pass: "test" });
  const [showAlert, setShowAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const displayAlert = (show = "false", msg, type) =>
    setShowAlert({ show, msg, type });

  return (
    <AppContext.Provider value={{ showAlert, displayAlert, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
