import React, { useState, useEffect } from "react";
import { Quoter } from "sudo-defined-quoter";
import { ethers } from "ethers";
import { readContract } from "@wagmi/core";
import friendTechABI from "../abi/FriendTechABi";
import { config } from "../config";
import { uintFormat } from "../formatters/format";
const API_KEY = import.meta.env.VITE_DEFINED_KEY;
const friendWrapperContract = "0xbeea45F16D512a01f7E2a3785458D4a7089c8514";
function FriendTechPools() {
  const [poolsData, setPoolsData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    getExistingPools();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, [2000]);
  }, []);

  async function getExistingPools() {
    const poolFormattedData = [];
    let q = new Quoter(API_KEY, 8453);
    let a = await q.getPoolsForCollection(
      "0xbeea45F16D512a01f7E2a3785458D4a7089c8514"
    );
    console.log(a);
    for (const key in a) {
      const currentId = a[key]?.erc1155Id;
      const currentShareContract = await getShareUri(currentId);
      if (currentShareContract !== null) {
        const currentShareData = await getShareData(currentShareContract);
        if (currentShareData !== null) {
          poolFormattedData.push({
            sudoSwapData: a[key],
            friendTechData: currentShareData,
          });
        }
      }
    }
    setPoolsData(poolFormattedData);
  }

  async function getShareUri(targetId) {
    try {
      const uriResult = await readContract(config, {
        address: friendWrapperContract,
        abi: friendTechABI,
        functionName: "uri",
        args: [targetId],
      });
      const outputContract = uriResult.slice(28, uriResult.length);
      return outputContract;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function getShareData(targetContract) {
    try {
      const res = await fetch(
        `https://prod-api.kosetto.com/users/${targetContract}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  const [availablePools, setAvailablePools] = useState(null);
  return (
    <div>
      <div className="text-[30px] text-center p-5  flex justify-center">
        <img
          src="https://ivory-accurate-pig-375.mypinata.cloud/ipfs/QmNfe9547vPVgd8qqdCFeH81yHos1n1CoQZu1D9n5Nrjvp?pinataGatewayToken=DdSIfjJJunjBBaGpRA4VE7rw9Q3bNil3avaM8VrHQkPRh_2vaSMuwGFYGbn9Xzt2"
          alt=""
          style={{ maxWidth: "80%" }}
        />
      </div>
      <div className=" text-white text-center font-mono font-bold">
        Friend Tech Share Pools :
      </div>
      {isLoading ? (
        <div className="flex justify-center mt-10">
          <img
            src="https://www.friend.tech/friendtechlogo.png"
            className="w-20 h-20 animate-bounce"
          />
        </div>
      ) : (
        <center className="mt-5 ms-10">
          <div className="border border-slate-500 p-2 rounded-xl">
            {poolsData !== null ? (
              <>
                {poolsData.map((item) => {
                  return (
                    <div
                      key={item}
                      className="border border-slate-500 p-2 w-[320px] rounded-xl"
                    >
                      <div className="p-2">
                        <div>
                          <div className="flex justify-start text-white gap-2">
                            <img
                              src={item?.friendTechData?.ftPfpUrl}
                              alt=""
                              className="w-8 h-8 rounded-full"
                            />
                            <h3 className="text-white text-[10px] mt-2">
                              {item?.friendTechData?.ftName}
                            </h3>
                          </div>
                        </div>
                        <div className="text-white text-[8px] mt-4 flex justify-start ms-2">
                          <a
                            href=""
                            className="font-mono font-bold hover:underline hover:text-gray-300"
                          >
                            Pool Ca {item?.sudoSwapData?.address}
                          </a>
                        </div>
                        <div className="text-white text-[10px] font-mono font-bold mt-2 flex justify-start ms-2">
                          <h3>
                            Share Price:{" "}
                            {uintFormat(item?.friendTechData?.displayPrice)} /
                            Share
                          </h3>
                        </div>
                        <div className="flex justify-start ms-2 gap-2 mt-1">
                          <h3 className="text-white font-mono text-[10px] font-bold mt-1">
                            Pool Buy Price{" "}
                            {uintFormat(item?.sudoSwapData?.spotPrice).toFixed(
                              3
                            )}{" "}
                          </h3>
                          <img
                            src="https://dd.dexscreener.com/ds-data/tokens/base/0xddf7d080c82b8048baae54e376a3406572429b4e.png?size=lg&key=18ea46"
                            alt=""
                            className="w-5 h-5 rounded-full mt-0.5"
                          />
                        </div>
                        <div className="flex justify-start ms-2 font-mono font-bold text-white text-[10px] mt-1">
                          <h3>
                            Swap Fee: %{" "}
                            {Number(
                              uintFormat(item?.sudoSwapData?.fee) * 100
                            ).toFixed(2)}
                          </h3>
                        </div>
                        <div className="flex justify-center text-[12px] text-white mt-3 gap-2">
                          <button className="border text-center p-1 bg-black rounded-xl border-slate-500 ">
                            Purchase Shares
                          </button>
                          <button className="border text-center p-1 bg-black rounded-xl border-slate-500 ">
                            Sell Shares
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="flex justify-center gap-2">
                <img
                  src="https://forums.frontier.co.uk/attachments/1000012145-png.391294/"
                  alt=""
                  className="w-7 h-7"
                />
                <h3 className="text-white font-mono font-bold text-[10px] mt-2">
                  You currently own no pools
                </h3>
              </div>
            )}
          </div>
        </center>
      )}
    </div>
  );
}

export default FriendTechPools;
//ok so basically users who do ot own the pool can purchase shares only from the looks of it

//those who own the shares can deposit shares deposit goddog and withdraw both etc

//so how the pool works is when we make a pool we add the initial goddog liquidity and on each buy the initial goddog token balance in the pool increases on sell i asume the token amount in th epool decreases just like any other pool
