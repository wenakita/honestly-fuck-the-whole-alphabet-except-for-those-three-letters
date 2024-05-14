import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import { usePrivy } from "@privy-io/react-auth";
function Layout() {
  const { authenticated, user } = usePrivy();
  const wallet = user?.wallet;
  return (
    <div className="container">
      <div className="flex justify-center">
        <NavBar />
      </div>
      {authenticated && wallet ? (
        <div className="flex justify-center p-3">
          <SearchBar />
        </div>
      ) : null}
      <div className="mb-20">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
