import { WalletConnectButton, useWallet } from "@sei-js/react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const { accounts } = useWallet();

  return (
    <div className="navbar bg-transparent px-1 py-0">
      <div className="navbar-start">
        <div className="dropdown">
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
          </ul>
        </div>
        <Link href={"https://www.blckmrkt.io/"}>
          <img src="/logo.png" className="h-32" />
        </Link>
      </div>
      <div className="navbar-end text-black gap-2">
        {accounts.length > 0 && (
          <Link
            href={"/create"}
            className="bg-primary rounded-lg p-4 font-bold text-white uppercase"
          >
            Create
          </Link>
        )}

        <WalletConnectButton buttonClassName="bg-primary rounded-lg p-4 font-bold text-white uppercase" />
      </div>
    </div>
  );
}
