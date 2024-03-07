"use client";

import { api } from "@/services/api";
import { formatDateDifference } from "@/utils/formatDateDifference";
import { calculateFee } from "@cosmjs/stargate";
import { useSigningClient, useWallet } from "@sei-js/react";
import { useQueryClient } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdVerified } from "react-icons/md";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";

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
}: ICard) {
  const { accounts } = useWallet();

  const { signingClient } = useSigningClient();

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

  const handleBuy = useCallback(async () => {
    try {
      if (!accounts.length) {
        return toast.error("Connect your wallet");
      }

      if (!signingClient) {
        return toast.error("Something went wrong");
      }

      toast.loading("Sending...");
      const fee = calculateFee(200000, "0.1usei");
      const totalPrice = price * 1e6 * Number(1);

      const messages = [
        {
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: {
            fromAddress: accounts[0].address,
            toAddress: creator,
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
        amount: 1,
        raffleId: id,
      };

      await api.post("raffle-entry", body);

      toast.dismiss();

      toast.success("Success!");
      await queryClient.prefetchQuery({
        queryKey: ["raffles-list"],
      });
    } catch (error: any) {
      console.log(error);
      toast.dismiss();

      if (error.name === "AxiosError") {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [accounts, signingClient]);

  return (
    <div className="rounded-xl border border-primary">
      <div
        className="flex flex-col w-7 bg-transparent pb-3 border-transparent rounded-t-xl relative"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          width: "18rem",
          height: "18rem",
        }}
      ></div>
      <div className="flex flex-col px-3 py-3">
        <div className="bg-primary flex w-fit p-1 items-center gap-2 rounded-lg text-sm">
          <span>{collectionName}</span>
          <span className="text-green-300">
            <MdVerified />
          </span>
        </div>
        <span className="text-black font-bold text-xl mt-2">{name}</span>
        <div className="flex justify-between text-black">
          <span>Ticket price</span>
          <span className="font-bold">{price} SEI</span>
        </div>
        <div className="flex justify-between text-black">
          <span>Tickets</span>
          <span className="font-bold">{ticketsSold}</span>
        </div>
        {!winner && (
          <div className="flex justify-between text-black">
            <span>Ends in</span>
            <span>{timeDifference}</span>
          </div>
        )}
      </div>
      <div className="flex justify-between px-3 py-3">
        <button
          disabled={winner ? false : true}
          onClick={handleBuy}
          className="bg-primary rounded-lg p-3 w-44 hover:"
        >
          Buy
        </button>
        <Link
          href={`/raffles/${id}`}
          className="flex items-center justify-center bg-primary rounded-lg p-3 w-20"
        >
          View
        </Link>
      </div>
    </div>
  );
}
