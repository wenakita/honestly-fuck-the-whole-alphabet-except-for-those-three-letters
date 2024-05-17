import { useState, useEffect } from "react";
const jwt = import.meta.env.VITE_FRIEND_TECH_JWT;
console.log(jwt);
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-api-key": "3652122689914635ac7806c7547255fe",
  },
};
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

export async function findId(userAddress) {
  try {
    const response = await fetch(
      `https://api.opensea.io/api/v2/chain/base/account/${userAddress}/nfts`,
      options
    );
    const data = await response.json();
    const output = dissectShares(data.nfts);
    return output;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function dissectShares(data) {
  let foundShares = [];
  console.log(data);
  for (const key in data) {
    if (
      data[key].collection === "wrapped-friendtech" &&
      data[key].token_standard === "erc1155"
    ) {
      foundShares.push(data[key]);
    }
  }
  return foundShares;
}

export async function fetchGlobalActivity() {
  console.log("here");
  console.log(import.meta.env.VITE_FRIEND_TECH_JWT);
  try {
    const response = await fetch(
      "https://prod-api.kosetto.com/global-activity-v2"
    );
    const data = await response.json();
    dissectBuyTypes(data.events);
    return "1";
  } catch (error) {
    return null;
  }
}

async function dissectBuyTypes(data) {
  for (const key in data) {
    console.log(data[key]);
  }
}

export async function fetchFollowers(userAddress) {
  console.log(userAddress);
  try {
    const response = await fetch(
      `https://prod-api.kosetto.com/users/${userAddress}/following-list?requester=${userAddress}`,
      {
        headers: {
          Authorization: import.meta.env.VITE_FRIEND_TECH_JWT,
        },
      }
    );
    const data = await response.json();
    const result = await data.followingList;
    if (result.length > 3) {
      return [result[0], result[1], result[2]];
    } else {
      return [result[0]];
    }
  } catch (error) {
    return null;
  }
}
// export async function GetTargetShareBalance(
//   userAddress,
//   targetAddress,
//   shareId,
//   useReadContract
// ) {
//   console.log(userAddress, targetAddress);

//   return "1";
// }
