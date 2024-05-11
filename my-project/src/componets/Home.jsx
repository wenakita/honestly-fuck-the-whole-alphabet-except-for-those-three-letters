import TrendingFriends from "./TrendingFriends";
import propTypes from "prop-types";
import { GetTrendingFriends } from "../requests/friendCalls";
function Home() {
  const trendingFriends = GetTrendingFriends();
  console.log(trendingFriends);

  return (
    <div>
      <div className="border text-[30px] text-center p-5">
        <div className="text-center">
          <h3 className="text-white text-[20px] font-mono">
            Say goodbye to external web3 apps. Seamlessley mint & burn
            friend.tech shares while chatting with thousands on Telegram
          </h3>
          <div className="flex justify-center gap-2">
            <img
              src="https://static.vecteezy.com/system/resources/previews/018/930/708/non_2x/telegram-logo-telegram-icon-transparent-free-png.png"
              alt=""
              className="w-20 h-20 rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="container mt-10">
        <TrendingFriends data={trendingFriends} />
      </div>
    </div>
  );
}

//like in tsx we specify the type of data we pass to a componet

Home.propTypes = {
  data: propTypes.array.isRequired,
};

export default Home;
