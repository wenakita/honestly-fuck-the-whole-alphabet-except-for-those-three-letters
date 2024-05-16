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
        <img
          src="https://ivory-accurate-pig-375.mypinata.cloud/ipfs/QmNfe9547vPVgd8qqdCFeH81yHos1n1CoQZu1D9n5Nrjvp?pinataGatewayToken=DdSIfjJJunjBBaGpRA4VE7rw9Q3bNil3avaM8VrHQkPRh_2vaSMuwGFYGbn9Xzt2"
          alt=""
          style={{ maxWidth: "80%" }}
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
