import React, { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useNavigate } from "react-router-dom";
import { useBalance } from "wagmi";
function Portal() {
  const navigate = useNavigate();
  const {
    login,
    logout,
    ready,
    authenticated,
    user,
    connectWallet,
    linkEmail,
  } = usePrivy();
  const wallet = user?.wallet;
  const address = wallet?.address;
  const userEthBalance = useBalance({
    address: wallet?.address,
  });
  useEffect(() => {
    if (authenticated) {
      console.log(address);
      console.log(userEthBalance?.data?.formatted);
      // const formattedBalance = Number(userEthBalance?.data?.formatted);
      // console.log(formattedBalance);
      // if ()
      navigate("/home");
    }
  });
  return (
    <div className="mt-20">
      <div className="flex justify-center">
        <h3 className="text-white text-[20px]">welcome to the goddog portal</h3>
      </div>
      <div className="flex justify-center gap-2 mt-3">
        <h3 className="text-white text-[20px]">powered by</h3>
        <img
          src="https://auth.privy.io/logos/privy-logo.png"
          alt=""
          className="w-20 h-8"
        />
      </div>
      <div className="flex justify-center mt-10">
        {authenticated && ready ? (
          <button
            className="border border-slate-500 rounded-lg text-white p-2 text-[20px] hover:bg-white hover:text-black"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <button
            className="border border-slate-500 rounded-lg text-white p-2 text-[20px] hover:bg-white hover:text-black"
            onClick={login}
          >
            Privy Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Portal;
