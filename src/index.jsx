import "./index.css";
import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";
import { worker } from "./mocks/browser";

// // 개발 환경에서만 MSW 시작
if (import.meta.env.NODE_ENV === "development") {
  worker.start({
    onUnhandledRequest: "bypass",
  });
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
