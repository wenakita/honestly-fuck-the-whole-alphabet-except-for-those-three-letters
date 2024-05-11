import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
function Layout() {
  return (
    <div className="">
      <div>
        <NavBar />
      </div>
      <div className="flex justify-center p-3">
        <SearchBar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
