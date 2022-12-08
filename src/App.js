import React from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import Playlist from "./Components/Playlist/Playlist";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
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
