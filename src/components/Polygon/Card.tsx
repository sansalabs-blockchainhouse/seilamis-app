"use client";

import { formatDateDifference } from "@/utils/formatDateDifference";
import { useSigningClient, useWallet } from "@sei-js/react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdVerified } from "react-icons/md";
import { formatWallet } from "@/utils/formatWallet";
import CopyToClipboard from "react-copy-to-clipboard";
import { IRafflePolygon } from "@/types";
import { getRafflePrice } from "@/utils/getRafflePrice";

export default function CardPolygon({
  image,
  name,
  collectionName,
  price,
  ticketsSold,
  startTime,
  endTime,
  winner,
  raffleType,
  id,
}: IRafflePolygon) {
  const { accounts } = useWallet();

  const { signingClient } = useSigningClient();

  const [timeDifference, setTimeDifference] = useState(
    formatDateDifference(startTime, endTime)
  );

  useEffect(() => {
    if (winner === "0x0000000000000000000000000000000000000000") {
      const interval = setInterval(() => {
        setTimeDifference(formatDateDifference(startTime, endTime));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, endTime, winner]);

  const handleBuy = useCallback(async () => {}, []);

  return (
    <div className={`rounded-xl bg-black border-none`}>
      <div
        className="flex flex-col w-7 bg-transparent pb-3 border-transparent rounded-t-xl relative"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          width: "18rem",
          height: "18rem",
        }}
      ></div>
      <div className="flex flex-col px-3 py-3">
        <div
          className={`bg-secondary flex w-fit p-1 items-center gap-2 rounded-lg text-sm`}
        >
          <span>{collectionName}</span>
          <span className="text-green-300">
            <MdVerified />
          </span>
        </div>
        <span className={`text-white font-bold text-xl mt-2`}>{name}</span>
        <div className={`flex justify-between text-white`}>
          <span>Ticket price</span>
          <span className="font-bold">{getRafflePrice(raffleType, price)}</span>
        </div>
        <div className={`flex justify-between text-white`}>
          <span>Tickets</span>
          <span className="font-bold">{ticketsSold}</span>
        </div>
        {winner === "0x0000000000000000000000000000000000000000" && (
          <div className={`flex justify-between text-white`}>
            <span>Ends in</span>
            <span suppressHydrationWarning={true}>{timeDifference}</span>
          </div>
        )}
        {winner && winner !== "0x0000000000000000000000000000000000000000" && (
          <div className={`flex justify-between text-white`}>
            <span>Winner</span>
            <CopyToClipboard
              text={winner!}
              onCopy={() => toast.success("Successfully copied to clipboard")}
            >
              <span className="cursor-pointer">{formatWallet(winner!)}</span>
            </CopyToClipboard>
          </div>
        )}
      </div>
      <div className="flex justify-between px-3 py-3">
        {winner && winner === "0x0000000000000000000000000000000000000000" && (
            <Link
              href={`/polygon/${id}`}
              className={`bg-secondary flex items-center justify-center rounded-lg p-3 w-full`}
            >
              View
            </Link>
        )}
        {winner && winner !== "0x0000000000000000000000000000000000000000" && (
          <button className={`bg-secondary rounded-lg p-3 w-full`}>
            Ended
          </button>
        )}
      </div>
    </div>
  );
}
