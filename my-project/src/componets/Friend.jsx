import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SearchByContract } from "../requests/friendCalls";
import { uintFormat } from "../formatters/format";
import FriendSwap from "./FriendSwap";
function Friend() {
  const [data, setData] = useState(null);
  const [shareBalance, setShareBalance] = useState("0");
  const { address } = useParams();
  console.log(address);
  useEffect(() => {
    fetchInfo();
  }, [address]);
  async function fetchInfo() {
    console.log(address);

    const results = await SearchByContract(address);
    console.log(results);
    setData(results);
  }

  console.log(address);
  return (
    <div className="mt-10 container p-5">
      {data !== null ? (
        <div className="flex justify-center">
          <div className="border border-slate-500 rounded-xl w-[400px] p-5">
            <div className="p-3">
              <img
                src={data?.ftPfpUrl}
                alt=""
                className="w-26 h-16 rounded-full"
              />
            </div>
            <div className="text-white text-[20px] p-2">{data?.ftName}</div>

            <div className=" p-2">
              <a
                href={`https://www.friend.tech/${data?.address}`}
                target="_blank"
              >
                <div className="flex justify-start">
                  <h3 className="text-white mt-2 hover:underline">
                    Friend.tech profile
                  </h3>
                  <img
                    src="https://freepngimg.com/thumb/twitter/108250-badge-twitter-verified-download-free-image-thumb.png"
                    alt=""
                    className="w-10 h-10 hover:underline"
                  />
                </div>
              </a>
            </div>
            <a
              href={`https://basescan.org/address/${data?.address}`}
              target="_blank"
              className="flex justify-start text-[12px] text-white p-2 hover:underline"
            >
              Ca: {data?.address}
            </a>

            <div className="p-2">
              <div className="flex justify-start">
                <h3 className="text-white text-[12px]">
                  Followers: {data?.followerCount}
                </h3>
              </div>
            </div>
            <div className="p-2">
              <div className="flex justify-start text-[12px]">
                <h3 className="text-white">
                  Price: {uintFormat(data?.displayPrice)}
                </h3>
              </div>
            </div>
            <div className="">
              <FriendSwap
                shareAddress={data?.address}
                price={uintFormat(data?.displayPrice)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Friend;
