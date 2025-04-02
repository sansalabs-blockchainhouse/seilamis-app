"use client";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Inter } from "next/font/google";
import { SeiWalletProvider } from "@sei-js/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import NetworkProvider from "@/contexts/Network";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { WagmiProvider } from "wagmi";

import { base, polygon } from "wagmi/chains";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [polygon, base],
  ssr: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <SeiWalletProvider
                chainConfiguration={{
                  chainId: "pacific-1",
                  restUrl: "https://sei-api.polkachu.com/",
                  rpcUrl: "https://sei-rpc.polkachu.com/",
                }}
                wallets={["compass", "fin", "keplr", "leap"]}
              >
                <QueryClientProvider client={queryClient}>
                  <NetworkProvider>
                    <Toaster
                      position="top-right"
                      toastOptions={{
                        style: {
                          border: "1px solid #FFFFFF",
                          color: "#FFFFFF",
                          fontWeight: "bold",
                          backgroundColor: "#AA6938",
                          padding: "12px",
                          fontSize: "18px",
                        },
                      }}
                    />
                    {children}
                  </NetworkProvider>
                </QueryClientProvider>
              </SeiWalletProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
