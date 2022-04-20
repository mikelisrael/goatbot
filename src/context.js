import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const displayAlert = (show = "false", msg, type) =>
    setShowAlert({ show, msg, type });

  return (
    <AppContext.Provider value={{ showAlert, displayAlert }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
