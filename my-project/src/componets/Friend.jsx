import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SearchByContract } from "../requests/friendCalls";
function Friend() {
  const [data, setData] = useState(null);
  const params = useParams();
  useEffect(() => {
    fetchInfo();
  }, []);
  async function fetchInfo() {
    const results = await SearchByContract(params.address);
    console.log(results);
    setData(results);
  }

  console.log(params.address);
  return (
    <div className="container p-5">
      <h3 className="text-white mb-5">{params.address}</h3>

      {data !== null ? (
        <div className="flex justify-center">
          <div className="border border-slate-500 rounded-xl w-[400px] p-5">
            <div>
              <img
                src={data?.ftPfpUrl}
                alt=""
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-white text-[20px] p-2">{data?.ftName}</div>
            <div className=" p-2">
              <a
                href={`https://www.friend.tech/${data?.address}`}
                target="_blank"
              >
                <div className="flex justify-start">
                  <h3 className="text-white mt-2">Friend.tech profile</h3>
                  <img
                    src="https://freepngimg.com/thumb/twitter/108250-badge-twitter-verified-download-free-image-thumb.png"
                    alt=""
                    className="w-10 h-10"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Friend;
