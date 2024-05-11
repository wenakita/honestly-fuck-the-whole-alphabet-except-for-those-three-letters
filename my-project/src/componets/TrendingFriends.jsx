import PropTypes from "prop-types";
import { uintFormat } from "../formatters/format";
function TrendingFriends(props) {
  const { data } = props;
  console.log(data);
  return (
    <div>
      <h3 className="text-white text-center mb-5 text-[20px]">
        Trending friends:
      </h3>
      <div className="mt-2  overflow-auto h-[500px] container">
        <table className="w-full">
          <thead>
            <tr className="text-white">
              <th>
                <h3 className="flex justify-start">Friend</h3>
              </th>
              <th>
                <div className="flex justify-center">Price</div>
              </th>
              <th>Trade</th>
            </tr>
          </thead>
          <tbody className="">
            {data ? (
              <>
                {data.map((item) => {
                  return (
                    <tr
                      key={item}
                      className="text-white border border-slate-500"
                    >
                      <td className="p-3">
                        <div className="flex justify-start gap-2">
                          <img
                            src={item?.ftPfpUrl}
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                          {item.ftName}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex justify-start">
                          {uintFormat(item.displayPrice)} Ξ / share
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex justify-center gap-2">
                          <button className="border border-slate-500 p-2">
                            Mint
                          </button>
                          <button className="border border-slate-500 p-2">
                            Burn
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

TrendingFriends.propTypes = {
  data: PropTypes.array.isRequired, // Assuming data is an array
};

export default TrendingFriends;
