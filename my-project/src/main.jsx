import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PrivyProvider } from "@privy-io/react-auth";
import { base } from "viem/chains";
import "./index.css";
console.log(import.meta.env.VITE_NEXT_PUBLIC_PRIVY_APP_ID);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrivyProvider
      appId={import.meta.env.VITE_NEXT_PUBLIC_PRIVY_APP_ID}
      config={{
        loginMethods: ["wallet"],
        appearance: {
          theme: "dark",
        },
        defaultChain: base,
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);
