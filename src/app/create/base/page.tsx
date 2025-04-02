"use client";
import React, { useCallback, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import toast from "react-hot-toast";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { formatReadableDate } from "@/utils/formatDate";
import { useAccount, useWriteContract } from "wagmi";
import Modal from "@/components/Base/Modal";
import { api } from "@/services/api";
import Web3 from "web3";
import { base } from "viem/chains";
import { useWaitForTransactionReceiptAsync } from "@/hooks/useWaitForTransactionReceiptAsync";
import { RAFFLE_BASE_ABI, RAFFLE_BASE_CONTRACT_ADDRESS } from "@/constants";
import localFont from "next/font/local";

const arcade = localFont({
  src: "../../../../public/ARCADE_N.ttf",
  variable: "--font-arcade",
});

export default function Create() {
  const { writeContractAsync } = useWriteContract();
  const { waitForTransactionReceipt } = useWaitForTransactionReceiptAsync();

  const { isConnected, address } = useAccount();

  const [currentNft, setCurrentNft] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [raffleType, setRaffleType] = useState(
    "0x0000000000000000000000000000000000000000"
  );
  const [polPrice, setPolPrice] = useState<string>("1");
  const [hitcoinPrice, setHitcoinPrice] = useState<string>("1");

  const [endDate, setEndDate] = useState(new Date());
  const [currentDate, _setCurrentDate] = useState(new Date());
  const [days, setDays] = useState(0);

  const [terms, setTerms] = useState<boolean>(false);

  const handleCreateRaffle = useCallback(async () => {
    console.log(raffleType);
    if (!isConnected)
      return toast.error("Connect your wallet", {
        style: { backgroundColor: "#0052FF" },
      });

    if (!currentNft)
      return toast.error("Select a nft", {
        style: { backgroundColor: "#0052FF" },
      });

    if (days === 0)
      return toast.error("Select a duration", {
        style: { backgroundColor: "#0052FF" },
      });

    const { data } = await api.get(
      `raffle-base-verified/approved/${currentNft.address}/${address}`
    );

    if (!data.isApprovedForAll) {
      toast.loading("Sending...", {
        style: { backgroundColor: "#0052FF" },
      });
      const response = await writeContractAsync({
        chainId: base.id,
        address: currentNft.address,
        functionName: "setApprovalForAll",
        abi: JSON.parse(data.abi),
        args: [RAFFLE_BASE_CONTRACT_ADDRESS, true],
      });

      await waitForTransactionReceipt({ hash: response });
      toast.dismiss();
      toast.success("Success!", {
        style: { backgroundColor: "#0052FF" },
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
    toast.loading("Sending...", {
      style: { backgroundColor: "#0052FF" },
    });

    const parsedEthPrice = Web3.utils.toWei(polPrice.toString(), "ether");
    const parsedTokenPrice = Web3.utils.toWei(hitcoinPrice.toString(), "ether");

    const parsedEndDate = Math.floor(new Date(endDate).getTime() / 1000);
    let price;

    const raffleTypeNum =
      raffleType === "0x0000000000000000000000000000000000000000" ? 0 : 1;

    if (raffleTypeNum === 0) {
      price = parsedEthPrice;
    } else if (raffleTypeNum === 1) {
      price = parsedTokenPrice;
    }

    const nftTypeNum =
      typeof currentNft.type === "string"
        ? parseInt(currentNft.type)
        : currentNft.type;

    const parsedEndDateMock = Math.floor((new Date().getTime() + 10 * 60 * 1000) / 1000);

    const raffleParams = {
      nftContract: currentNft.address,
      nftId: currentNft.tokenId,
      ticketPrice: price,
      endDate: parsedEndDateMock,
      raffleType: raffleTypeNum,
      nftType: nftTypeNum,
      paymentToken: raffleType,
    };

    const response = await writeContractAsync({
      chainId: base.id,
      address: RAFFLE_BASE_CONTRACT_ADDRESS,
      functionName: "createRaffle",
      abi: RAFFLE_BASE_ABI,
      args: [raffleParams],
    });

    await waitForTransactionReceipt({ hash: response });
    toast.dismiss();
    toast.success("Success!", {
      style: { backgroundColor: "#0052FF" },
    });
  }, [currentNft, address, days, raffleType, polPrice, hitcoinPrice, endDate]);

  const addDays = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setEndDate(newDate);
  };

  return (
    <>
      <div className={` bg-black flex min-h-screen flex-col items-center`}>
        <Navbar />
        <div
          className={`flex flex-col items-start gap-4 justify-between p-5 ${arcade.className} `}
        >
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
                className={`bg-black w-full md:w-80 h-80 flex items-center justify-center flex-col gap-4 border-2 border-base`}
              >
                <span className="text-7xl text-white">
                  <IoIosAddCircleOutline />
                </span>
                <span className="text-white font-normal text-sm">
                  Choose NFT for raffle
                </span>
              </div>
            )}
            {currentNft && (
              <div
                onClick={() => setIsOpen(true)}
                className="bg-card_bg w-full md:w-80 h-80 flex items-center justify-center flex-col gap-4 border-2 border-base"
                style={{
                  backgroundImage: `url(${currentNft.image})`,
                  backgroundSize: "cover",
                  borderRadius: "8px",
                }}
              ></div>
            )}

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
                2. Raffle tickets cannot be refunded once bought
              </span>
              <span className="text-white text-sm font-normal">
                3. Raffle tickets will not be refunded if you did not win the
                raffle.
              </span>
              <span className="text-white text-sm font-normal">
                4. When the timer expires, the raffle will be drawn. No ticket
                minimums or maximums are enforced
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between flex-col mt-5 gap-2 bg-card_bg p-2 w-full md:w-1/2">
          <div className="flex gap-5 justify-between flex-col md:flex-row">
            <div className="flex flex-col w-full gap-2">
              <div className="flex flex-col">
                <label className={`text-white text-base`}>
                  Raffle Type <span className="text-red-700">*</span>
                </label>

                <select
                  onChange={(e) => setRaffleType(e.target.value)}
                  value={raffleType}
                  aria-placeholder="select a raffle type"
                  className={`bg-base w-52 text-base box-border border border-white border-opacity-20 py-2 focus:outline-none text-white text-opacity-90 px-4`}
                >
                  <option value="0x0000000000000000000000000000000000000000">
                    ETH
                  </option>
                  <option value="0x2133031F5aCbC493572c02f271186F241cd8D6a5">
                    $MRKT
                  </option>
                  <option value="0x17d70172C7C4205bd39ce80F7f0ee660B7Dc5A23">
                    $DIMES
                  </option>
                  <option value="0x1bc0c42215582d5A085795f4baDbaC3ff36d1Bcb">
                    $CLANKER
                  </option>
                </select>
              </div>
              {raffleType === "0x0000000000000000000000000000000000000000" && (
                <div className="flex flex-col">
                  <label className={`text-white text-base`}>
                    TIcket Price (ETH) <span className="text-red-700">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="1"
                    value={polPrice}
                    pattern="^[0-9]+([,.][0-9]+)?$"
                    onChange={(e) => setPolPrice(e.target.value)}
                    className={`bg-base w-52 text-base box-border border border-white border-opacity-20  py-2 focus:outline-none text-white text-opacity-90 px-4`}
                  />
                </div>
              )}
              {raffleType === "0x2133031F5aCbC493572c02f271186F241cd8D6a5" && (
                <div className="flex flex-col">
                  <label className={`text-white text-base`}>
                    TIcket Price (MRKT)
                    <span className="text-red-700">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="1"
                    value={hitcoinPrice}
                    pattern="^[0-9]+([,.][0-9]+)?$"
                    onChange={(e) => setHitcoinPrice(e.target.value)}
                    className={`bg-base w-52 text-base box-border border border-white border-opacity-20  py-2 focus:outline-none text-white text-opacity-90 px-4`}
                  />
                </div>
              )}
              {raffleType === "0x17d70172C7C4205bd39ce80F7f0ee660B7Dc5A23" && (
                <div className="flex flex-col">
                  <label className={`text-white text-base`}>
                    TIcket Price (DIMES)
                    <span className="text-red-700">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="1"
                    value={hitcoinPrice}
                    pattern="^[0-9]+([,.][0-9]+)?$"
                    onChange={(e) => setHitcoinPrice(e.target.value)}
                    className={`bg-base w-52 text-base box-border border border-white border-opacity-20  py-2 focus:outline-none text-white text-opacity-90 px-4`}
                  />
                </div>
              )}
              {raffleType === "0x1bc0c42215582d5A085795f4baDbaC3ff36d1Bcb" && (
                <div className="flex flex-col">
                  <label className={`text-white text-base`}>
                    TIcket Price (CLANKER)
                    <span className="text-red-700">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="1"
                    value={hitcoinPrice}
                    pattern="^[0-9]+([,.][0-9]+)?$"
                    onChange={(e) => setHitcoinPrice(e.target.value)}
                    className={`bg-base w-52 text-base box-border border border-white border-opacity-20  py-2 focus:outline-none text-white text-opacity-90 px-4`}
                  />
                </div>
              )}
              {raffleType === "0xc91B23eA2A519175FF31488254263dAFeaC7017C" && (
                <div className="flex flex-col">
                  <label className={`text-white text-base`}>
                    TIcket Price (TEST)
                    <span className="text-red-700">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="1"
                    value={hitcoinPrice}
                    pattern="^[0-9]+([,.][0-9]+)?$"
                    onChange={(e) => setHitcoinPrice(e.target.value)}
                    className={`bg-base w-52 text-base box-border border border-white border-opacity-20  py-2 focus:outline-none text-white text-opacity-90 px-4`}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className={`text-white text-base`}>
                Raffle Duration <span className="text-red-700">*</span>
              </label>
              <div className="flex w-full gap-5 flex-wrap">
                <button
                  onClick={() => {
                    setDays(1);
                    addDays(1);
                  }}
                  className={`${
                    days === 1
                      ? "bg-base text-white"
                      : "bg-transparent text-black"
                  } text-white border border-white py-2 px-4 text-sm `}
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
                      ? "bg-base text-white"
                      : "bg-transparent text-black"
                  } text-white border border-white py-2 px-4 text-sm`}
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
                      ? "bg-base text-white"
                      : "bg-transparent text-black"
                  } text-white border border-white py-2 px-4 text-sm`}
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
                      ? "bg-base text-white"
                      : "bg-transparent text-black"
                  } text-white border border-white py-2 px-4 text-sm`}
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
                <label className={`text-white ms-2 text-xs font-medium`}>
                  I accept with the terms and conditions above.
                </label>
              </div>
            </div>
            <div>
              <span className={`text-white text-xs font-medium`}>
                {formatReadableDate(endDate.toISOString())}
              </span>
            </div>
          </div>

          <button
            onClick={handleCreateRaffle}
            className={`pixel-btn  bg-base mt-4 px-6 py-3  text-white hover:opacity-70`}
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
