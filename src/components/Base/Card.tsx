"use client";

import { formatDateDifference } from "@/utils/formatDateDifference";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdVerified } from "react-icons/md";
import { formatWallet } from "@/utils/formatWallet";
import CopyToClipboard from "react-copy-to-clipboard";
import { IRaffleBase } from "@/types";
import { getRafflePriceBase } from "@/utils/getRafflePrice";
import localFont from "next/font/local";

const arcade = localFont({
  src: "../../../public/ARCADE_N.ttf",
  variable: "--font-arcade",
});

export default function CardBase({
  image,
  name,
  collectionName,
  price,
  ticketsSold,
  startTime,
  endTime,
  winner,
  raffleType,
  paymentToken,
  id,
}: IRaffleBase) {
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

  return (
    <div className={`${arcade.className} rounded-xl bg-black border-none`}>
      <div
        className="flex flex-col w-7 bg-transparent pb-3 relative border-4 border-[#0052FF]"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          width: "18rem",
          height: "18rem",
        }}
      ></div>
      <div className="flex flex-col px-3 py-3">
        <div
          className={`text-[#0052FF] flex w-fit p-1 items-center gap-2 rounded-lg text-xs`}
        >
          <span>{collectionName}</span>
          <span className="text-green-300">
            <MdVerified />
          </span>
        </div>
        <span className={`text-white font-bold text-sm mt-2`}>{name}</span>
        <div className={`flex justify-between text-white text-sm`}>
          <span>Price</span>
          <span className="font-bold">
            {getRafflePriceBase(raffleType, price, paymentToken as string)}
          </span>
        </div>
        <div className={`flex justify-between text-white text-sm`}>
          <span>Tickets</span>
          <span className="font-bold">{ticketsSold}</span>
        </div>
        {winner === "0x0000000000000000000000000000000000000000" && (
          <div className={`flex justify-between text-white text-xs mt-2`}>
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
      <div className="flex justify-between  py-3">
        {winner && winner === "0x0000000000000000000000000000000000000000" && (
          <Link
            href={`/base/${id}`}
            className="pixel-btn w-full flex items-center justify-center"
            style={{ backgroundColor: "#0052FF" }}
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
