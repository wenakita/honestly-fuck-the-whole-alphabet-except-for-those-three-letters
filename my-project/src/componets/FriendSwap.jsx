import { Contract } from "ethers";
import { useWallets } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import FriendTechABI from "../abi/FriendTechABi";
import FriendABI from "../abi/FriendABI";
import { findId } from "../requests/friendCalls";
import { readContract } from "@wagmi/core";
import { useBalance } from "wagmi";
import { config } from "../config";
import { parseEther } from "viem";
function FriendSwap(props) {
  const [input, setInput] = useState("");
  const [recieve, seteRecieve] = useState("0");
  const [alert, setAlert] = useState({ message: null, variant: null });
  const [finalPayAmount, setFinalPayAmount] = useState("");
  const [shouldWrap, setShouldWrap] = useState(true);
  const { shareAddress, price } = props;
  console.log(shareAddress);

  const { ready, user, login, logout, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const w0 = wallets[0];
  const userEthBalance = useBalance({
    address: w0?.address,
  });

  useEffect(() => {
    if (shouldWrap) {
      seteRecieve(Number(price) * Number(input));
    } else {
      seteRecieve(Number(price) * Number(input));
    }
  }, [input]);
  useEffect(() => {
    w0?.getEthersProvider().then(async (provider) => {
      const network = await provider.getNetwork();
      console.log(network.chainId);
      await w0.switchChain(8453);
    });
  }, [w0]);
  useEffect(() => {
    getHoldings();
  }, [w0]);

  async function getHoldings() {
    console.log(user?.wallet?.address);
    const holdings = await findId(user?.wallet?.address);
    console.log(await holdings);
  }

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
      "0xa053f456c2ed11965f57f4940e9443e0d50203e3",
      1
    );

    const receipt = await res.wait();
    console.log(receipt.events);
  };

  async function commenceTx() {
    if (shouldWrap) {
      await wrapToken();
    } else {
      await unwrapToken();
    }
  }

  async function calculateTotalWithGas() {
    try {
      console.log("here");
      const result = await readContract(config, {
        abi: FriendABI,
        address: "0xCF205808Ed36593aa40a44F10c7f7C2F67d4A4d4",
        functionName: "getBuyPriceAfterFee",
        args: [shareAddress, Number(input)],
      });
      const tempTotal = await String(Number(result) / 10 ** 18);
      console.log(tempTotal);
      return tempTotal;
    } catch (error) {
      console.log(error);
    }
  }

  async function wrapToken() {
    const provider = await w0?.getEthersProvider();
    const network = await provider.getNetwork();
    const signer = await provider?.getSigner();
    const address = await signer?.getAddress();
    const finalAmount = await calculateTotalWithGas();
    console.log(finalAmount);
    if (network?.chainId !== 8453) {
      await addNetwork();
    }
    const shareWrapperContract = new Contract(
      "0xbeea45F16D512a01f7E2a3785458D4a7089c8514",
      FriendTechABI,
      signer
    );
    const res = await shareWrapperContract.wrap(
      shareAddress,
      Number(input),
      "0x",
      {
        value: parseEther(finalAmount),
      }
    );

    const receipt = await res.wait();
    console.log(await receipt.events);
  }
  async function unwrapToken() {
    const provider = await w0?.getEthersProvider();
    const network = await provider.getNetwork();
    const signer = await provider?.getSigner();
    const address = await signer?.getAddress();
    const finalAmount = await calculateTotalWithGas();
    console.log(finalAmount);
    if (network?.chainId !== 8453) {
      await addNetwork();
    }
    const shareWrapperContract = new Contract(
      "0xbeea45F16D512a01f7E2a3785458D4a7089c8514",
      FriendTechABI,
      signer
    );
    const res = await shareWrapperContract.unwrap(shareAddress, Number(input));
    const receipt = await res.wait();
    console.log(await receipt.events);
  }

  return (
    <div className="border p-3">
      {alert.message !== null ? (
        <div className="mb-2 mt-3">
          <h3 className={`text-${alert.variant}-500 text-center`}>
            {alert.message}
          </h3>
        </div>
      ) : null}
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
        <input
          type="text"
          className="w-[330px] bg-stone-800 text-white rounded-lg"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
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
        <input
          type="text"
          className="w-[330px] bg-stone-800 text-white rounded-lg"
          value={recieve}
        />
        <div className="flex justify-end">
          <h3 className="text-white text-[10px]">
            {shouldWrap
              ? `ETH balance: ${userEthBalance?.data?.formatted}`
              : `Share Balance ${0}`}
          </h3>
        </div>
        <div className="mt-3 flex justify-center">
          <button
            className="border border-slate-500 bg-black rounded-xl text-white p-3"
            onClick={() => {
              commenceTx();
            }}
          >
            <div className="flex justify-center gap-2">
              <h3>{shouldWrap ? "Mint" : "Burn"}</h3>
              <img
                src={
                  shouldWrap
                    ? "https://i.pinimg.com/originals/49/02/54/4902548424a02117b7913c17d2e379ff.gif"
                    : "https://media3.giphy.com/media/J2awouDsf23R2vo2p5/giphy.gif?cid=6c09b95271qkr9h7zeqhzcchzf0g93pzapi9qzlx1f8ha35c&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=e"
                }
                alt=""
                className="w-5 h-6"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FriendSwap;
