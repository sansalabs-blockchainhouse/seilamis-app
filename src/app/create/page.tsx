"use client";
import React, { useCallback, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import Link from "next/link";
import Modal from "@/components/Modal";
import toast from "react-hot-toast";
import { calculateFee } from "@cosmjs/stargate";
import {
  useWallet,
  useSigningCosmWasmClient,
  useCosmWasmClient,
} from "@sei-js/react";
import { formatReadableDate } from "@/utils/formatDate";
import { toUtf8 } from "@cosmjs/encoding";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";

interface IWallets {
  id: string;
  address: string;
}

interface IToken {
  id: string;
  name: string;
  address: string;
}

export default function Create() {
  const { offlineSigner, accounts } = useWallet();
  const { signingCosmWasmClient } = useSigningCosmWasmClient();
  const { cosmWasmClient } = useCosmWasmClient();

  const [currentNft, setCurrentNft] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState<string>("1");

  const [endDate, setEndDate] = useState(new Date());
  const [currentDate, _setCurrentDate] = useState(new Date());
  const [days, setDays] = useState(0);

  const [terms, setTerms] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const [token, setToken] = useState("");

  const { data: wallets } = useQuery({
    queryKey: ["wallets-list"],
    queryFn: (): Promise<IWallets[]> =>
      api.get(`verified`).then((response) => response.data),
    refetchOnWindowFocus: false,
    initialData: [],
  });

  const { data: tokens } = useQuery({
    queryKey: ["tokens-list"],
    queryFn: (): Promise<IToken[]> =>
      api.get(`token`).then((response) => response.data),
    refetchOnWindowFocus: false,
    initialData: [],
  });

  const handleCreateRaffle = useCallback(async () => {
    try {
      if (!cosmWasmClient || !currentNft) return;

      if (!offlineSigner || !signingCosmWasmClient) return;

      if (days === 0) {
        return toast.error("Select a valid raffle duration!");
      }

      const fee = calculateFee(228605, "0.1usei");

      const msg = {
        typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
        value: {
          sender: accounts[0].address,
          contract: currentNft.contract,
          msg: toUtf8(
            JSON.stringify({
              transfer_nft: {
                recipient: process.env.NEXT_PUBLIC_SEILAMIS_WALLET,
                token_id: currentNft.tokenId,
              },
            })
          ),
        },
      };
      toast.loading("Sending...");

      const response = await signingCosmWasmClient.sign(
        accounts[0].address,
        [msg],
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
        creator: accounts[0].address,
        tx: Object.values(txBytes),
        startTime: new Date().toISOString(),
        endTime: new Date(endDate).toISOString(),
        price,
        collectionName: currentNft.collectionName,
        isVerifiedWallet: isVerified,
      };

      await api.post("raffle", body);

      toast.dismiss();

      toast.success("Success!");
    } catch (error: any) {
      if (error.name === "AxiosError") {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [
    cosmWasmClient,
    accounts,
    offlineSigner,
    signingCosmWasmClient,
    currentNft,
    endDate,
    days,
    price,
    isVerified,
  ]);

  const addDays = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setEndDate(newDate);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen items-center z-50 bg-sky bg-no-repeat bg-cover bg-red-600">
        <Navbar />

        <div className="flex flex-col items-start gap-4 justify-between p-5">
          <Link href={"/"} className="flex items-center gap-2">
            <span className="text-black font-bold text-base">
              <IoArrowBackOutline />
            </span>
            <span className="text-black font-bold text-base">Go back</span>
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
            <div className="flex flex-col w-40 gap-2">
              <label className="text-black text-lg">
                Token <span className="text-red-700">*</span>
              </label>

              <select
                onChange={(e) => setToken(e.target.value)}
                className="box-border h-[42px] bg-primary border border-white border-opacity-20 rounded-lg py-2 focus:outline-none text-white text-opacity-90 px-2"
              >
                {tokens.map((token, key) => (
                  <option key={key} value={token.name}>
                    {token.name}
                  </option>
                ))}
              </select>
            </div>
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
                Raffle Duration <span className="text-red-700">*</span>
              </label>
              <div className="flex w-full gap-5">
                <button
                  onClick={() => {
                    setDays(1);
                    addDays(1);
                  }}
                  className={`border border-primary ${
                    days === 1
                      ? "bg-primary text-white"
                      : "bg-transparent text-black"
                  } py-2 px-4 rounded-lg`}
                >
                  1 day
                </button>
                <button
                  onClick={() => {
                    setDays(3);
                    addDays(3);
                  }}
                  className={`border border-primary ${
                    days === 3
                      ? "bg-primary text-white"
                      : "bg-transparent text-black"
                  } py-2 px-3 rounded-lg`}
                >
                  3 days
                </button>
                <button
                  onClick={() => {
                    setDays(5);
                    addDays(5);
                  }}
                  className={`border border-primary ${
                    days === 5
                      ? "bg-primary text-white"
                      : "bg-transparent text-black"
                  } py-2 px-3 rounded-lg`}
                >
                  5 days
                </button>
                <button
                  onClick={() => {
                    setDays(7);
                    addDays(7);
                  }}
                  className={`border border-primary py-2 px-3 rounded-lg ${
                    days === 7
                      ? "bg-primary text-white"
                      : "bg-transparent text-black"
                  } `}
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
                <label className="ms-2 text-sm font-medium text-black">
                  I accept with the terms and conditions above.
                </label>
              </div>
              {wallets.length > 0 &&
                accounts.length > 0 &&
                wallets.find((w) => w.address === accounts[0].address) && (
                  <div>
                    <input
                      id="link-checkbox"
                      type="checkbox"
                      checked={isVerified}
                      onChange={() => setIsVerified((prev) => !prev)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ms-2 text-sm font-medium text-black">
                      Fundraiser
                    </label>
                  </div>
                )}
            </div>
            <div>
              <span className="text-black">
                {formatReadableDate(endDate.toISOString())}
              </span>
            </div>
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
