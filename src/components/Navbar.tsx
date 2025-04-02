import { usePathname } from "next/navigation";
import { useNetworkContext } from "@/contexts/Network";
import { WalletConnectButton, useWallet } from "@sei-js/react";
import Link from "next/link";
import React, { useState } from "react";
import { ConnectButton } from "./Polygon/Connect";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import BlockchainToggle from "./Toogle";

const navStyles = {
  sei: {
    logo: "/logo@1.png",
    createButton: "bg-primary text-white",
    freeTicketsButton: "bg-secondary text-white",
    walletButton: "bg-primary text-white",
  },
  polygon: {
    logo: "/logo@2.png",
    createButton: "bg-secondary text-white",
    freeTicketsButton: "bg-secondary text-white",
    walletButton: "bg-secondary text-white",
  },
  base: {
    logo: "/logo@3.png",
    createButton: "bg-white text-black",
    freeTicketsButton: "bg-white text-black",
    walletButton: "bg-white text-black",
  },
};

export default function Navbar() {
  const { accounts } = useWallet();
  const { address, isConnected } = useAccount();
  const { selectedNetwork } = useNetworkContext();
  const pathname = usePathname();

  const network = selectedNetwork;
  const styles = navStyles[network];

  const freeTicketsEndpoint = network !== "sei" ? network : "";
  const { data: freeTickets } = useQuery({
    queryKey: ["free-tickets", network, address],
    queryFn: (): Promise<number> =>
      api
        .get(`raffle/free-tickets/${freeTicketsEndpoint}/${address}`)
        .then((response) => response.data),
    refetchOnWindowFocus: false,
    enabled: isConnected && network !== "sei",
    initialData: 0,
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full mb-11 mt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="https://www.blckmrkt.io/">
              <img src={styles.logo} className="h-10 md:h-12 lg:h-16" alt="Logo" />
            </Link>
          </div>
          {/* Desktop/Tablet Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            {pathname === "/" && <BlockchainToggle />}
            {network === "sei" && accounts.length > 0 && (
              <Link
                href="/create"
                className={`${styles.createButton} flex items-center justify-center rounded-lg p-2 md:p-4 font-bold uppercase h-10 md:h-14 w-24 md:w-40`}
              >
                Create
              </Link>
            )}
            {network !== "sei" && freeTickets > 0 && address && address.length > 0 && (
              <div
                className={`${styles.freeTicketsButton} flex items-center justify-center rounded-lg p-2 md:p-4 font-bold uppercase h-10 md:h-14 w-24 md:w-40 cursor-pointer`}
              >
                {freeTickets} FREE TICKETS
              </div>
            )}
            {network !== "sei" && address && address.length > 0 && (
              <Link
                href={network === "polygon" ? "/create/polygon" : "/create/base"}
                className={`${styles.createButton} flex items-center justify-center rounded-lg p-2 md:p-4 font-bold uppercase h-10 md:h-14 w-24 md:w-40`}
              >
                Create
              </Link>
            )}
            {network === "sei" ? (
              <WalletConnectButton
                buttonClassName={`${styles.walletButton} rounded-lg p-2 md:p-4 font-bold uppercase h-10 md:h-14 w-24 md:w-40`}
              />
            ) : (
              <ConnectButton
                buttonClassName={`${styles.walletButton} rounded-lg p-2 md:p-4 font-bold uppercase h-10 md:h-14 w-24 md:w-40`}
              />
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {pathname === "/" && <BlockchainToggle />}
            {network === "sei" && accounts.length > 0 && (
              <Link
                href="/create"
                className={`${styles.createButton} block text-center rounded-lg p-2 font-bold uppercase`}
              >
                Create
              </Link>
            )}
            {network !== "sei" && freeTickets > 0 && address && address.length > 0 && (
              <div
                className={`${styles.freeTicketsButton} block text-center rounded-lg p-2 font-bold uppercase cursor-pointer`}
              >
                {freeTickets} FREE TICKETS
              </div>
            )}
            {network !== "sei" && address && address.length > 0 && (
              <Link
                href={network === "polygon" ? "/create/polygon" : "/create/base"}
                className={`${styles.createButton} block text-center rounded-lg p-2 font-bold uppercase`}
              >
                Create
              </Link>
            )}
            {network === "sei" ? (
              <WalletConnectButton
                buttonClassName={`${styles.walletButton} block text-center rounded-lg p-2 font-bold uppercase`}
              />
            ) : (
              <ConnectButton
                buttonClassName={`${styles.walletButton} block text-center rounded-lg p-2 font-bold uppercase`}
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
