import { useEffect, useState } from "react";
import { SearchByContract, SearchByUser } from "../requests/friendCalls";
import { uintFormat } from "../formatters/format";
function SearchBar() {
  const [input, setInput] = useState("");
  const [activateResults, setActivateResults] = useState(false);
  const [caResults, setCaResults] = useState(null);
  const [userResults, setUserResults] = useState(null);

  const [resultType, setResultType] = useState("user");
  useEffect(() => {
    if (input.includes("0x")) {
      console.log("Search address");
      setResultType("contract");
      fetchContract();
    } else {
      console.log("Search user");
      setResultType("user");
      fetchUser();
    }
  }, [input]);
  async function fetchContract() {
    const results = await SearchByContract(input);
    console.log(results);
    if (results?.message) {
      setCaResults(null);
    } else {
      setCaResults(results);
    }
  }

  async function fetchUser() {
    const results = await SearchByUser(input);
    console.log(results);
    if (results?.message || results === undefined) {
      setUserResults(null);
    } else {
      setUserResults(results);
    }
  }
  return (
    <div className="flex justify-center gap-2">
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mt-1.5"
      >
        <path
          d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
          fill="white"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
      <input
        type="text"
        className="text-white border border-slate-500 bg-stone-800 rounded-xl w-[300px]"
        onChange={(e) => {
          console.log(e.target.value);
          setInput(e.target.value);
        }}
        onClick={() => {
          setActivateResults(true);
        }}
      />

      {activateResults ? (
        <div className="border absolute mt-7 w-[300px] bg-black border-slate-500 ms-5">
          <div className=" flex justify-end text-white me-3">
            <button
              onClick={() => {
                setActivateResults(false);
                setCaResults(null);
                setUserResults(null);
              }}
            >
              X
            </button>
          </div>
          {resultType === "contract" ? (
            <>
              {caResults !== null ? (
                <div className="border border-slate-500  text-white text-center">
                  <div className="border border-slate-500 p-3 grid grid-cols-3">
                    <div>
                      <div className="flex justify-start gap-2">
                        <img
                          src={caResults?.ftPfpUrl}
                          alt=""
                          className="w-5 h-5 rounded-full"
                        />
                        <h3 className="text-whit text-[10px]">
                          {caResults?.ftName}
                        </h3>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white text-[10px]">
                        {uintFormat(caResults?.displayPrice)}
                      </h3>
                    </div>
                    <div>
                      <h3 className="text-white text-[10px]">
                        Holders: {caResults?.holderCount}
                      </h3>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-slate-500  text-white text-center">
                  No contracts found
                </div>
              )}
            </>
          ) : (
            <div className="overflow-auto h-[200px]">
              {userResults !== null ? (
                <div className="border border-slate-500 text-white text-center">
                  {userResults.map((item) => {
                    return (
                      <div
                        className="border border-slate-500 p-3 grid grid-cols-3 text-white"
                        key={item}
                      >
                        <div>
                          <div className="flex justify-start gap-2">
                            <img
                              src={item?.ftPfpUrl}
                              alt=""
                              className="w-5 h-5 rounded-full"
                            />
                            <h3 className="text-[10px]">{item?.ftName}</h3>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-[10px] text-white">
                            {uintFormat(item?.displayPrice)}
                          </h3>
                        </div>
                        <div>
                          <div className="flex justify-end">
                            <h3 className="text-white text-[10px]">
                              Holders: {item?.holderCount}
                            </h3>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="border border-slate-500 text-white text-center">
                  no users found
                </div>
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default SearchBar;

// [
//   {
//     address: '0x7b202496c103da5bedfe17ac8080b49bd0a333f1',
//     ftPfpUrl:
//       'https://d3egfmvgqzu76k.cloudfront.net/pfp-images/0x7b202496c103da5bedfe17ac8080b49bd0a333f1/35134801v4w26w52w8?Expires=1815491840&Key-Pair-Id=K11ON08J8XW8N0&Signature=Dc7jXos7beznEHBK8mYOUwzSGq25sefkTEH8m~ZG6i1UnSg4grXiRw6TJiFu3p6eswkLCeuEt0b2~6pPRQIKHaWp-ZfoTcIXEYZ5mYZUIRD9x9TcjHGReBlzAbWAuTQX1geZaNPszdkNWmaZqmcQoghBTw8JL36naWIQQJqjsDplGkElM9eiyLNBo~WW5vPmQX6l5JEzf-fsTZQytDQ2GIjknfuZdQAbOLyWhtv3AUQjvhAMRHk31qBWAqsgUkfG6qD-dolqpflgiV8aMaRHqxRVvTm708eu5cS4EU5my4EsGoG9qzc~3uUUBG7mpc7eotBivaFkkcBsytGKhtHqXQ__',
//     ftUsername: 'GODDOG',
//     ftName: 'GODDOG',
//     displayPrice: '39062500000000000'
//   },
//   {
//     address: '0x9245d4e789cf9ef4a2ad1802ad9f86ded34ecdcb',
//     ftPfpUrl:
//       'https://d3egfmvgqzu76k.cloudfront.net/pfp-images/0x9245d4e789cf9ef4a2ad1802ad9f86ded34ecdcb/19635231qxx32g9smws?Expires=1815491840&Key-Pair-Id=K11ON08J8XW8N0&Signature=J2ILEMl4YFLAPYj9X1kh6gFbNfTWRrKL~8hFvL6Oi1RyfyXaT8bpEwZAqtk~gK2M0AsqzBBsBFbHmOjiUbKTM4pwmR7T3y8PggSfitZoPq4-Rh7IU3QU5AqhHMp4VlIkg8AXhEoFDn8gXGAE8g3UQWnjpmZFv9OXigfPNJfoCmUdXWCxbJ6bxg7~Y-Mlhifex-qI4QEBud3iWJdK2hFoRT1tjG75AYOk8O1rWHOtysyr7WV6Om7fym6oAe~1nT9Rf~u3iTG18b-hh3ukc7kxbjS8goxwtJiBp5uC~F1Q1iWRiZgcUTwXxwjSAmmI9eaRpdwxUkD45Dh25s1KW~ImqQ__',
//     ftUsername: 'ForTehTech',
//     ftName: 'GoddogIntern',
//     displayPrice: '5062500000000000'
//   }
// ]
