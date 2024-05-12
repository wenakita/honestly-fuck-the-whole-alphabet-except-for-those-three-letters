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
            loginMethods: ["wallet"],
            appearance: {
              theme: "dark",
            },
          }}
        >
          <App />
        </PrivyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
