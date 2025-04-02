"use client";

import { formatDateDifference } from "@/utils/formatDateDifference";
import { useWallet } from "@sei-js/react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdVerified } from "react-icons/md";
import { formatWallet } from "@/utils/formatWallet";
import CopyToClipboard from "react-copy-to-clipboard";
import { useNetworkContext } from "@/contexts/Network";

interface ICard {
  id: string;
  imgUrl: string;
  name: string;
  collectionName: string;
  price: number;
  ticketsSold: number;
  startTime: string;
  creator: string;
  endTime: string;
  winner?: string;
  isVerified?: boolean;
}

export default function Card({
  imgUrl,
  name,
  collectionName,
  price,
  ticketsSold,
  startTime,
  endTime,
  winner,
  creator,
  id,
  isVerified,
}: ICard) {
  const { accounts } = useWallet();
  const { selectedNetwork } = useNetworkContext();
  const isSei = selectedNetwork === "sei";

  const [timeDifference, setTimeDifference] = useState(
    formatDateDifference(startTime, endTime)
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!winner) {
      const interval = setInterval(() => {
        setTimeDifference(formatDateDifference(startTime, endTime));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, endTime, winner]);

  return (
    <div
      className={`rounded-xl flex flex-col justify-between w-[18rem] min-h-[550px] ${
        isVerified ? "border-2 border-sei relative" : "border border-primary"
      } ${isSei ? "" : "bg-black border-none"}`}
    >
      <div
        className="flex flex-col w-7 bg-transparent pb-3 border-transparent rounded-t-xl relative"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          width: "18rem",
          height: "18rem",
        }}
      >
        {isVerified && (
          <img src="/hand.png" className="h-14 absolute top-2 right-2" />
        )}
      </div>
      <div className="flex flex-col px-3 py-3">
        <div
          className={`${
            isSei ? "bg-primary" : "bg-secondary"
          } flex w-fit p-1 items-center gap-2 rounded-lg text-sm`}
        >
          <span>{collectionName}</span>
          <span className="text-green-300">
            <MdVerified />
          </span>
        </div>
        <span
          className={`${
            isSei ? "text-black" : "text-white"
          } font-bold text-xl mt-2 flex-wrap`}
        >
          {name}
        </span>
        <div
          className={`flex justify-between ${
            isSei ? "text-black" : "text-white"
          }`}
        >
          <span>Ticket price</span>
          <span className="font-bold">
            {price} {isSei ? "SEI" : "POL"}
          </span>
        </div>
        <div
          className={`flex justify-between ${
            isSei ? "text-black" : "text-white"
          }`}
        >
          <span>Tickets</span>
          <span className="font-bold">{ticketsSold}</span>
        </div>
        {!winner && (
          <div
            className={`flex justify-between ${
              isSei ? "text-black" : "text-white"
            }`}
          >
            <span>Ends in</span>
            <span suppressHydrationWarning={true}>{timeDifference}</span>
          </div>
        )}
        {winner && (
          <div className="flex justify-between text-black">
            <span>Winner</span>
            <CopyToClipboard
              text={winner}
              onCopy={() => toast.success("Successfully copied to clipboard")}
            >
              <span className="cursor-pointer">{formatWallet(winner)}</span>
            </CopyToClipboard>
          </div>
        )}
      </div>
      <div className="flex justify-between px-3 py-3">
        {!winner && (
          <Link
            href={`/raffles/${id}`}
            className={`${
              isSei ? "bg-primary" : "bg-secondary"
            } flex items-center justify-center rounded-lg p-3 w-full`}
          >
            View
          </Link>
        )}
        {winner && (
          <button
            className={`${
              isSei ? "bg-primary" : "bg-secondary"
            } rounded-lg p-3 w-full`}
          >
            Ended
          </button>
        )}
      </div>
    </div>
  );
}
