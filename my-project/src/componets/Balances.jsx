import { useEffect, useState } from "react";
import { findId } from "../requests/friendCalls";
import { useWallets } from "@privy-io/react-auth";
import { readContract } from "@wagmi/core";
import { config } from "../config";
import FriendTechABi from "../abi/FriendTechABi";
import { uintFormat } from "../formatters/format";
import { Link } from "react-router-dom";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";

function Balances() {
  const [userHoldings, setUserHoldings] = useState([]);
  const [holdingsDataFound, setHoldingsDataFound] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const { wallets } = useWallets();
  const w0 = wallets[0];
  const userAddress = w0?.address;
  useEffect(() => {
    getShareHoldings();
  }, []);

  async function getHoldingData(holdings) {
    const finalHoldings = [];
    for (const key in holdings) {
      const currentAddress = holdings[key].address;
      const current = await fetchContract(currentAddress);
      if (current !== null) {
        finalHoldings.push(current);
      }
    }
    setHoldingsDataFound(finalHoldings);
  }

  async function fetchContract(targetAddress) {
    try {
      const response = await fetch(
        `https://prod-api.kosetto.com/users/${targetAddress}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function getShareHoldings() {
    const userShareHoldings = [];
    const userSharesFound = await findId(userAddress);
    for (const key in userSharesFound) {
      const currentShareId = userSharesFound[key].identifier;
      const currentShareContract = await findShare(currentShareId);
      const currentShareBalance = await getShareBalance(currentShareId);
      userShareHoldings.push({
        id: currentShareId,
        address: currentShareContract,
        balance: currentShareBalance,
      });
    }
    console.log(userShareHoldings.length);
    setUserHoldings(userShareHoldings);
    getHoldingData(userShareHoldings);
  }

  async function getShareBalance(targetId) {
    try {
      const shareBalance = await readContract(config, {
        address: "0xbeea45F16D512a01f7E2a3785458D4a7089c8514",
        abi: FriendTechABi,
        functionName: "balanceOf",
        args: [w0?.address, targetId],
      });
      const balanceResult = await Number(shareBalance);
      return balanceResult;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async function findShare(targetShareId) {
    try {
      const uriResult = await readContract(config, {
        address: "0xbeea45F16D512a01f7E2a3785458D4a7089c8514",
        functionName: "uri",
        abi: FriendTechABi,
        args: [targetShareId],
      });
      const contractFound = await uriResult.slice(28, uriResult.length);
      return contractFound;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return (
    <div className="container">
      <div className="text-[30px] text-center p-5  flex justify-center">
        <img
          src="https://i.ibb.co/ZhgDHGJ/photo-5051187200489794811-y.jpg"
          alt="photo-5051187200489794811-y"
          border="0"
        />
      </div>
      <div className="mt-10">
        <h3 className="text-white flex justify-center font-mono font-bold">
          Your unique deposit address: {w0?.address}
        </h3>
      </div>
      <h3 className="text-white text-center mt-10">Your balances: </h3>

      <div className=" mt-2 flex justify-center">
        {holdingsDataFound.length > 0 ? (
          <div className="">
            {holdingsDataFound.map((item, index) => {
              return (
                <div
                  key={index}
                  className="text-white border border-slate-500 rounded-xl grid grid-cols-4 p-3 mt-3 w-[800px]"
                >
                  <div className="flex justify-start gap-2">
                    <img
                      src={item?.ftPfpUrl}
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                    <h3 className="text-[12px] mt-2">{item?.ftName}</h3>
                  </div>
                  <div className="flex justify-center text-[10px] mt-2">
                    Price: {uintFormat(item?.displayPrice)}
                  </div>
                  <div className="flex justify-center text-[10px] mt-2">
                    Balance: {userHoldings[index].balance}
                  </div>
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/friend/${item?.address}`}
                      className="border border-slate-500 rounded-xl p-2 flex"
                    >
                      <img
                        src="https://i.pinimg.com/originals/49/02/54/4902548424a02117b7913c17d2e379ff.gif"
                        alt=""
                        className="w-7 h-6"
                      />
                      <span className="text-[10px] mt-1">Mint & Burn</span>
                      <img
                        src="https://media0.giphy.com/media/J2awouDsf23R2vo2p5/giphy.gif?cid=6c09b9528hc0btlg9yo7v4fnfa4c0amgumd8n075941rgt12&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=e"
                        alt=""
                        className="w-7 h-6"
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Balances;
