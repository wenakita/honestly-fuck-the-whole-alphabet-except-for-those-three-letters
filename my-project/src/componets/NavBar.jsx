import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function NavBar() {
  const [oooPrice, setOooPrice] = useState(null);
  const navigate = useNavigate();
  const { logout, authenticated, user, ready } = usePrivy();
  const wallet = user?.wallet;
  const address = wallet?.address;
  useEffect(() => {
    if (!authenticated && !wallet) {
      navigate("/");
    }
  }, [authenticated, wallet]);
  useEffect(() => {
    fetch(
      "https://api.dexscreener.com/latest/dex/pairs/base/0x25E2DAe20f0b251a4cCF5AC1ff04C9A24E7c0140"
    )
      .then(async function (results) {
        const response = await results.json();
        return response;
      })
      .then(function (data) {
        setOooPrice(data.pairs[0].priceUsd);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  return (
    <div
      className={`w-[440px] border border-slate-500 p-2 rounded-xl text-[9px] ${authenticated && wallet ? "flex justify-between" : null}`}
    >
      {authenticated && ready ? (
        <>
          <Link
            to={
              "https://app.uniswap.org/swap?outputCurrency=0xDDf7d080C82b8048BAAe54e376a3406572429b4e&chain=base"
            }
            target="_blank"
            className="flex justify-center p-5 gap-2"
          >
            <img
              src="https://dd.dexscreener.com/ds-data/tokens/base/0xddf7d080c82b8048baae54e376a3406572429b4e.png?size=lg&key=18ea46"
              alt=""
              className="w-8 h-8"
            />
            <h3 className="text-white mt-2 text-[10px]">{oooPrice}</h3>
          </Link>

          <Link
            to="/home"
            className="text-white text-center p-5 mt-2 font-bold"
          >
            Home
          </Link>

          <Link
            to={"/balances"}
            className="text-white text-center p-5 mt-2 font-bold"
          >
            Balance
          </Link>

          <h3 className="text-white text-center p-5 mt-2 font-bold">Swap</h3>

          <div className="grid grid-flow-row me-3">
            <button
              className="text-white p-2 h-[30px]  mt-[19.5px] border border-slate-500 rounded-xl"
              onClick={logout}
            >
              <div>Logout</div>
            </button>
            <div className="text-white text-center">
              {address.slice(0, 3) +
                "..." +
                address.slice(address.length - 3, address.length)}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default NavBar;
