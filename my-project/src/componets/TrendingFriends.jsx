import PropTypes from "prop-types";
import { uintFormat } from "../formatters/format";
import { Link } from "react-router-dom";
function TrendingFriends(props) {
  const { data } = props;
  console.log(data);
  return (
    <div className="">
      <h3 className="text-white text-center mb-5 text-[20px] font-mono font-bold">
        Trending friends
      </h3>
      <div className="mt-2 overflow-auto h-[550px] border border-slate-500 rounded-xl">
        {data ? (
          <>
            {data.map((item) => {
              return (
                <div
                  key={item}
                  className="border border-slate-500 rounded-xl bg-black grid grid-flow-col gap-2 p-3 text-white"
                >
                  <div>
                    <Link
                      to={`/friend/${item?.address}`}
                      className="flex justify-start gap-3"
                    >
                      <img
                        src={item?.ftPfpUrl}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <h3
                        className={`mt-2 ${item?.ftName.length >= 11 ? "text-[8px]" : "text-[12px] text-center"}`}
                      >
                        {item?.ftName}
                      </h3>
                    </Link>
                  </div>
                  <div>
                    <div className="flex justify-center overflow-hidden text-[10px] me-2">
                      Share Price: {uintFormat(item?.displayPrice)} Ξ
                    </div>
                    <div className="mt-1">
                      <div className="flex justify-center overflow-hidden text-[10px] me-2">
                        Holders : {item?.holderCount}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-end text-white gap-2">
                      <Link
                        to={`/friend/${item?.address}`}
                        className="border border-slate-500 rounded-xl p-2 flex h-[45px]"
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
                </div>
              );
            })}
          </>
        ) : null}
      </div>
    </div>
  );
}

TrendingFriends.propTypes = {
  data: PropTypes.array.isRequired, // Assuming data is an array
};

export default TrendingFriends;
