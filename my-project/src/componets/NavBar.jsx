import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
      className={`border border-slate-500 p-2 text-[10px] ${authenticated && wallet ? "flex justify-between" : null}`}
    >
      <img
        src="https://dd.dexscreener.com/ds-data/tokens/base/0xddf7d080c82b8048baae54e376a3406572429b4e.png?size=lg&key=18ea46"
        alt=""
        className="w-16 h-16"
      />
      {authenticated && wallet ? (
        <>
          <h3 className="text-white text-center p-5 font-bold">FriendTool</h3>
          <h3 className="text-white text-center p-5 font-bold">Uniswap</h3>
          <h3 className="text-white text-center p-5 font-bold">Balance</h3>

          <button
            className="text-white p-5 font-bold border border-slate-500 text-[10px] rounded-full w-[200px] overflow-hidden"
            onClick={logout}
          >
            {address}
          </button>
        </>
      ) : null}
    </div>
  );
}

export default NavBar;
