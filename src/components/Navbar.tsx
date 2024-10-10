"use client";

import { useNetworkContext } from "@/contexts/Network";
import { WalletConnectButton, useWallet } from "@sei-js/react";
import Link from "next/link";
import React from "react";
import { ConnectButton } from "./Polygon/Connect";
import { useAccount } from "wagmi";

export default function Navbar() {
  const { accounts } = useWallet();
  const { address } = useAccount();

  const { isSei, setIsSei } = useNetworkContext();

  const lightIcon = (
    <img src={"/poly.png"} className="h-10" alt="polygon logo" />
  );
  const darkIcon = <img src={"/sei.png"} className="h-10" alt="sei logo" />;

  return (
    <div className="navbar  px-1 py-0">
      <div className="navbar-start">
        <Link href={"https://www.blckmrkt.io/"}>
          {isSei && <img src="/logo@1.png" className="h-32" />}
          {!isSei && <img src="/logo@2.png" className="h-32" />}
        </Link>
      </div>
      <div className="navbar-end text-black gap-6">
        <button
          className={`flex h-10 w-20 items-center rounded-full shadow transition duration-300 focus:outline-none ${
            isSei ? "bg-white" : "bg-[#130829] border borde-2"
          }`}
          onClick={() => setIsSei((prev) => !prev)}
        >
          <div
            className={`h-12 w-12 transform rounded-full p-1 text-white transition duration-500 ${
              isSei
                ? "translate-x-full bg-white"
                : "-translate-x-1 bg-[#0E061E]"
            }`}
            id="switch-toggle"
          >
            {isSei ? darkIcon : lightIcon}
          </div>
        </button>
        {isSei && accounts.length > 0 && (
          <Link
            href={"/create"}
            className={`bg-primary flex items-center justify-center rounded-lg p-4 font-bold text-white uppercase h-14 w-40`}
          >
            Create
          </Link>
        )}

        {!isSei && address && address.length > 0 && (
          <Link
            href={"/"}
            className={`bg-secondary flex items-center justify-center rounded-lg p-4 font-bold text-white uppercase h-14 w-40`}
          >
            Create
          </Link>
        )}
        {isSei && (
          <WalletConnectButton buttonClassName="bg-primary rounded-lg p-4 font-bold text-white uppercase h-14 w-40" />
        )}

        {!isSei && <ConnectButton />}
      </div>
    </div>
  );
}
