"use client";
import React, { useCallback, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import Link from "next/link";
import Modal from "@/components/Modal";
import axios from "axios";
import toast from "react-hot-toast";
import { calculateFee } from "@cosmjs/stargate";
import {
  useWallet,
  useSigningCosmWasmClient,
  useCosmWasmClient,
} from "@sei-js/react";
import { api } from "@/services/api";

export default function Create() {
  const { offlineSigner, accounts } = useWallet();
  const { signingCosmWasmClient } = useSigningCosmWasmClient();
  const { cosmWasmClient } = useCosmWasmClient();

  const [currentNft, setCurrentNft] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState<string>("1");

  const [endDate, setEndDate] = useState<string>(new Date().toString());
  const [startDate, setStartDate] = useState<string>(new Date().toString());

  const [terms, setTerms] = useState<boolean>(false);

  const handleCreateRaffle = useCallback(async () => {
    if (!cosmWasmClient || !currentNft) return;

    if (!offlineSigner || !signingCosmWasmClient) return;

    const fee = calculateFee(228605, "0.1usei");

    const msg = {
      transfer_nft: {
        recipient: process.env.NEXT_PUBLIC_SEILAMIS_WALLET,
        token_id: currentNft.tokenId,
      },
    };

    const result = await signingCosmWasmClient.execute(
      accounts[0].address,
      currentNft.contract,
      msg,
      fee
    );

    const body = {
      creator: accounts[0].address,
      tx: result.transactionHash,
      startTime: new Date(startDate).toISOString(),
      endTime: new Date(endDate).toISOString(),
      price,
      name: currentNft.nftData.name,
      image: currentNft.nftData.image,
      collectionName: "sei",
    };

    await api.post("raffle", body);
  }, [cosmWasmClient, accounts, offlineSigner, signingCosmWasmClient]);

  return (
    <>
      <div className="flex flex-col h-screen items-center p-5 z-50">
        <div className="flex flex-col items-start gap-4 justify-between">
          <Link href={"/"} className="flex items-center gap-2">
            <span className="text-white font-bold text-base">
              <IoArrowBackOutline />
            </span>
            <span className="text-white font-bold text-base">Go back</span>
          </Link>
          <div className="flex flex-col md:flex-row items-start gap-12 justify-between">
            {!currentNft && (
              <div
                onClick={() => {
                  if (!accounts.length) {
                    return toast.error("Connect your wallet!");
                  }
                  setIsOpen(true);
                }}
                className="bg-primary w-full md:w-80 h-80 rounded-xl flex items-center justify-center flex-col gap-4"
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
                  backgroundImage: `url(${currentNft.nftData.image})`,
                  backgroundSize: "cover",
                  borderRadius: "8px",
                }}
              ></div>
            )}

            <div className="flex flex-col p-5 w-full md:w-96 h-72 bg-primary rounded-xl space-y-5 overflow-y-scroll">
              <span className="text-white font-bold text-sm">
                Terms and conditions
              </span>
              <span className="text-white text-base font-normal">
                1. All NFT prizes are held by raffle in escrow and can be
                claimed by the winner or creator once the draw is done.
              </span>
              <span className="text-white text-base font-normal">
                2. Raffle tickets cannot be refunded once bought
              </span>
              <span className="text-white text-base font-normal">
                3. Raffle tickets will not be refunded if you did not win the
                raffle.
              </span>
              <span className="text-white text-base font-normal">
                4. You can only buy 40% of total tickets.
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-5 gap-2 bg-card_bg p-5 rounded-lg w-full  md:w-1/2">
          <div className="flex gap-5 flex-col md:flex-row">
            <div className="flex flex-col w-full gap-2">
              <label className="text-black text-lg">
                Ticket Price <span className="text-red-700">*</span>
              </label>

              <input
                type="text"
                placeholder="1"
                value={price}
                pattern="^[0-9]+([,.][0-9]+)?$"
                onChange={(e) => setPrice(e.target.value)}
                className=" box-border bg-primary border border-white border-opacity-20 rounded-lg py-2 focus:outline-none text-white text-opacity-90 px-4"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-black text-lg">
                Raffle endd date <span className="text-red-700">*</span>
              </label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-primary border border-white border-opacity-20 rounded-lg py-2 focus:outline-none text-white text-opacity-90 px-4"
              />
            </div>
          </div>
          <div className="flex items-center mt-1">
            <input
              id="link-checkbox"
              type="checkbox"
              checked={terms}
              onChange={() => setTerms((prev) => !prev)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ms-2 text-sm font-medium text-black">
              I accept with the terms and conditions above.
            </label>
          </div>

          <button
            onClick={() => handleCreateRaffle()}
            className="mt-4 px-6 py-3 bg-primary rounded-lg text-white hover:opacity-70"
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
