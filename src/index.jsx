import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

if (import.meta.env.MODE === "development") {
  import("./mocks/browsers").then(({ worker }) => {
    worker.start({
      onUnhandledRequest: "bypass",
    });
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
