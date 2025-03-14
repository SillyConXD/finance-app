import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoutes from "./Routes"; // Изменено с AppRouters на Routes
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./AppContext"; // Изменено с AppContext на AppProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider> {/* Изменено с <AppContext.Provider> на <AppProvider> */}
      <AppRoutes /> {/* Изменено с <Routes /> на <AppRoutes /> */}
    </AppProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
