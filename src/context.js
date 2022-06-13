import React, { useState, useContext, useCallback } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "user", pass: "test" });
  const [token, setToken] = useState(Cookies.get("GBTOKEN"));
  const [valid, setIsValid] = useState(
    Cookies.get("GBVALID") === "false" || Cookies.get("GBVALID") === undefined
      ? false
      : true
  );
  const [validAccounts, setValidAccounts] = useState([]);

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

        if (response.status === 401) {
          Cookies.set("GBVALID", JSON.parse(false));
          setIsValid(false);

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

  useEffect(() => {
    const fetchValidAccounts = async () => {
      const data = await customFetch(
        "http://137.184.44.121/api/offer/valid-accounts"
      );

      setValidAccounts(data.items);
    };

    fetchValidAccounts();
  }, [customFetch]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        valid,
        customFetch,
        validAccounts,
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
