import propTypes from "prop-types";
import { GetTrendingFriends } from "../requests/friendCalls";
import { usePrivy } from "@privy-io/react-auth";
import TrendingFriends from "./TrendingFriends";
function Home() {
  const { user } = usePrivy();
  const trendingFriends = GetTrendingFriends();
  console.log(trendingFriends);

  return (
    <div className="">
      <div className="text-[30px] text-center p-5  flex justify-center">
        <a href="https://ibb.co/zS2v8Q5">
          <img
            src="https://i.ibb.co/ZhgDHGJ/photo-5051187200489794811-y.jpg"
            alt="photo-5051187200489794811-y"
            border="0"
          />
        </a>
        {/* <div className="text-center">
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
        </div> */}
      </div>
      <div className="mt-10">
        <h3 className="text-white flex justify-center">
          Your unique deposit address: {user?.wallet?.address}
        </h3>
      </div>
      <div className=" mt-10">
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
