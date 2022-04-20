import { useEffect } from "react";
import "./styles/alert.css";

const Alert = ({ msg, type, removeAlert, list }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert();
    }, 3000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [list, removeAlert]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
