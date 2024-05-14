import { Contract } from "ethers";
import { useWallets } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import FriendTechABI from "../abi/FriendTechABi";
function FriendSwap(props) {
  const { shareAddress } = props;

  const { ready, user, login, logout, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const w0 = wallets[0];

  useEffect(() => {
    w0?.getEthersProvider().then(async (provider) => {
      const network = await provider.getNetwork();
      console.log(network.chainId);
      await w0.switchChain(8453);
    });
  }, [w0]);
  const walletAddress = user?.wallet?.address;

  const testTransaction = async () => {
    const provider = await w0?.getEthersProvider();
    const network = await provider.getNetwork();
    const signer = await provider?.getSigner();
    const address = await signer?.getAddress();

    const shareWrapperContract = new Contract(
      "0xbeea45F16D512a01f7E2a3785458D4a7089c8514",
      FriendTechABI,
      signer
    );
    const res = await shareWrapperContract.unwrap(
      "0x19d509ab2f0c352a31f638b22d406e07f77fd22c",
      1
    );
    const receipt = await res.wait();
    console.log(receipt.events);
  };
  return (
    <div>
      <h3 className="text-white">hello</h3>
      <button
        className="border border-slate-500 bg-green-500 text-white"
        onClick={testTransaction}
      >
        Test TX
      </button>
    </div>
  );
}

export default FriendSwap;
