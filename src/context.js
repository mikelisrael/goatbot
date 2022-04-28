import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "user", pass: "test" });
  // const [showAlert, setShowAlert] = useState({
  //   show: false,
  //   msg: "",
  //   type: "",
  // });
  // const displayAlert = (show = "false", msg, type) =>
  //     setShowAlert({ show, msg, type });

  const toastOptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    className: "myToasts",
  };

  return (
    <AppContext.Provider value={{ user, setUser, toastOptions }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
