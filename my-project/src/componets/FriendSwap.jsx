function FriendSwap() {
  return (
    <div className="border ">
      <h3 className="text-white">Swap now</h3>
      <div className="grid grid-flow-row gap-2">
        <input
          type="text"
          className="bg-stone-500 rounded-lg"
          placeholder="swap target goes here"
        />
        <input
          type="text"
          className="bg-stone-500 rounded-lg"
          placeholder="received amount goes heres"
        />
      </div>
    </div>
  );
}

export default FriendSwap;
