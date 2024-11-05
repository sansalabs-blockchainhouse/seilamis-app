"use client";
import React, { useCallback, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { GrFlag } from "react-icons/gr";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { calculateFee } from "@cosmjs/stargate";
import BigNumber from "bignumber.js";
import { useWallet, useSigningClient } from "@sei-js/react";
import toast from "react-hot-toast";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import CopyToClipboard from "react-copy-to-clipboard";
import Navbar from "@/components/Navbar";
import { useNetworkContext } from "@/contexts/Network";

interface IItem {
  id: string;
  collectionName: string;
  creator: string;
  name: string;
  image: string;
  price: number;
  startTime: string;
  endTime: string;
  winner?: string;
  ticketsSold: number;
}

export default function Raffle({ params }: { params: { id: string } }) {
  const { accounts } = useWallet();
  const { isSei } = useNetworkContext();

  const {
    data: raffle,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["raffle-id"],
    queryFn: (): Promise<IItem> =>
      api.get(`raffle/${params.id}`).then((response) => response.data),
    refetchOnWindowFocus: false,
  });

  const {
    data: tickets,
    refetch: refetchTickets,
    isLoading: isLoadingTickets,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: (): Promise<any[]> =>
      api.get(`raffle-entry/${params.id}`).then((response) => response.data),
    refetchOnWindowFocus: false,
  });

  const {
    data: userTickets,
    refetch: refetchUserTickets,
    isLoading: isLoadingUserTickets,
  } = useQuery({
    queryKey: ["user-tickets"],
    enabled: accounts.length > 0,
    queryFn: (): Promise<any> =>
      api
        .get(`raffle-entry/${accounts[0].address}/${params.id}`)
        .then((response) => response.data),
    refetchOnWindowFocus: false,
    initialData: 0,
  });

  const { signingClient } = useSigningClient();

  const [activeTab, setActiveTab] = useState("details");

  const [amount, setAmount] = useState("1");

  const active = `inline-block p-4 border-b-4 ${
    isSei ? "border-primary text-primary" : "border-secondary text-secondary"
  }  font-bold rounded-t-lg active cursor-pointer`;
  const inactive = `inline-block p-4 border-b-4 ${
    isSei ? "border-primary" : "border-secondary"
  } rounded-t-lg hover:text-gray-300 hover:border-gray-300 cursor-pointer`;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleBuy = useCallback(async () => {
    try {
      if (!accounts.length) {
        return toast.error("Connect your wallet");
      }

      if (!raffle || !signingClient) {
        return toast.error("Something went wrong");
      }

      if (raffle.winner) {
        return toast.error("Raffle is already finished");
      }

      toast.loading("Sending...");
      const fee = calculateFee(200000, "0.1usei");
      const totalPrice = raffle.price * 1e6 * Number(amount);

      const messages = [
        {
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: {
            fromAddress: accounts[0].address,
            toAddress: raffle.creator,
            amount: [
              {
                denom: "usei",
                amount: new BigNumber(totalPrice * 0.97).toString(),
              },
            ],
          },
        },
        {
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: {
            fromAddress: accounts[0].address,
            toAddress: "sei13hpc6h3dcd705hyugt9wac0dsyyp0fvg06c7dv",
            amount: [
              {
                denom: "usei",
                amount: new BigNumber(totalPrice * 0.03).toString(),
              },
            ],
          },
        },
      ];

      const response = await signingClient.sign(
        accounts[0].address,
        messages,
        fee,
        ""
      );

      const txRaw = TxRaw.fromPartial({
        bodyBytes: response.bodyBytes,
        authInfoBytes: response.authInfoBytes,
        signatures: response.signatures,
      });

      const txBytes = TxRaw.encode(txRaw).finish();

      const body = {
        wallet: accounts[0].address,
        tx: Object.values(txBytes),
        amount: Number(amount),
        raffleId: raffle.id,
      };

      await api.post("raffle-entry", body);

      toast.dismiss();

      toast.success("Success!");
      await refetch();
      await refetchTickets();
      await refetchUserTickets();
    } catch (error: any) {
      console.log(error);
      toast.dismiss();

      if (error.name === "AxiosError") {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [accounts, amount, signingClient]);

  if (!raffle) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!isLoading && raffle && (
        <div
          className={`flex min-h-screen flex-col items-center bg-cover bg-no-repeat ${
            isSei ? "bg-bg@1" : "bg-bg@2"
          }`}
        >
          <Navbar />

          <div className="flex flex-col items-start gap-4 justify-between p-5">
            <Link href={"/"} className="flex items-center gap-2">
              <span
                className={`${
                  isSei ? "text-black" : "text-white"
                } font-bold text-base`}
              >
                <IoArrowBackOutline />
              </span>
              <span
                className={`${
                  isSei ? "text-black" : "text-white"
                } font-bold text-base`}
              >
                Go back
              </span>
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
                    className={`${
                      isSei
                        ? "bg-primary border border-white border-opacity-20"
                        : "bg-black border border-white"
                    } w-20 text-xl text-center h-16 rounded-lg py-2 focus:outline-none text-white text-opacity-90`}
                  />
                  <button
                    disabled={raffle.winner ? true : false}
                    onClick={() => handleBuy()}
                    className={`${
                      isSei
                        ? "bg-primary border border-white border-opacity-20"
                        : "bg-black border border-white"
                    } flex-1 px-6 py-3 h-16 rounded-lg text-white hover:opacity-70 font-bold`}
                  >
                    Buy for {raffle.price * Number(amount)} SEI
                  </button>
                </div>
              </div>

              <div
                className={`${
                  isSei ? "bg-primary" : "bg-secondary"
                } flex flex-col p-5 w-full md:w-96 h-72 rounded-xl space-y-5 overflow-y-scroll`}
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
            <span
              className={`${
                isSei ? "text-black" : "text-white"
              } text-3xl font-bold`}
            >
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
                className={`flex flex-col gap-5 mt-5 ${
                  isSei ? "bg-primary" : "bg-black"
                } rounded-lg p-2`}
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
                      {Number(raffle.price)} SEI
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
                      {userTickets}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "participants" && tickets && (
              <div className={`relative ${isSei ? 'bg-primary' : 'bg-black'} overflow-x-auto mt-5`}>
                <table className="w-full text-sm text-justify rtl:text-right text-white">
                  <thead className="text-base font-bold text-white">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Wallet
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Tickets
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
                            {item.wallet.slice(0, 15) + "..."}
                          </th>
                        </CopyToClipboard>
                        <td className="px-6 py-4">{item.amount}</td>
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
