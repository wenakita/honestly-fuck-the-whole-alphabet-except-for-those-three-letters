import React, { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import friendTechABI from "../abi/FriendTechABi";
import { config } from "../config";
import { uintFormat } from "../formatters/format";
import { useWallets } from "@privy-io/react-auth";
function Pools(props) {
  const [poolData, setPoolData] = useState([]);
  const friendWrapperContract = "0xbeea45F16D512a01f7E2a3785458D4a7089c8514";
  const { userPools } = props;
  const { wallets } = useWallets();
  const w0 = wallets[0];
  useEffect(() => {
    if (userPools) {
      getSharesData();
    }
  });

  async function getSharesData() {
    const poolsFullData = [];
    for (const key in userPools) {
      const currentShareId = userPools[key]?.erc1155Id;
      const currentShareContract = await getShareUri(currentShareId);
      if (currentShareContract) {
        const currentShareData = await getUriData(currentShareContract);
        if (currentShareData) {
          poolsFullData.push({
            poolData: {
              shareData: currentShareData,
              sharePoolData: userPools[key],
            },
          });
        }
      }
    }
    setPoolData(poolsFullData);
  }

  async function getShareUri(targetId) {
    try {
      const uriResult = await readContract(config, {
        address: friendWrapperContract,
        abi: friendTechABI,
        functionName: "uri",
        args: [targetId],
      });
      const uriResultContract = uriResult.slice(28, uriResult.length);
      return uriResultContract;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function getUriData(targetShareContract) {
    try {
      const res = await fetch(
        `https://prod-api.kosetto.com/users/${targetShareContract}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  return (
    <center className="border border-slate-500 rounded-xl p-3 ms-5 me-5 mb-10">
      {poolData.length > 0 ? (
        <>
          {poolData.map((item) => {
            return (
              <div
                key={item}
                className="border border-slate-500 p-2 w-[320px] rounded-xl"
              >
                <div className="p-2">
                  <div>
                    <div className="flex justify-start text-white gap-2">
                      <img
                        src={item?.poolData?.shareData?.ftPfpUrl}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                      <h3 className="text-white text-[10px] mt-2">
                        {item?.poolData?.shareData?.ftName}
                      </h3>
                    </div>
                  </div>
                  <div className="text-white text-[8px] mt-4">
                    <a
                      href=""
                      className="font-mono hover:underline hover:text-gray-300 font-bold"
                    >
                      Pool Ca: {item?.poolData?.sharePoolData?.address}
                    </a>
                  </div>
                  <div className="text-white text-[10px] font-mono font-bold mt-2">
                    <h3>
                      Share Price:{" "}
                      {uintFormat(item?.poolData?.shareData?.displayPrice)}
                    </h3>
                  </div>
                  <div className="text-white text-[10px] mt-2 font-mono font-bold">
                    <h3>
                      Swap Fee: %{" "}
                      {uintFormat(item?.poolData?.sharePoolData?.fee) * 100}
                    </h3>
                  </div>
                  <div className="mt-3 flex justify-start text-[8px] gap-2">
                    <button className="border text-center p-1 bg-black rounded-xl border-slate-500 ">
                      Deposit Shares
                    </button>
                    <button className="border text-center p-1 bg-black rounded-xl border-slate-500 ">
                      Deposit Goddog
                    </button>
                    <button className="border text-center p-1 bg-black rounded-xl border-slate-500 ">
                      Withdraw Shares
                    </button>
                    <button className="border text-center p-1 bg-black rounded-xl border-slate-500 ">
                      Withdraw Goddog
                    </button>
                  </div>
                  <div className="mt-2 flex justify-center text-[10px]">
                    <button className="border text-center p-2 bg-black rounded-xl border-slate-500">
                      Transfer OwnerShip
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
    </center>
  );
}

export default Pools;

//this is the target for tommorow we map each pool that the user has
//for each we get image by calling contract to get the uri we extract the uri from the contract
//we call the friend tech api by passing in the contract we got from the uri and get the full data of the share and display it

//friendtech wrapper contract

//this is the object format for the pool data
// [
//   {
//     poolData: {
//       shareData: {
//         id: 629782,
//         address: '0xa053f456c2ed11965f57f4940e9443e0d50203e3',
//         twitterUsername: null,
//         twitterName: null,
//         twitterPfpUrl: null,
//         twitterUserId: null,
//         ftUsername: 'Ivasilevff',
//         ftName: 'SoFi Shop🔔',
//         ftPfpUrl:
//           'https://d3egfmvgqzu76k.cloudfront.net/pfp-images/0xa053f456c2ed11965f57f4940e9443e0d50203e3/73620910m9fd42t0mvq?Expires=1816307663&Key-Pair-Id=K11ON08J8XW8N0&Signature=N9qwr8lEdkyfc~VRkPblLNzM65~9D3spgJR0CgHMlMhQkdQe6uWSAD62mhuKyYpLfN9Slv6-XM4X12MP32rGufavN2-zbiMWeVoLWENT50n-thfEgs5T24I3w~xUekXEcXAUFpJtgFWe0rv6CxV-dsInAQSqU8QsxHACEtlo880Zqc7H3s9zdFygwFsC5eQlAJ7~ngPw~vajMypsHkxhlet6TzW0xgMuTKPuUYZgXSwU4zqXfdOc3SLNbxY25B6OxKGKPQGOa5ip9jr5-vnp4E78gzl1ysF7mf7nhl0-NNn520mLKvqFHfUUx9ihieWkK2A-8DSI-sVGqTAcRWwiIA__',
//         lastOnline: '1714510208709',
//         lastMessageTime: 1714510113595,
//         holderCount: 1,
//         holdingCount: 0,
//         watchlistCount: 1,
//         followerCount: 1,
//         followingCount: 0,
//         shareSupply: 2,
//         displayPrice: '250000000000000',
//         netBuy: '0',
//         lifetimeFeesCollectedInWei: '0',
//         userBio: '  on-chain crypto podcast Follow🌊',
//         rank: '93631'
//       },
//       sharePoolData: {
//         address: '0x3168260f187cd8bb2052f4de19650e7f267f345d',
//         tokenBalance: 0n,
//         spotPrice: 17733719337290908n,
//         delta: 1069000000000000000n,
//         royalty: 0n,
//         nftIds: Set { 0: '915310770104444432551381599323274438466366211043' },
//         nftBalance: 1n,
//         fee: 69000000000000000n,
//         bondingCurveAddress: '0x9506c0e5cee9ad1dee65b3539268d61ccb25afb6',
//         isETHPool: false,
//         tokenAddress: '0xddf7d080c82b8048baae54e376a3406572429b4e',
//         poolType: 1,
//         owner: '0x0f76cd9bb6b3b7eaeda808818218d61f923b3494',
//         isSeaportFillable: false,
//         erc1155Id: '915310770104444432551381599323274438466366211043'
//       }
//     }
//   }
// ]
