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
                        className={`mt-2 ${item?.ftName.length >= 11 ? "text-[8px] text-center" : "text-[12px] text-center font-bold"}`}
                      >
                        {item?.ftName}
                      </h3>
                    </Link>
                  </div>
                  <div>
                    <div className="flex justify-center overflow-hidden text-[8px] me-2">
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
                        className="border border-slate-500 rounded-xl p-2 flex h-[45px] grid grid-flow-col gap-1"
                      >
                        <div className="text-[8px] mt-2 ">Mint / Burn</div>
                        <div>
                          <img
                            src="https://www.friend.tech/keysIcon3d.png"
                            alt=""
                            className="w-3 h-3 mt-2"
                          />
                        </div>
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
