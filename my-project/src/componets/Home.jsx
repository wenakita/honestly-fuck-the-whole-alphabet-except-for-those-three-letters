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
        <img
          src="https://i.postimg.cc/1tVjvkNm/IMAGE-2024-05-16-01-17-14.jpg"
          alt="photo-5051187200489794811-y"
          border="0"
        />
      </div>
      <div className="mt-10">
        <h3 className="text-white flex justify-center font-mono font-bold">
          Your unique deposit address: {user?.wallet?.address}
        </h3>
      </div>
      <div className=" mt-10">
        <TrendingFriends data={trendingFriends} />
      </div>
    </div>
  );
}

Home.propTypes = {
  data: propTypes.array.isRequired,
};

export default Home;
