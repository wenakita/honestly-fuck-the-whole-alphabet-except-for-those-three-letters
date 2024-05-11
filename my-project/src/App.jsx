import React from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./componets/Layout";
import Portal from "./componets/Portal";
import Home from "./componets/Home";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Portal />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
