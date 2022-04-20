import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./components/Layout";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers/";
import { AppProvider } from "./context";

import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/myGrid.css";
import "./assets/css/theme.css";
import "./assets/css/index.css";

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <Provider store={store}>
      <React.StrictMode>
        <Layout />
      </React.StrictMode>
    </Provider>
  </AppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
