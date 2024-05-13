import { usePrivy } from "@privy-io/react-auth";
import { readContract } from "@wagmi/core";
import { useEffect, useState } from "react";
import { getBalance } from "@wagmi/core";
import friendTechABI from "../abi/FriendTechABi";
import { config } from "../config";
import { findId } from "../requests/friendCalls";
function FriendSwap(props) {
  const { shareAddress } = props;
  console.log(shareAddress);
  const { user } = usePrivy();
  const wallet = user?.wallet;

  const [shouldWrap, setShouldWrap] = useState(true);
  const [balance, setBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);

  useEffect(() => {
    getShareId();
  });

  async function getShareId() {
    const ethBalance = await getBalance(config, {
      address: wallet?.address,
    });
    setEthBalance(Number(ethBalance?.formatted));

    const sharesFound = await findId(wallet?.address);
    for (const key in sharesFound) {
      const result = await readContract(config, {
        address: "0xbeea45F16D512a01f7E2a3785458D4a7089c8514",
        abi: friendTechABI,
        functionName: "uri",
        //userAddress and FriendTech token id
        args: [sharesFound[key].identifier],
      });
      const currentCa = result.slice(28, result.length);
      if (currentCa === shareAddress) {
        const balanceResult = await readContract(config, {
          address: "0xbeea45F16D512a01f7E2a3785458D4a7089c8514",
          abi: friendTechABI,
          functionName: "balanceOfBatch",
          //userAddress and FriendTech token id
          args: [[wallet?.address], [sharesFound[key].identifier]],
        });
        setBalance(Number(balanceResult));
      }
    }
  }

  return (
    <div className="border border-slate-500 p-3">
      <h3 className="text-white p-2">Swap now</h3>
      <div className="grid grid-flow-row gap-2 mb-5">
        <input
          type="text"
          className="bg-stone-800 p-1.5 rounded-lg"
          placeholder="swap target goes here"
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
          className="bg-stone-800 p-1.5 rounded-lg"
          placeholder="received amount goes heres"
        />
        <div className="flex justify-end text-white text-[10px]">
          {shouldWrap ? (
            <>{balance ? `Share Balance: ${balance}` : `Share Balance: 0`}</>
          ) : (
            <>
              {ethBalance
                ? `Eth Balance: ${ethBalance.toFixed(3)}`
                : `Eth Balance: 0`}
            </>
          )}
        </div>
        <div className="flex justify-center mt-2">
          {shouldWrap ? (
            <button className="border border-slate-500 bg-black text-white p-2 rounded-lg">
              Mint
            </button>
          ) : (
            <button className="border border-slate-500 bg-black text-white p-2 rounded-lg">
              Burn
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendSwap;
