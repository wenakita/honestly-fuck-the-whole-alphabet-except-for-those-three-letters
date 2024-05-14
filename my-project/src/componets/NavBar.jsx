import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function NavBar() {
  const navigate = useNavigate();
  const { logout, authenticated, user } = usePrivy();
  const wallet = user?.wallet;
  const address = wallet?.address;
  useEffect(() => {
    if (!authenticated && !wallet) {
      navigate("/");
    }
  }, [authenticated, wallet]);
  return (
    <div
      className={`w-[450px] border border-slate-500 p-2 rounded-xl text-[10px] ${authenticated && wallet ? "flex justify-between" : null}`}
    >
      <img
        src="https://dd.dexscreener.com/ds-data/tokens/base/0xddf7d080c82b8048baae54e376a3406572429b4e.png?size=lg&key=18ea46"
        alt=""
        className="w-10 h-10 mt-2"
      />
      {authenticated && wallet ? (
        <>
          <Link to="/home" className="text-white text-center p-5 font-bold">
            FriendTool
          </Link>

          <h3 className="text-white text-center p-5 font-bold">Deposit</h3>

          <h3 className="text-white text-center p-5 font-bold">Balance</h3>

          <button
            className="text-white p-5 h-[52px]  mt-1 border border-slate-500 rounded-xl"
            onClick={logout}
          >
            Logout
          </button>
        </>
      ) : null}
    </div>
  );
}

export default NavBar;
