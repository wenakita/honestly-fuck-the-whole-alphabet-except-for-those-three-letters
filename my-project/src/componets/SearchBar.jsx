import { useEffect, useState } from "react";
import { SearchByContract, SearchByUser } from "../requests/friendCalls";
import { uintFormat } from "../formatters/format";
import { Link } from "react-router-dom";
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
                  <Link
                    to={`/friend/${caResults?.address}`}
                    className="border border-slate-500 p-3 grid grid-cols-3"
                  >
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
                  </Link>
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
                      <Link
                        to={`friend/${item?.address}`}
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
                      </Link>
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
