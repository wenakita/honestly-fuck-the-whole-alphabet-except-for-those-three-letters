import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
function Layout() {
  return (
    <div className="container">
      <div>
        <NavBar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
