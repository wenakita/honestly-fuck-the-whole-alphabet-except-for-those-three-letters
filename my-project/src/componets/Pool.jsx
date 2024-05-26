import React, { useState, useEffect } from "react";
import { Quoter } from "sudo-defined-quoter";
import { readContract } from "@wagmi/core";
import friendTechABI from "../abi/FriendTechABi";
import { useParams } from "react-router-dom";
import { config } from "../config";
import { uintFormat } from "../formatters/format";
import { useWallets } from "@privy-io/react-auth";
const API_KEY = import.meta.env.VITE_DEFINED_KEY;
const friendWrapperContract = "0xbeea45F16D512a01f7E2a3785458D4a7089c8514";
function Pool() {
  const [poolsFound, setPoolsFound] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getPoolData();
  }, []);
  const params = useParams();
  const { wallets } = useWallets();
  const w0 = wallets[0];
  const { id: targetShareId } = params;
  console.log(targetShareId);
  async function getPoolData() {
    const q = new Quoter(API_KEY, 8453);
    const a = await q.getPoolsForCollection(friendWrapperContract);
    console.log(a);
    dissectPoolData(a);
  }

  async function dissectPoolData(data) {
    const friendTechData = await getShareData();
    const userShareBalance = await getShareBalance();

    let targetSharesPools = [];
    console.log(data);
    for (const key in data) {
      const currentPool = data[key];
      const currentId = currentPool?.erc1155Id;
      console.log(currentId);
      console.log(currentPool);
      if (currentId === targetShareId) {
        console.log("true");
        targetSharesPools.push({
          sudoSwapData: currentPool,
          friendTechData: friendTechData,
          userShareBalance: Number(userShareBalance),
        });
      }
    }
    console.log(targetSharesPools);
    setPoolsFound(targetSharesPools);
  }

  async function getShareBalance() {
    console.log("running");
    try {
      console.log("running");
      const balanceResult = await readContract(config, {
        address: friendWrapperContract,
        abi: friendTechABI,
        functionName: "balanceOf",
        args: [w0?.address, targetShareId],
      });
      console.log(balanceResult);
      return balanceResult;
    } catch (error) {
      console.log(error);
    }
  }

  async function getShareData() {
    console.log("Running");
    const shareContract = await getShareUri();
    console.log(shareContract);

    try {
      const res = await fetch(
        `https://prod-api.kosetto.com/users/${shareContract}`
      );
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function getShareUri() {
    try {
      console.log("Henlo");
      const uriResult = await readContract(config, {
        address: friendWrapperContract,
        abi: friendTechABI,
        functionName: "uri",
        args: [targetShareId],
      });
      const result = uriResult.slice(28, uriResult.length);
      return result;
    } catch (error) {
      console.log(error);
    }
    async function approveGoddog() {}
    async function approveShare() {}
    async function purchaseShareFromPool() {}
    async function sellShareFromPool() {}
  }
  return (
    <>
      {loading ? null : (
        <>
          {poolsFound ? (
            <div className="">
              <h3 className="text-white text-center text-[20px] mt-20 mb-10">
                Pools For {poolsFound[0]?.friendTechData?.ftName}:
              </h3>
              {poolsFound.map((item) => {
                return (
                  <div key={item} className=" flex justify-center mt-3">
                    <div className="border border-slate-500 p-2 w-[320px] rounded-xl bg-black">
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
                            Pool Spot Price{" "}
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
                        <div className="flex justify-start ms-2 font-mono font-bold text-white text-[10px] mt-1">
                          <h3>
                            Your Share Balance: {Number(item?.userShareBalance)}
                          </h3>
                        </div>
                        <div className="flex justify-start ms-2 font-mono font-bold text-white text-[10px] mt-1">
                          <h3>
                            Pool Share Balance:{" "}
                            {Number(item?.sudoSwapData?.nftBalance)}
                          </h3>
                        </div>
                        <div className="flex justify-center text-[12px] text-white mt-3 gap-2">
                          {Number(item?.sudoSwapData?.nftBalance > 0) ? (
                            <>
                              {item?.userShareBalance > 0 ? (
                                <>
                                  <button
                                    className="border text-center p-1 bg-black rounded-xl border-slate-500 "
                                    onClick={() => {
                                      // purchaseShareFromPool(
                                      //   item?.sudoSwapData?.erc1155Id,
                                      //   item?.sudoSwapData?.address,
                                      //   item?.sudoSwapData?.spotPrice
                                      // );
                                    }}
                                  >
                                    Purchase Shares
                                  </button>
                                  <button
                                    className="border text-center p-1 bg-black rounded-xl border-slate-500 "
                                    onClick={() => {
                                      // sellShareFromPool(
                                      //   item?.sudoSwapData?.erc1155Id,
                                      //   item?.sudoSwapData?.address,
                                      //   item?.sudoSwapData?.spotPrice
                                      // );
                                    }}
                                  >
                                    Sell Shares
                                  </button>
                                </>
                              ) : (
                                <button
                                  className="border text-center p-1 bg-black rounded-xl border-slate-500 "
                                  onClick={() => {
                                    // purchaseShareFromPool(
                                    //   item?.sudoSwapData?.erc1155Id,
                                    //   item?.sudoSwapData?.address,
                                    //   item?.sudoSwapData?.spotPrice
                                    // );
                                  }}
                                >
                                  Purchase Shares
                                </button>
                              )}
                            </>
                          ) : (
                            <>
                              {item?.userShareBalance > 0 ? (
                                <button
                                  className="border text-center p-1 bg-black rounded-xl border-slate-500 "
                                  onClick={() => {
                                    // sellShareFromPool(
                                    //   item?.sudoSwapData?.erc1155Id,
                                    //   item?.sudoSwapData?.address,
                                    //   item?.sudoSwapData?.spotPrice
                                    // );
                                  }}
                                >
                                  Sell Shares
                                </button>
                              ) : (
                                <button className="border text-center p-1 bg-black rounded-xl border-slate-500 ">
                                  Tranding not available
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

export default Pool;
