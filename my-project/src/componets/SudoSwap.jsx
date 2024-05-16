import { useEffect } from "react";
import { Quoter } from "sudo-defined-quoter";
const API_KEY = import.meta.env.VITE_DEFINED_KEY;

function SudoSwap() {
  useEffect(() => {
    testCall();
  }, []);
  async function testCall() {
    let q = new Quoter(API_KEY, 1);
    q.getBidQuotes("0xd3d9ddd0cf0a5f0bfb8f7fceae075df687eaebab", 1177)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const handleSwap = () => {};
  return (
    <div className="">
      <div className="text-center mt-3 border p-5">
        <h3 className="text-white text-[20px] font-mono">
          Goddog Sudoswap Integration
        </h3>
        <center>
          <img
            src="https://avatars.githubusercontent.com/u/94413972?s=280&v=4"
            alt=""
            className="w-10 h-10"
          />
        </center>
      </div>
    </div>
  );
}

export default SudoSwap;
