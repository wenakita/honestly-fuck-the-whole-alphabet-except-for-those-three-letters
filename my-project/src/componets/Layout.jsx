import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import { usePrivy } from "@privy-io/react-auth";
function Layout() {
  const { authenticated, user } = usePrivy();
  const wallet = user?.wallet;
  return (
    <div className="container">
      <div>
        <NavBar />
      </div>
      {authenticated && wallet ? (
        <div className="flex justify-center p-3">
          <SearchBar />
        </div>
      ) : null}
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
