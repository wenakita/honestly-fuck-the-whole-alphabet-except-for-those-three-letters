import { useState, useEffect } from "react";
const jwt = import.meta.env.VITE_FRIEND_TECH_JWT;
console.log(jwt);
export function GetTrendingFriends() {
  const [trendingUsers, setTrendingUsers] = useState([]);
  useEffect(() => {
    fetch("https://prod-api.kosetto.com/lists/top-by-price")
      .then(function (results) {
        return results.json();
      })
      .then(function (data) {
        setTrendingUsers(data.users);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return trendingUsers;
}

// export function searchFriends(axios) {
//   const [friendResults, setFriendResluts] = useState([]);
//   useEffect(() => {
//     axios
//       .get("https://prod-api.kosetto.com/lists/top-by-price")
//       .then(function (results) {
//         console.log(results.data);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }, []);

//   return friendResults;
// }
