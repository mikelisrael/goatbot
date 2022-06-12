import React, { useState, useContext, useCallback } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "user", pass: "test" });
  const [token, setToken] = useState(Cookies.get("GBTOKEN"));
  const [valid, setIsValid] = useState(
    Cookies.get("GBVALID") === "false" || Cookies.get("GBVALID") === undefined
      ? false
      : true
  );

  // custom fetch function
  const customFetch = useCallback(
    async (url, options) => {
      try {
        const response = await (options
          ? fetch(url, options)
          : fetch(url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }));

        const data = await response.json();

        if (response.status === 401 || response.status === 400) {
          Cookies.set("GBVALID", JSON.parse(false));
          setIsValid(false);

          if (response.status === 400) {
            toast.error("connection error");
          }
          // toast.warn("Session timeout", );
        } else {
          Cookies.set("GBVALID", JSON.parse(true));
          setIsValid(true);
          return data;
        }
      } catch (error) {
        toast.warn("Check your connection");
      }
    },
    [token]
  );

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        valid,
        customFetch,
      }}
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
