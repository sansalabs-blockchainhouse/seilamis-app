"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { SeiWalletProvider } from "@sei-js/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import NetworkProvider from "@/contexts/Network";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
              <div className="fixed bottom-10 right-2 z-10 rounded-full p-2 cursor-pointer">
                <img
                  src="/floating.png"
                  className="h-48 animate-bounce animate-infinite animate-duration-[6000ms] animate-ease-linear"
                />
              </div>
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
      </body>
    </html>
  );
}
