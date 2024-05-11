import { useState, useEffect } from "react";
import axios from "axios";
const jwt = import.meta.env.VITE_FRIEND_TECH_JWT;
console.log(jwt);
export function GetTrendingFriends() {
  const [trendingUsers, setTrendingUsers] = useState([]);
  useEffect(() => {
    axios
      .get("https://prod-api.kosetto.com/lists/top-by-price")
      .then(function (results) {
        setTrendingUsers(results.data.users);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return trendingUsers;
}
