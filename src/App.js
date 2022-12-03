import React from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import Video from "./Components/Video/Video";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="playlist/:playlistId" element={<Video />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
