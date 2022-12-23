import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeStorage } from "./Context/ThemeContext";
import { WatchedStorage } from "./Context/WatchedContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WatchedStorage>
      <ThemeStorage>
        <App />
      </ThemeStorage>
    </WatchedStorage>
  </React.StrictMode>
);
