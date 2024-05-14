import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./config";
import "./index.css";
console.log(import.meta.env.VITE_NEXT_PUBLIC_PRIVY_APP_ID);
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
          appId={import.meta.env.VITE_NEXT_PUBLIC_PRIVY_APP_ID}
          config={{
            loginMethods: ["email", "wallet", "google", "apple", "farcaster"],
            appearance: {
              theme: "dark",
            },
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
          }}
        >
          <App />
        </PrivyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
