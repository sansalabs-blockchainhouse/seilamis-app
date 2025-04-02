"use client";
import React, { useCallback, useEffect, useState } from "react";
import { MdNotInterested } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useAccount } from "wagmi";

interface IModalProps {
  setCurrentNft: React.Dispatch<React.SetStateAction<undefined>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

interface ICollection {
  name: string;
  address: string;
  imgUrl: string;
  abi: string;
}

export default function Modal({
  setCurrentNft,
  setIsOpen,
  isOpen,
}: IModalProps) {
  const { isConnected, address } = useAccount();

  const [nfts, setNfts] = useState<any[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCollection, setCurrentCollection] = useState<
    ICollection | undefined
  >();

  const { data: collections } = useQuery({
    queryKey: ["collections-base-verified"],
    queryFn: (): Promise<ICollection[]> =>
      api.get(`raffle-base-verified`).then((response) => response.data),
    refetchOnWindowFocus: false,
    initialData: [],
  });

  const getNfts = useCallback(async () => {
    if (currentCollection?.address) {
      try {
        setIsLoading(true);

        const { data } = await api.get(
          `raffle-base-verified/${currentCollection.address}/${address}`
        );

        setNfts(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  }, [address, currentCollection]);

  useEffect(() => {
    getNfts();
  }, [currentCollection]);

  return (
    <div
      id="default-modal"
      aria-hidden="true"
      className={`${
        isOpen ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full `}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-black rounded-lg shadow border border-white">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            {currentCollection && (
              <span
                onClick={() => {
                  setNfts(undefined);
                  setCurrentCollection(undefined);
                }}
                className="text-white text-4xl font-semibold cursor-pointer"
              >
                <IoIosArrowRoundBack />
              </span>
            )}

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Choose a nft
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="text-white bg-transparent hover:bg-white hover:text-black rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="flex flex-wrap p-1S justify-center md:p-4 gap-2">
            {!nfts &&
              collections &&
              collections?.map((n, index: number) => (
                <div
                  onClick={() => {
                    setCurrentCollection(n);
                  }}
                  key={index}
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <div
                    className="flex flex-col bg-transparent rounded-b-lg  border-transparent rounded-t-lg"
                    style={{
                      backgroundImage: `url(${n.imgUrl})`,
                      backgroundSize: "cover",
                      width: "8rem",
                      height: "8rem",
                      borderRadius: "8px",
                    }}
                  />
                  <span className="text-white font-semibold max-w">
                    {n.name}
                  </span>
                </div>
              ))}
            {currentCollection &&
              nfts &&
              nfts?.map((n, index: number) => (
                <div
                  onClick={() => {
                    setCurrentNft(n);
                    setIsOpen(false);
                    setCurrentCollection({} as ICollection);
                  }}
                  key={index}
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <div
                    className="flex flex-col bg-transparent rounded-b-lg  border-transparent rounded-t-lg"
                    style={{
                      backgroundImage: `url(${n.image})`,
                      backgroundSize: "cover",
                      width: "8rem",
                      height: "8rem",
                      borderRadius: "8px",
                    }}
                  />
                  <span className="text-white font-semibold max-w">
                    {n.name}
                  </span>
                </div>
              ))}
            {!isLoading && currentCollection && !nfts?.length && (
              <div className="flex flex-col justify-center items-center gap-3">
                <span className="text-white">You dont have nfts</span>
                <span className="text-white text-8xl">
                  <MdNotInterested />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
