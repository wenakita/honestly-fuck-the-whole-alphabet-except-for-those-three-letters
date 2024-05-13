import { usePrivy } from "@privy-io/react-auth";
import { readContract } from "@wagmi/core";
import { writeContract } from "@wagmi/core";
import { useEffect, useState } from "react";
import { getBalance } from "@wagmi/core";
import friendTechABI from "../abi/FriendTechABi";
import FriendABI from "../abi/FriendABI";
import { config } from "../config";
import { findId } from "../requests/friendCalls";
import { uintFormat } from "../formatters/format";
import { parseEther } from "viem";
function FriendSwap(props) {
  const { shareAddress, price } = props;
  const { user } = usePrivy();
  const wallet = user?.wallet;

  const [shouldWrap, setShouldWrap] = useState(true);
  const [balance, setBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [input, setInput] = useState("");
  const [receivedValue, setReceivedValue] = useState("0");
  const [alerts, setAlert] = useState({ message: null, variant: null });

  useEffect(() => {
    getShareId();
  });

  useEffect(() => {
    if (shouldWrap) {
      const receive = price * Number(input);
      setReceivedValue(receive);
    } else {
      const receive = price * Number(input);
      setReceivedValue(receive);
    }
  }, [input]);
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

  async function commenceTransaction() {
    if (isNaN(Number(input))) {
      setAlert({
        message: "Input must be in numeric form",
        variant: "red",
      });
    } else {
      setAlert({
        message: null,
        variant: null,
      });

      if (shouldWrap) {
        wrapShares();
      } else {
        unwrapShares();
      }
    }
  }

  async function wrapShares() {
    console.log("wrapping");
    const finalAmountPlusFees = await readContract(config, {
      address: "0xCF205808Ed36593aa40a44F10c7f7C2F67d4A4d4",
      abi: FriendABI,
      functionName: "getBuyPriceAfterFee",
      args: [shareAddress, Number(input)],
    });
    const formattedFinalAmount = String(await uintFormat(finalAmountPlusFees));
    console.log(formattedFinalAmount);
    const wrapResults = writeContract(config, {
      address: "0xbeea45F16D512a01f7E2a3785458D4a7089c8514",
      abi: friendTechABI,
      functionName: "wrap",
      args: [shareAddress, Number(input), "0x"],
      value: parseEther(formattedFinalAmount),
      onSuccess(data) {
        console.log(data);
        setAlert({ message: "Wrap SuccessFul", variant: "green" });
      },
      onError(error) {
        console.log(error);
        setAlert({ message: "Wrap Not Successful", variant: "red" });
      },
    });
    await wrapResults;
  }
  async function unwrapShares() {
    console.log("unwrappping");
    const unwrapResults = writeContract(config, {
      address: "0xbeea45F16D512a01f7E2a3785458D4a7089c8514",
      abi: friendTechABI,
      functionName: "unwrap",
      args: [shareAddress, Number(input)],
      onSuccess(data) {
        console.log(data);
        setAlert({ message: "Unwrap SuccessFul", variant: "green" });
      },
      onError(error) {
        console.log(error);
        setAlert({ message: "Unwrap Not Successful", variant: "red" });
      },
    });
    await unwrapResults;
  }

  return (
    <div className="border border-slate-500 rounded-xl p-5 mt-2">
      {alerts.message !== null ? (
        <div className={`flex justify-center mt-4 text-${alerts.variant}-500`}>
          {alerts.message}
        </div>
      ) : null}
      <h3 className="text-white p-2">Swap now</h3>
      <div className="grid grid-flow-row gap-2 mb-5 mt-3">
        {shouldWrap ? (
          <h3 className="text-[12px] text-white ms-2">Buy</h3>
        ) : (
          <h3 className="text-[12px] text-white ms-2">Sell</h3>
        )}
        <input
          type="text"
          className="bg-stone-800 p-1.5 rounded-lg text-white"
          placeholder="swap target goes here"
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
        {shouldWrap ? (
          <h3 className="text-[12px] text-white ms-2">ETH Value</h3>
        ) : (
          <h3 className="text-[12px] text-white ms-2">ETH Received</h3>
        )}
        <input
          type="text"
          className="bg-stone-800 p-1.5 rounded-lg text-white"
          placeholder="received amount goes heres"
          disabled={true}
          value={receivedValue}
        />
        <div className="flex justify-end text-white text-[10px]">
          {shouldWrap ? (
            <>
              {ethBalance
                ? `Eth Balance: ${ethBalance.toFixed(3)}`
                : `Eth Balance: 0`}
            </>
          ) : (
            <>{balance ? `Share Balance: ${balance}` : `Share Balance: 0`}</>
          )}
        </div>
        <div className="flex justify-center mt-2">
          {shouldWrap ? (
            <button
              className="border border-slate-500 bg-black text-white p-2 rounded-lg"
              onClick={() => {
                commenceTransaction();
              }}
            >
              Mint
            </button>
          ) : (
            <button
              className="border border-slate-500 bg-black text-white p-2 rounded-lg"
              onClick={() => {
                commenceTransaction();
              }}
            >
              Burn
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendSwap;
