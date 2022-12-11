import React from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import Playlist from "./Components/Playlist/Playlist";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeContext } from "./Context/ThemeContext";

function App() {
  const { theme } = React.useContext(ThemeContext);

  return (
    <div className={`theme-${theme}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="playlist/:playlistId" element={<Playlist />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
