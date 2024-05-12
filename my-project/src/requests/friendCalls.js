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

export async function SearchByContract(address) {
  try {
    const response = await fetch(
      `https://prod-api.kosetto.com/users/${address}`,
      {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg5MjQ1ZDRlNzg5Y2Y5ZWY0YTJhZDE4MDJhZDlmODZkZWQzNGVjZGNiIiwiaWF0IjoxNzE1MDM5OTAwLCJleHAiOjE3MTc2MzE5MDB9.LfBn7S7_F0FTZfwg0NhNy8ZQPXG0zFpfqds-ikv-_n4",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function SearchByUser(userName) {
  console.log(userName);
  try {
    const formattedQueryName = formatUserName(userName);
    const response = await fetch(
      `https://prod-api.kosetto.com/v2/search/users?username=${formattedQueryName}`,
      {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg5MjQ1ZDRlNzg5Y2Y5ZWY0YTJhZDE4MDJhZDlmODZkZWQzNGVjZGNiIiwiaWF0IjoxNzE1MDM5OTAwLCJleHAiOjE3MTc2MzE5MDB9.LfBn7S7_F0FTZfwg0NhNy8ZQPXG0zFpfqds-ikv-_n4",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data.users;
  } catch (error) {
    console.log(error);
  }
}

function formatUserName(target) {
  let formatted;
  console.log(target);
  if (/\s/.test(target)) {
    formatted = target.replace(/\s/, "%20");
    return formatted;
  }
  return target;
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
