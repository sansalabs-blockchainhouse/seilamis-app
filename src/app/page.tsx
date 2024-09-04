import Card from "@/components/Card";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Amatic_SC } from "next/font/google";
import Image from "next/image";
import { Suspense } from "react";

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

// export const revalidate = 10

const getRaffles = async () => {
  await Promise.all([new Promise(resolve => setTimeout(resolve, 4000))]);
  const res = await fetch('https://seilamis-api-ef7dacaa3a76.herokuapp.com/raffle', { cache: 'no-store' });
  const raffles: IItem[] = await res.json();
  return raffles;
};


export default async function Home() {
  // const { data: raffles } = useQuery({
  //   queryKey: ["raffles-list"],
  //   queryFn: (): Promise<IItem[]> =>
  //     api.get(`raffle`).then((response) => response.data),
  //   refetchOnWindowFocus: false,
  //   initialData: [],
  // });

  const raffles = await getRaffles();


  return (
    // <Suspense fallback={<Loading />}>
    <main className="flex min-h-screen flex-col items-center bg-sky bg-no-repeat bg-contain bg-white">
      <Navbar />

      <span
        className={`${amantic.className} uppercase text-5xl md:text-8xl text-primary text-center select-none`}
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
            <Suspense key={index} fallback={<div className="w-96 h-96 bg-black"></div>}>
              <Card

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
            </Suspense>
          ))}
      </div>

      <span
        className={`${amantic.className} mt-10 uppercase text-5xl md:text-8xl text-primary text-center select-none`}
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
        className={`${amantic.className} mt-10 uppercase text-5xl md:text-8xl text-primary text-center select-none`}
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
    // </Suspense>
  );
}
