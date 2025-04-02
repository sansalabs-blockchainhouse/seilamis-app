"use client";
import React, { useCallback, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { GrFlag } from "react-icons/gr";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import toast from "react-hot-toast";
import CopyToClipboard from "react-copy-to-clipboard";
import Navbar from "@/components/Navbar";
import { getRafflePriceBase } from "@/utils/getRafflePrice";
import { IRaffleBase } from "@/types";
import { useAccount, useWriteContract } from "wagmi";
import { base } from "viem/chains";
import { RAFFLE_BASE_ABI, RAFFLE_BASE_CONTRACT_ADDRESS } from "@/constants";
import { parseEther } from "viem";
import { useWaitForTransactionReceiptAsync } from "@/hooks/useWaitForTransactionReceiptAsync";
import localFont from "next/font/local";

const arcade = localFont({
  src: "../../../../public/ARCADE_N.ttf",
  variable: "--font-arcade",
});

export default function Raffle({ params }: { params: { id: string } }) {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { waitForTransactionReceipt } = useWaitForTransactionReceiptAsync();
  const { data: raffle, isLoading } = useQuery({
    queryKey: ["raffle-base-id"],
    queryFn: (): Promise<IRaffleBase> =>
      api
        .get(`raffle/by-id/base/${params.id}`)
        .then((response) => response.data),
    refetchOnWindowFocus: false,
  });

  const { data: tickets, refetch: refetchTickets } = useQuery({
    queryKey: ["tickets"],
    queryFn: (): Promise<any[]> =>
      api
        .get(`raffle-entry/history/base/${params.id}`)
        .then((response) => response.data),
    refetchOnWindowFocus: false,
  });

  const [activeTab, setActiveTab] = useState("details");

  const [amount, setAmount] = useState("1");

  const active = `inline-block p-4 border-b-4 border-base text-sm font-bold active cursor-pointer`;
  const inactive = `inline-block p-4 border-b-4 border-base hover:text-gray-300 text-sm hover:border-gray-300 cursor-pointer`;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleBuy = useCallback(async () => {
    if (!raffle) return;
    if (raffle.paymentToken === "0x0000000000000000000000000000000000000000") {
      toast.loading("Sending...", {
        style: {
          backgroundColor: "#0052FF",
        },
      });
      const data = await writeContractAsync({
        chainId: base.id,
        address: RAFFLE_BASE_CONTRACT_ADDRESS,
        functionName: "enterRaffle",
        abi: RAFFLE_BASE_ABI,
        args: [params.id, amount],
        value: parseEther(String(Number(amount) * raffle.price)) as any,
      });

      await waitForTransactionReceipt({ hash: data });
      toast.dismiss();
      toast.success("Success!", {
        style: {
          backgroundColor: "#0052FF",
        },
      });
    } else {
      const { data: tokenInfo } = await api.get(
        `token/baseAllowance/${address}/${raffle.paymentToken}`
      );

      if (tokenInfo.allowance < Number(amount) * raffle.price) {
        toast.loading("Sending...", {
          style: {
            backgroundColor: "#0052FF",
          },
        });
        const data = await writeContractAsync({
          chainId: base.id,
          address: raffle?.paymentToken as `0x${string}`,
          functionName: "approve",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
          args: [RAFFLE_BASE_CONTRACT_ADDRESS, tokenInfo.balanceOf],
        });

        await waitForTransactionReceipt({ hash: data });
        toast.dismiss();
        toast.success("Success!", {
          style: {
            backgroundColor: "#0052FF",
          },
        });
      }

      toast.loading("Sending..."),
        {
          style: {
            backgroundColor: "#0052FF",
          },
        };

      const data = await writeContractAsync({
        chainId: base.id,
        address: RAFFLE_BASE_CONTRACT_ADDRESS,
        functionName: "enterRaffleErc20",
        abi: RAFFLE_BASE_ABI,
        args: [params.id, amount],
      });

      await waitForTransactionReceipt({ hash: data });
      toast.dismiss();
      toast.success("Success!", {
        style: {
          backgroundColor: "#0052FF",
        },
      });
    }
  }, [raffle, amount, refetchTickets]);

  if (!raffle) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!isLoading && raffle && (
        <div
          className={`bg-black flex min-h-screen flex-col items-center  ${arcade.className} `}
        >
          <Navbar />

          <div
            className={`flex flex-col items-start gap-4 justify-between p-5`}
          >
            <Link href={"/"} className="flex items-center gap-2">
              <span className={`text-white font-bold text-base`}>
                <IoArrowBackOutline />
              </span>
              <span className={`text-white font-bold text-base`}>Go back</span>
            </Link>
            <div className="flex flex-col md:flex-row items-start gap-5 justify-between">
              <div className="flex flex-col w-full md:w-auto">
                <div
                  className="w-full bg-bottom  md:w-80 h-80 flex items-center justify-center flex-col gap-4"
                  style={{
                    backgroundImage: `url(${raffle.image})`,
                    backgroundSize: "cover",
                    borderRadius: "8px",
                  }}
                />
                <div className="flex items-center mt-2 gap-2">
                  <input
                    placeholder="qty"
                    type="text"
                    value={amount}
                    pattern="[0-9]*"
                    onChange={(e) => setAmount(e.target.value)}
                    className={`bg-black border border-white w-20 text-lg text-center h-16 py-2 focus:outline-none text-white text-opacity-90`}
                  />
                  <button
                    onClick={handleBuy}
                    className={`bg-black border border-white flex-1 px-6 py-3 h-16 text-white hover:opacity-70 font-bold`}
                  >
                    Buy
                  </button>
                </div>
              </div>

              <div
                className={`bg-base flex flex-col p-5 w-full md:w-96 h-72 space-y-5 overflow-y-scroll pixel-btn`}
              >
                <span className="text-white font-bold text-sm">
                  Terms and conditions
                </span>
                <span className="text-white text-sm font-normal">
                  1. All NFT prizes are held by raffle in escrow and and will be
                  sent automatically after winner is drawn.
                </span>
                <span className="text-white text-sm font-normal">
                  2. Raffle tickets cannot be refunded once bought.
                </span>
                <span className="text-white text-sm font-normal">
                  3. Raffle tickets will not be refunded if you did not win the
                  raffle.
                </span>
                <span className="text-white text-sm font-normal">
                  4. This raffle platform is unique. When the timer expires, the
                  raffle will be drawn. No ticket minimums or maximums are
                  enforced.
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-2 gap-2 bg-card_bg p-5 w-full md:w-1/2">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="text-white mt-1 text-sm font-semibold">
                  <RiVerifiedBadgeFill />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-700 mt-1 text-sm font-semibold">
                  <GrFlag />
                </span>
                <span className="text-red-700 mt-1 text-sm font-semibold">
                  Report
                </span>
              </div>
            </div>
            <span className={`text-white text-lg font-bold`}>
              {raffle.name}
            </span>

            <div className="font-bold text-center text-gray-500 ">
              <ul className="flex flex-wrap gap-2">
                <li onClick={() => handleTabClick("details")}>
                  <a className={activeTab === "details" ? active : inactive}>
                    Details
                  </a>
                </li>
                <li onClick={() => handleTabClick("participants")}>
                  <a
                    className={activeTab === "participants" ? active : inactive}
                  >
                    Participants
                  </a>
                </li>
              </ul>
            </div>

            {activeTab === "details" && (
              <div className={`flex flex-col gap-5 mt-5 bg-black p-2`}>
                <div className="flex gap-10 flex-col md:flex-row">
                  <div className="flex flex-col gap-2">
                    <span className="text-white font-bold text-opacity-50 text-base">
                      Raffle draws in:
                    </span>
                    <span className="text-white font-bold text-base">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        timeZoneName: "short",
                        timeZone: "UTC",
                      }).format(new Date(raffle?.endTime))}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-white font-bold text-opacity-50 text-base">
                      Ticket cost:
                    </span>
                    <span className="text-white text-lg font-bold">
                      {getRafflePriceBase(
                        raffle.raffleType,
                        raffle.price,
                        raffle.paymentToken as string
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-white font-bold text-opacity-50 text-base">
                      Tickets sold:
                    </span>
                    <span className="text-white font-bold text-lg">
                      {raffle.ticketsSold}
                    </span>
                  </div>
                </div>
                <div className="flex gap-10 flex-col md:flex-row">
                  <div className="flex flex-col gap-2">
                    <span className="text-white font-bold text-opacity-50 text-base">
                      Raffler
                    </span>
                    <CopyToClipboard
                      text={raffle.creator}
                      onCopy={() =>
                        toast.success("Successfully copied to clipboard")
                      }
                    >
                      <span className="text-white font-bold text-lg">
                        {raffle.creator.slice(0, 5)}...
                      </span>
                    </CopyToClipboard>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-white font-bold text-opacity-50 text-base">
                      Your tickets:
                    </span>
                    <span className="text-white font-bold text-lg">
                      {isConnected && tickets
                        ? tickets?.filter(
                            (t) => t.toLowerCase() === address?.toLowerCase()
                          ).length
                        : 0}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "participants" && tickets && (
              <div className={`relative bg-black overflow-x-auto mt-5`}>
                <table className="w-full text-sm text-justify rtl:text-right text-white">
                  <thead className="text-base font-bold text-white">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Wallet
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {tickets.map((item, index) => (
                      <tr className="bg-table_bg" key={index}>
                        <CopyToClipboard
                          text={item.wallet}
                          onCopy={() =>
                            toast.success("Successfully copied to clipboard")
                          }
                        >
                          <th className="px-6 py-4 cursor-pointer">
                            {item.slice(0, 25) + "..."}
                          </th>
                        </CopyToClipboard>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
