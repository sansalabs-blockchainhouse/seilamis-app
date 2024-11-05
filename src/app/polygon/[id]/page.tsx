"use client";
import React, { useCallback, useRef, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { GrFlag } from "react-icons/gr";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import toast from "react-hot-toast";
import CopyToClipboard from "react-copy-to-clipboard";
import Navbar from "@/components/Navbar";
import { getRafflePrice } from "@/utils/getRafflePrice";
import { IRafflePolygon } from "@/types";
import { useAccount, useWriteContract } from "wagmi";
import Image from "next/image";
import { polygon } from "viem/chains";
import {
  HITCOIN_POLYGON_ABI,
  HITCOIN_POLYGON_CONTRACT_ADDRESS,
  RAFFLE_POLYGON_ABI,
  RAFFLE_POLYGON_CONTRACT_ADDRESS,
} from "@/constants";
import { parseEther } from "viem";
import { useWaitForTransactionReceiptAsync } from "@/hooks/useWaitForTransactionReceiptAsync";

export default function Raffle({ params }: { params: { id: string } }) {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { waitForTransactionReceipt } = useWaitForTransactionReceiptAsync();
  const {
    data: raffle,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["raffle-polygon-id"],
    queryFn: (): Promise<IRafflePolygon> =>
      api
        .get(`raffle/by-id/polygon/${params.id}`)
        .then((response) => response.data),
    refetchOnWindowFocus: false,
  });

  const {
    data: tickets,
    refetch: refetchTickets,
    isLoading: isLoadingTickets,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: (): Promise<any[]> =>
      api
        .get(`raffle-entry/history/polygon/${params.id}`)
        .then((response) => response.data),
    refetchOnWindowFocus: false,
  });

  const [activeTab, setActiveTab] = useState("details");

  const [amount, setAmount] = useState("1");
  const [payment, setPayment] = useState<"POL" | "HIT" | "TICKET">("POL");

  const active = `inline-block p-4 border-b-4 border-secondary text-secondary font-bold rounded-t-lg active cursor-pointer`;
  const inactive = `inline-block p-4 border-b-4 border-secondary rounded-t-lg hover:text-gray-300 hover:border-gray-300 cursor-pointer`;

  const modal = useRef<HTMLDialogElement>(null);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleBuy = useCallback(async () => {
    if (!raffle) return;
    if (payment === "POL") {
      toast.loading("Sending...", {
        style: {
          backgroundColor: "#722AA3",
        },
      });
      const data = await writeContractAsync({
        chainId: polygon.id,
        address: RAFFLE_POLYGON_CONTRACT_ADDRESS,
        functionName: "enterRaffle",
        abi: RAFFLE_POLYGON_ABI,
        args: [params.id, amount],
        value: parseEther(String(Number(amount) * raffle.price[0])) as any,
      });

      await waitForTransactionReceipt({ hash: data });
      toast.dismiss();
      toast.success("Success!", {
        style: {
          backgroundColor: "#722AA3",
        },
      });
    } else if (payment === "HIT") {
      const { data: tokenInfo } = await api.get(`token/allowance/${address}`);

      if (tokenInfo.allowance < Number(amount) * raffle.price[1]) {
        toast.loading("Sending...", {
          style: {
            backgroundColor: "#722AA3",
          },
        });
        const data = await writeContractAsync({
          chainId: polygon.id,
          address: HITCOIN_POLYGON_CONTRACT_ADDRESS,
          functionName: "increaseAllowance",
          abi: HITCOIN_POLYGON_ABI,
          args: [RAFFLE_POLYGON_CONTRACT_ADDRESS, tokenInfo.balanceOf],
        });

        await waitForTransactionReceipt({ hash: data });
        toast.dismiss();
        toast.success("Success!", {
          style: {
            backgroundColor: "#722AA3",
          },
        });
      }

      toast.loading("Sending..."),
        {
          style: {
            backgroundColor: "#722AA3",
          },
        };

      const data = await writeContractAsync({
        chainId: polygon.id,
        address: RAFFLE_POLYGON_CONTRACT_ADDRESS,
        functionName: "enterRaffleErc20",
        abi: RAFFLE_POLYGON_ABI,
        args: [params.id, amount],
      });

      await waitForTransactionReceipt({ hash: data });
      toast.dismiss();
      toast.success("Success!", {
        style: {
          backgroundColor: "#722AA3",
        },
      });
    } else if (payment === "TICKET") {
      toast.loading("Sending...", {
        style: {
          backgroundColor: "#722AA3",
        },
      });

      const data = await writeContractAsync({
        chainId: polygon.id,
        address: RAFFLE_POLYGON_CONTRACT_ADDRESS,
        functionName: "enterRaffleFreeTickets",
        abi: RAFFLE_POLYGON_ABI,
        args: [params.id, amount],
      });

      await waitForTransactionReceipt({ hash: data });

      toast.dismiss();
      toast.success("Success!", {
        style: {
          backgroundColor: "#722AA3",
        },
      });
      await refetchTickets();
    }

    if (modal.current) {
      modal.current.close();
    }
  }, [raffle, payment, amount, refetchTickets]);

  if (!raffle) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!isLoading && raffle && (
        <div
          className={`flex min-h-screen flex-col items-center bg-cover bg-no-repeat bg-bg@2`}
        >
          <Navbar />

          <div className="flex flex-col items-start gap-4 justify-between p-5">
            <Link href={"/"} className="flex items-center gap-2">
              <span className={`text-white font-bold text-base`}>
                <IoArrowBackOutline />
              </span>
              <span className={`text-white font-bold text-base`}>Go back</span>
            </Link>
            <div className="flex flex-col md:flex-row items-start gap-5 justify-between">
              <div className="flex flex-col w-full md:w-auto">
                <div
                  className="w-full bg-bottom  md:w-80 h-80 rounded-xl flex items-center justify-center flex-col gap-4"
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
                    className={`bg-black border border-white w-20 text-xl text-center h-16 rounded-lg py-2 focus:outline-none text-white text-opacity-90`}
                  />
                  <button
                    // disabled={raffle.winner ? true : false}
                    onClick={() => {
                      if (modal.current) {
                        modal.current.showModal();
                      }
                    }}
                    className={`bg-black border border-white flex-1 px-6 py-3 h-16 rounded-lg text-white hover:opacity-70 font-bold`}
                  >
                    Buy
                  </button>
                </div>
              </div>

              <div
                className={`bg-secondary flex flex-col p-5 w-full md:w-96 h-72 rounded-xl space-y-5 overflow-y-scroll`}
              >
                <span className="text-white font-bold text-sm">
                  Terms and conditions
                </span>
                <span className="text-white text-base font-normal">
                  1. All NFT prizes are held by raffle in escrow and and will be
                  sent automatically after winner is drawn.
                </span>
                <span className="text-white text-base font-normal">
                  2. Raffle tickets cannot be refunded once bought.
                </span>
                <span className="text-white text-base font-normal">
                  3. Raffle tickets will not be refunded if you did not win the
                  raffle.
                </span>
                <span className="text-white text-base font-normal">
                  4. This raffle platform is unique. When the timer expires, the
                  raffle will be drawn. No ticket minimums or maximums are
                  enforced.
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-2 gap-2 bg-card_bg p-5 rounded-lg w-full md:w-1/2">
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
            <span className={`text-white text-3xl font-bold`}>
              {raffle.name}
            </span>

            <div className="text-c font-bold text-center text-gray-500 ">
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
              <div
                className={`flex flex-col gap-5 mt-5 bg-black rounded-lg p-2`}
              >
                <div className="flex gap-10 flex-col md:flex-row">
                  <div className="flex flex-col gap-2">
                    <span className="text-white font-bold text-opacity-50 text-lg">
                      Raffle draws in:
                    </span>
                    <span className="text-white font-bold text-xl">
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
                    <span className="text-white font-bold text-opacity-50 text-lg">
                      Ticket cost:
                    </span>
                    <span className="text-white text-xl font-bold">
                      {getRafflePrice(raffle.raffleType, raffle.price)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-white font-bold text-opacity-50 text-lg">
                      Tickets sold:
                    </span>
                    <span className="text-white font-bold text-xl">
                      {raffle.ticketsSold}
                    </span>
                  </div>
                </div>
                <div className="flex gap-10 flex-col md:flex-row">
                  <div className="flex flex-col gap-2">
                    <span className="text-white font-bold text-opacity-50 text-lg">
                      Raffler
                    </span>
                    <CopyToClipboard
                      text={raffle.creator}
                      onCopy={() =>
                        toast.success("Successfully copied to clipboard")
                      }
                    >
                      <span className="text-white font-bold text-xl">
                        {raffle.creator.slice(0, 5)}...
                      </span>
                    </CopyToClipboard>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-white font-bold text-opacity-50 text-lg">
                      Your tickets:
                    </span>
                    <span className="text-white font-bold text-xl">
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

      <dialog id="my_modal_1" className="modal" ref={modal}>
        <div className="modal-box flex flex-col items-center justify-center bg-secondary">
          <h3 className="font-bold text-lg">Payment Method</h3>
          <div className="flex gap-5 mt-4">
            <div
              onClick={() => setPayment("POL")}
              className={`flex gap-1 flex-col items-center justify-center bg-black ${
                payment == "POL" ? "bg-opacity-100" : "bg-opacity-35"
              }  rounded-lg py-2 w-28 cursor-pointer`}
            >
              <Image alt="pol" src="/pol.png" width={80} height={80} />
              <span className="">POL</span>
            </div>
            <div
              onClick={() => setPayment("HIT")}
              className={`flex gap-1 flex-col items-center justify-center bg-black ${
                payment == "HIT" ? "bg-opacity-100" : "bg-opacity-35"
              }  rounded-lg py-2 w-28 cursor-pointer`}
            >
              <Image alt="hitcoin" src="/hitcoin.png" width={80} height={80} />
              <span>HITCOIN</span>
            </div>
            <div
              onClick={() => setPayment("TICKET")}
              className={`flex gap-1 flex-col items-center justify-center bg-black ${
                payment == "TICKET" ? "bg-opacity-100" : "bg-opacity-35"
              }  rounded-lg py-2 w-28 cursor-pointer`}
            >
              <Image alt="ticket" src="/ticket.png" width={78} height={78} />
              <span>TICKETS</span>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
            <button onClick={handleBuy} className="btn">
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
