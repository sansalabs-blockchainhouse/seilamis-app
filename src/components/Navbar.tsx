import { WalletConnectButton, useWallet } from "@sei-js/react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const { accounts } = useWallet();

  return (
    <div className="navbar bg-transparent px-5 py-0">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
          </ul>
        </div>
        <Link href={"/"}>
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
