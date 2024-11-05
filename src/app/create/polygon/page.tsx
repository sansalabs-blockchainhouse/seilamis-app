"use client";
import React, { useCallback, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import toast from "react-hot-toast";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { formatReadableDate } from "@/utils/formatDate";
import { useAccount, useWriteContract } from "wagmi";
import Modal from "@/components/Polygon/Modal";
import { api } from "@/services/api";
import Web3 from "web3";
import { polygon } from "viem/chains";
import { useWaitForTransactionReceiptAsync } from "@/hooks/useWaitForTransactionReceiptAsync";
import {
  RAFFLE_POLYGON_ABI,
  RAFFLE_POLYGON_CONTRACT_ADDRESS,
} from "@/constants";

export default function Create() {
  const { writeContractAsync } = useWriteContract();
  const { waitForTransactionReceipt } = useWaitForTransactionReceiptAsync();

  const { isConnected, address } = useAccount();

  const [currentNft, setCurrentNft] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [raffleType, setRaffleType] = useState("0");
  const [polPrice, setPolPrice] = useState<string>("1");
  const [hitcoinPrice, setHitcoinPrice] = useState<string>("1");

  const [endDate, setEndDate] = useState(new Date());
  const [currentDate, _setCurrentDate] = useState(new Date());
  const [days, setDays] = useState(0);

  const [terms, setTerms] = useState<boolean>(false);

  const handleCreateRaffle = useCallback(async () => {
    if (!isConnected)
      return toast.error("Connect your wallet", {
        style: {
          backgroundColor: "#722AA3",
        },
      });

    if (!currentNft)
      return toast.error("Select a nft", {
        style: {
          backgroundColor: "#722AA3",
        },
      });

    if (days === 0)
      return toast.error("Select a duration", {
        style: {
          backgroundColor: "#722AA3",
        },
      });

    const { data } = await api.get(
      `raffle-polygon-verified/approved/${currentNft.address}/${address}`
    );

    if (!data.isApprovedForAll) {
      toast.loading("Sending...", {
        style: {
          backgroundColor: "#722AA3",
        },
      });
      const response = await writeContractAsync({
        chainId: polygon.id,
        address: currentNft.address,
        functionName: "setApprovalForAll",
        abi: JSON.parse(data.abi),
        args: ["0xb3F4f5A54AdeD07FF5A85DABf2874dFA830700B1", true],
      });

      await waitForTransactionReceipt({ hash: response });
      toast.dismiss();
      toast.success("Success!", {
        style: {
          backgroundColor: "#722AA3",
        },
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
    toast.loading("Sending...", {
      style: {
        backgroundColor: "#722AA3",
      },
    });

    const parsedPolPrice = Web3.utils.toWei(polPrice.toString(), "ether");
    const parsedHitcoinPrice = Web3.utils.toWei(
      hitcoinPrice.toString(),
      "ether"
    );

    const parsedStartDate = Math.floor(new Date().getTime() / 1000);
    const parsedEndDate = Math.floor(new Date(endDate).getTime() / 1000);
    let price;

    if (raffleType === "0" || raffleType === "2") {
      price = [parsedPolPrice, 0];
    } else if (raffleType === "1" || raffleType === "3") {
      price = [0, parsedHitcoinPrice];
    } else {
      price = [parsedPolPrice, parsedHitcoinPrice];
    }

    const response = await writeContractAsync({
      chainId: polygon.id,
      address: RAFFLE_POLYGON_CONTRACT_ADDRESS,
      functionName: "createRaffle",
      abi: RAFFLE_POLYGON_ABI,
      args: [
        currentNft.address,
        currentNft.tokenId,
        price,
        currentNft.name,
        currentNft.image,
        parsedStartDate,
        parsedEndDate,
        raffleType,
        currentNft.type,
      ],
    });

    await waitForTransactionReceipt({ hash: response });
    toast.dismiss();
    toast.success("Success!", {
      style: {
        backgroundColor: "#722AA3",
      },
    });
  }, [currentNft, address, days, raffleType, polPrice, hitcoinPrice, endDate]);

  const addDays = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setEndDate(newDate);
  };

  return (
    <>
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
          <div className="flex flex-col md:flex-row items-start gap-12 justify-between">
            {!currentNft && (
              <div
                onClick={() => {
                  if (!isConnected) {
                    return toast.error("Connect your wallet!");
                  }
                  setIsOpen(true);
                }}
                className={`bg-black w-full md:w-80 h-80 rounded-xl flex items-center justify-center flex-col gap-4`}
              >
                <span className="text-7xl text-white">
                  <IoIosAddCircleOutline />
                </span>
                <span className="text-white font-normal text-base">
                  Choose NFT for raffle
                </span>
              </div>
            )}
            {currentNft && (
              <div
                onClick={() => setIsOpen(true)}
                className="bg-card_bg w-full md:w-80 h-80 rounded-xl flex items-center justify-center flex-col gap-4"
                style={{
                  backgroundImage: `url(${currentNft.image})`,
                  backgroundSize: "cover",
                  borderRadius: "8px",
                }}
              ></div>
            )}

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
                2. Raffle tickets cannot be refunded once bought
              </span>
              <span className="text-white text-base font-normal">
                3. Raffle tickets will not be refunded if you did not win the
                raffle.
              </span>
              <span className="text-white text-base font-normal">
                4. When the timer expires, the raffle will be drawn. No ticket
                minimums or maximums are enforced
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between flex-col mt-5 gap-2 bg-card_bg p-5 rounded-lg w-full  md:w-1/2">
          <div className="flex gap-5 justify-between flex-col md:flex-row">
            <div className="flex flex-col w-full gap-2">
              <div className="flex flex-col">
                <label className={`text-white text-lg`}>
                  Raffle Type <span className="text-red-700">*</span>
                </label>

                <select
                  onChange={(e) => setRaffleType(e.target.value)}
                  value={raffleType}
                  aria-placeholder="select a raffle type"
                  className={`bg-secondary box-border border border-white border-opacity-20 rounded-lg py-2 focus:outline-none text-white text-opacity-90 px-4`}
                >
                  <option value="0">Pol</option>
                  <option value="1">Hitcoin</option>
                  <option value="2">Pol and Free Tickets</option>
                  <option value="3">Hitcoin and Free TIckets</option>
                  <option value="4">Pol or Hitcoin</option>
                  <option value="5">Pol or Hitcoin or Free Tickets</option>
                </select>
              </div>
              {(raffleType === "0" ||
                raffleType === "2" ||
                raffleType === "4" ||
                raffleType === "5") && (
                <div className="flex flex-col">
                  <label className={`text-white text-lg`}>
                    TIcket Price (Pol) <span className="text-red-700">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="1"
                    value={polPrice}
                    pattern="^[0-9]+([,.][0-9]+)?$"
                    onChange={(e) => setPolPrice(e.target.value)}
                    className={`bg-secondary box-border border border-white border-opacity-20 rounded-lg py-2 focus:outline-none text-white text-opacity-90 px-4`}
                  />
                </div>
              )}
              {(raffleType === "1" ||
                raffleType === "3" ||
                raffleType === "4" ||
                raffleType === "5") && (
                <div className="flex flex-col">
                  <label className={`text-white text-lg`}>
                    TIcket Price (Hitcoin)
                    <span className="text-red-700">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="1"
                    value={hitcoinPrice}
                    pattern="^[0-9]+([,.][0-9]+)?$"
                    onChange={(e) => setHitcoinPrice(e.target.value)}
                    className={`bg-secondary box-border border border-white border-opacity-20 rounded-lg py-2 focus:outline-none text-white text-opacity-90 px-4`}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className={`text-white text-lg`}>
                Raffle Duration <span className="text-red-700">*</span>
              </label>
              <div className="flex w-full gap-5">
                <button
                  onClick={() => {
                    setDays(1);
                    addDays(1);
                  }}
                  className={`${
                    days === 1
                      ? "bg-secondary text-white"
                      : "bg-transparent text-black"
                  } text-white border border-white py-2 px-4 rounded-lg`}
                >
                  1 day
                </button>
                <button
                  onClick={() => {
                    setDays(3);
                    addDays(3);
                  }}
                  className={`${
                    days === 3
                      ? "bg-secondary text-white"
                      : "bg-transparent text-black"
                  } text-white border border-white py-2 px-4 rounded-lg`}
                >
                  3 days
                </button>
                <button
                  onClick={() => {
                    setDays(5);
                    addDays(5);
                  }}
                  className={`${
                    days === 5
                      ? "bg-secondary text-white"
                      : "bg-transparent text-black"
                  } text-white border border-white py-2 px-4 rounded-lg`}
                >
                  5 days
                </button>
                <button
                  onClick={() => {
                    setDays(7);
                    addDays(7);
                  }}
                  className={`${
                    days === 7
                      ? "bg-secondary text-white"
                      : "bg-transparent text-black"
                  } text-white border border-white py-2 px-4 rounded-lg`}
                >
                  7 days
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="flex flex-col gap-5">
              <div>
                <input
                  id="link-checkbox"
                  type="checkbox"
                  checked={terms}
                  onChange={() => setTerms((prev) => !prev)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className={`text-white ms-2 text-sm font-medium`}>
                  I accept with the terms and conditions above.
                </label>
              </div>
            </div>
            <div>
              <span className={`text-white text-sm font-medium`}>
                {formatReadableDate(endDate.toISOString())}
              </span>
            </div>
          </div>

          <button
            onClick={handleCreateRaffle}
            className={`bg-secondary mt-4 px-6 py-3 rounded-lg text-white hover:opacity-70`}
          >
            Create
          </button>
        </div>
      </div>
      <Modal
        setCurrentNft={setCurrentNft}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
    </>
  );
}
