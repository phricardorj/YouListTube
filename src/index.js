import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeStorage } from "./Context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeStorage>
      <App />
    </ThemeStorage>
  </React.StrictMode>
);
