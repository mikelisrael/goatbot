import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const getLocalStorage = () => {
  let token = localStorage.getItem("GBTOKEN");
  if (token) {
    return token;
  } else {
    return null;
  }
};

const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "user", pass: "test" });
  const [token, setToken] = useState(getLocalStorage());

  const toastOptions = {
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "myToasts",
  };

  return (
    <AppContext.Provider
      value={{ user, setUser, toastOptions, token, setToken }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
