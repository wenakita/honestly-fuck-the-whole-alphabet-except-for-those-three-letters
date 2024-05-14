import { Contract } from "ethers";
import { useWallets } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import FriendTechABI from "../abi/FriendTechABi";
function FriendSwap(props) {
  const [shouldWrap, setShouldWrap] = useState(true);
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

  async function addNetwork() {
    console.info("Adding network");
    const provider = await w0?.getEthersProvider();
    //Request to add Inco chain
    await provider?.send("wallet_addEthereumChain", [
      {
        chainId: "0x2105", //9090
        chainName: "Base",
        nativeCurrency: {
          name: "Ethereum",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://base.llamarpc.com"],
        blockExplorerUrls: ["https://basescan.org/"],
      },
    ]);
  }

  const testTransaction = async () => {
    const provider = await w0?.getEthersProvider();
    const network = await provider.getNetwork();
    const signer = await provider?.getSigner();
    const address = await signer?.getAddress();
    if (network?.chainId !== 8453) {
      await addNetwork();
    }

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
    <div className="border p-3">
      <h3 className="text-white">
        {shouldWrap ? "Mint Shares" : "Burn Shares"}
      </h3>
      <button
        className="border border-slate-500 bg-green-500 text-white"
        onClick={testTransaction}
      >
        Test TX
      </button>
      <div className="grid grid-flow-row gap-2">
        <input type="text" className="w-[330px] bg-stone-500 rounded-lg" />
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (shouldWrap) {
                setShouldWrap(false);
              } else {
                setShouldWrap(true);
              }
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
                fill="white"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <input type="text" className="w-[330px] bg-stone-500 rounded-lg" />
        <div className="flex justify-end">
          <h3 className="text-white text-[10px]">
            {shouldWrap ? `ETH balance` : `Share Balance`}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default FriendSwap;
