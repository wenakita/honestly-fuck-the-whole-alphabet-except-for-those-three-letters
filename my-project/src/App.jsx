import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./componets/Layout";
import Portal from "./componets/Portal";
import Home from "./componets/Home";
import Friend from "./componets/Friend";
import Balances from "./componets/Balances";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Portal />} />
          <Route path="/home" element={<Home />} />
          <Route path="/friend/:address" element={<Friend />} />
          <Route path="/balances" element={<Balances />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
