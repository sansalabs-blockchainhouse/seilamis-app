"use client";
import Card from "@/components/Card";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

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
}

export default function Home() {
  const { data: raffles, refetch } = useQuery({
    queryKey: ["raffles-list"],
    queryFn: (): Promise<IItem[]> =>
      api.get(`raffle`).then((response) => response.data),
    refetchOnWindowFocus: false,
    initialData: [],
  });

  return (
    <main className="flex min-h-screen flex-col items-center">
      <span className="text-5xl md:text-7xl text-primary font-extrabold text-center select-none">
        FEATURED RAFFLES
      </span>
      <div className="flex flex-wrap items-center justify-center gap-10 mt-10">
        {raffles.map((nft, index) => (
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
          />
        ))}
      </div>
      <span className="text-5xl md:text-7xl text-primary font-extrabold text-center select-none mt-10">
        RAFFLES
      </span>
      <div className="carousel carousel-center w-full max-w-7xl p-4 space-x-6 rounded-box">
        {raffles.map((nft, index) => (
          <div key={index} className="carousel-item">
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
            />
          </div>
        ))}
      </div>
    </main>
  );
}
