import { useState } from "react";
import { Link } from "react-router-dom";
function NotableFriends(props) {
  const { data } = props;
  console.log(data);
  return (
    <div>
      {data ? (
        <>
          <h3 className="text-center text-white font-mono font-bold mt-5 text-[20px]">
            Notable Mention
          </h3>
          <div className="mt-5">
            <div className="border border-slate-500 p-2 w-[320px] rounded-xl">
              <div className="flex justify-start p-2">
                <img
                  src={data?.ftPfpUrl}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex justify-start">
                <h3 className="text-white text-[15px] p-3">{data?.ftName}</h3>
              </div>
              <div className="flex justify-start">
                <h3 className="text-white text-[9px] ms-2.5 font-mono">
                  Ca: {data?.address}
                </h3>
              </div>
              <div className="flex justify-start ms-2.5 mt-1.5">
                <Link
                  to={`https://www.friend.tech/${data?.address}`}
                  target="_blank"
                  className="text-white text-[12px] mt-1 font-mono font-bold"
                >
                  friend.tech profile
                </Link>
                <img
                  src="https://freepngimg.com/thumb/twitter/108250-badge-twitter-verified-download-free-image-thumb.png"
                  alt=""
                  className="w-7 h-7"
                />
              </div>
              <Link
                to={`/friend/${data?.address}`}
                className="flex justify-start ms-2 mt-1 mb-3 gap-1 border border-slate-500 bg-black w-[110px] rounded-lg"
              >
                <img
                  src="https://i.pinimg.com/originals/49/02/54/4902548424a02117b7913c17d2e379ff.gif"
                  alt=""
                  className="w-5 h-5 mt-0.5"
                />
                <h3 className="text-white text-[8px] font-mono font-bold hover:underline mt-1">
                  Mint & Burn
                </h3>
                <img
                  src="https://media0.giphy.com/media/J2awouDsf23R2vo2p5/giphy.gif?cid=6c09b9528hc0btlg9yo7v4fnfa4c0amgumd8n075941rgt12&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=e"
                  alt=""
                  className="w-5 h-5"
                />
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default NotableFriends;
