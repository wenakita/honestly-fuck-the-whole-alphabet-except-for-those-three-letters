import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./componets/Layout";
import Portal from "./componets/Portal";
import Home from "./componets/Home";
import Friend from "./componets/Friend";
import BalancesPage from "./componets/BalancesPage";
import MyPools from "./componets/MyPools";
import Pools from "./componets/Pools";
import Swap from "./componets/Swap";
import FriendTechPools from "./componets/FriendTechPools";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Portal />} />
          <Route path="/home" element={<Home />} />
          <Route path="/friend/:address" element={<Friend />} />
          <Route path="/balances" element={<BalancesPage />} />
          <Route path="/my-pools" element={<MyPools />} />
          <Route path="/pools" element={<FriendTechPools />} />
          <Route path="/swap" element={<Swap />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
