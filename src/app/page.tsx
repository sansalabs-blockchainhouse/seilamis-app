"use client";

import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import { Amatic_SC } from "next/font/google";
import { useNetworkContext } from "@/contexts/Network";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

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
  isVerified?: boolean;
}

const amantic = Amatic_SC({ weight: "700", subsets: ["latin"] });

export default function Home() {
  const { data: raffles, isFetching } = useQuery({
    queryKey: ["raffles-list"],
    queryFn: (): Promise<IItem[]> =>
      api.get(`raffle`).then((response) => response.data),
    refetchOnWindowFocus: false,
    initialData: [],
  });

  const { isSei } = useNetworkContext();

  if (isFetching  && isSei) {
    return (
      <div className="min-h-screen rounded-xl bg-[#89E1FF] flex items-center justify-center">
        <img src="/cloud.png" className="w-40 animate-pulse " alt="sky" />
      </div>
    );
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center bg-no-repeat  ${
        isSei ? "bg-bg@1 bg-contain bg-white" : "bg-bg@2 bg-cover"
      }`}
    >
      <Navbar />

      <span
        className={`${
          isSei ? amantic.className + " text-primary" : "font-london text-white"
        } uppercase text-5xl md:text-8xl text-primary text-center select-none`}
      >
        ending soon
      </span>
      <div className="flex flex-wrap items-center justify-center gap-10 mt-10">
        {raffles
          ?.filter((item) => !item.winner)
          .sort(
            (a: any, b: any) =>
              (new Date(a.endTime) as any) - (new Date(b.endTime) as any)
          )
          .slice(0, 3)
          .map((nft, index) => (
            <Card
              key={index}
              id={nft.id}
              imgUrl={nft.image}
              name={nft.name}
              startTime={nft.startTime}
              endTime={nft.endTime}
              collectionName={nft.collectionName}
              price={nft.price}
              ticketsSold={nft.ticketsSold}
              creator={nft.creator}
              isVerified={nft.isVerified}
            />
          ))}
      </div>

      <span
        className={`${
          isSei ? amantic.className + " text-primary" : "font-london text-white"
        } uppercase text-5xl md:text-8xl text-primary text-center select-none mt-10`}
      >
        most popular
      </span>

      <div className="flex flex-wrap w-full max-w-7xl p-4 gap-5 items-center justify-center rounded-box">
        {raffles
          .sort((a, b) => b.ticketsSold * b.price - a.ticketsSold * a.price)
          ?.filter((item) => !item.winner)
          .map((nft, index) => (
            <div key={index} className="carousel-item">
              <Card
                key={index}
                id={nft.id}
                imgUrl={nft.image}
                name={nft.name}
                startTime={nft.startTime}
                endTime={nft.endTime}
                collectionName={nft.collectionName}
                price={nft.price}
                ticketsSold={nft.ticketsSold}
                creator={nft.creator}
                isVerified={nft.isVerified}
              />
            </div>
          ))}
      </div>
      <span
        className={`${
          isSei ? amantic.className + " text-primary" : "font-london text-white"
        } uppercase text-5xl md:text-8xl text-primary text-center select-none mt-10`}
      >
        ended
      </span>
      <div className="flex flex-wrap w-full max-w-7xl p-4 gap-5 items-center justify-center rounded-box">
        {raffles
          .sort((a, b) => {
            const dateA = new Date(a.endTime).getTime();
            const dateB = new Date(b.endTime).getTime();
            return dateB - dateA;
          })
          ?.filter((item) => item.winner)
          .slice(0, 12)
          ?.map((nft, index) => (
            <div key={index} className="carousel-item">
              <Card
                key={index}
                id={nft.id}
                imgUrl={nft.image}
                name={nft.name}
                startTime={nft.startTime}
                endTime={nft.endTime}
                collectionName={nft.collectionName}
                price={nft.price}
                ticketsSold={nft.ticketsSold}
                creator={nft.creator}
                winner={nft.winner}
                isVerified={nft.isVerified}
              />
            </div>
          ))}
      </div>
    </main>
  );
}
