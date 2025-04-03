"use client";

import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import { Amatic_SC } from "next/font/google";
import { useNetworkContext } from "@/contexts/Network";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import CardPolygon from "@/components/Polygon/Card";
import localFont from "next/font/local";
import CardBase from "@/components/Base/Card";

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
  nftId?: string;
  raffleType?: number;
  paymentToken?: string;
}

const amantic = Amatic_SC({ weight: "700", subsets: ["latin"] });

const arcade = localFont({
  src: "../../public/ARCADE_N.ttf",
  variable: "--font-arcade",
});

const networkStyles = {
  sei: {
    mainBg: "bg-bg@1 bg-contain bg-white",
    floatingImg: "/floating.png",
    headingClass: `${amantic.className} text-primary text-5xl md:text-8xl`,
  },
  polygon: {
    mainBg: "bg-bg@2 bg-cover",
    floatingImg: "/floating_pol.png",
    headingClass: `text-white text-5xl md:text-8xl`,
  },
  base: {
    mainBg: "bg-black",
    floatingImg: "",
    headingClass: `${arcade.className} text-white text-xl md:text-6xl`,
  },
};

const sortByEndTimeAsc = (a: IItem, b: IItem) =>
  new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
const sortByEndTimeDesc = (a: IItem, b: IItem) =>
  new Date(b.endTime).getTime() - new Date(a.endTime).getTime();
const sortByPopularity = (a: IItem, b: IItem) =>
  b.ticketsSold * b.price - a.ticketsSold * a.price;

export default function Home() {
  const { selectedNetwork } = useNetworkContext();

  // Query para a rede "sei"
  const { data: raffles, isFetching } = useQuery({
    queryKey: ["raffles-list", "sei"],
    queryFn: (): Promise<IItem[]> =>
      api.get(`raffle`).then((response) => response.data),
    refetchOnWindowFocus: false,
    initialData: [],
    enabled: selectedNetwork === "sei",
  });

  // Query para "polygon"
  const { data: rafflesPolygon } = useQuery({
    queryKey: ["raffles-list", "polygon"],
    queryFn: (): Promise<IItem[]> =>
      api.get(`raffle/all/polygon`).then((response) => response.data),
    refetchOnWindowFocus: false,
    initialData: [],
    enabled: selectedNetwork === "polygon",
  });

  // Query para "base"
  const { data: rafflesBase } = useQuery({
    queryKey: ["raffles-list", "base"],
    queryFn: (): Promise<IItem[]> =>
      api.get(`raffle/all/base`).then((response) => response.data),
    refetchOnWindowFocus: false,
    initialData: [],
    enabled: selectedNetwork === "base",
  });

  // Para redes não "sei", escolhemos a query correta com base no selectedNetwork
  const rafflesNonSei =
    selectedNetwork === "polygon"
      ? rafflesPolygon
      : selectedNetwork === "base"
      ? rafflesBase
      : [];

  if (isFetching && selectedNetwork === "sei") {
    return (
      <div className="min-h-screen rounded-xl bg-[#89E1FF] flex items-center justify-center">
        <img src="/cloud.png" className="w-40 animate-pulse" alt="sky" />
      </div>
    );
  }

  // Função para renderizar o card conforme a rede selecionada
  const renderCard = (item: IItem, index: number) => {
    if (selectedNetwork === "sei") {
      return (
        <Card
          key={index}
          id={item.id}
          imgUrl={item.image}
          name={item.name}
          startTime={item.startTime}
          endTime={item.endTime}
          collectionName={item.collectionName}
          price={item.price}
          ticketsSold={item.ticketsSold}
          creator={item.creator}
          isVerified={item.isVerified}
          winner={item.winner}
        />
      );
    }
    if (selectedNetwork === "polygon") {
      return (
        <CardPolygon
          key={index}
          id={item.id}
          image={item.image}
          name={item.name}
          startTime={item.startTime}
          endTime={item.endTime}
          collectionName={item.name.replace(/[0-9#]/g, "")}
          price={[item.price]}
          nftId={item.nftId as string}
          raffleType={item.raffleType as number}
          ticketsSold={item.ticketsSold}
          creator={item.creator}
          winner={item.winner}
        />
      );
    }
    if (selectedNetwork === "base") {
      return (
        <CardBase
          key={index}
          id={item.id}
          image={item.image}
          name={item.name}
          startTime={item.startTime}
          endTime={item.endTime}
          collectionName={item.name.replace(/[0-9#]/g, "")}
          price={item.price}
          nftId={item.nftId as string}
          raffleType={item.raffleType as number}
          ticketsSold={item.ticketsSold}
          creator={item.creator}
          paymentToken={item.paymentToken}
          winner={item.winner}
        />
      );
    }
  };

  // Preparando os arrays para cada seção
  const endingSoonItems =
    selectedNetwork === "sei"
      ? raffles
          .filter((item) => !item.winner)
          .sort(sortByEndTimeAsc)
          .slice(0, 3)
      : rafflesNonSei
          .filter(
            (item) =>
              item.winner === "0x0000000000000000000000000000000000000000"
          )
          .sort(sortByEndTimeAsc)
          .slice(0, 3);

  const mostPopularItems =
    selectedNetwork === "sei"
      ? raffles.filter((item) => !item.winner).sort(sortByPopularity)
      : rafflesNonSei
          .filter(
            (item) =>
              item.winner === "0x0000000000000000000000000000000000000000"
          )
          .sort(sortByPopularity);

  const endedItems =
    selectedNetwork === "sei"
      ? raffles.filter((item) => item.winner).sort(sortByEndTimeDesc)
      : rafflesNonSei
          .filter(
            (item) =>
              item.winner !== "0x0000000000000000000000000000000000000000"
          )
          .sort(sortByEndTimeDesc);

  return (
    <main
      className={`flex min-h-screen flex-col items-center bg-no-repeat ${networkStyles[selectedNetwork].mainBg}`}
    >
      {/* Imagem flutuante */}
      <div className="fixed bottom-10 right-2 z-10 rounded-full p-2 cursor-pointer">
        {networkStyles[selectedNetwork].floatingImg !== "" && (
          <img
            src={networkStyles[selectedNetwork].floatingImg}
            className="h-48 animate-bounce animate-infinite animate-duration-[6000ms] animate-ease-linear"
            alt="floating"
          />
        )}
      </div>

      <Navbar />

      {/* Seção Ending Soon */}
      <span
        className={`${networkStyles[selectedNetwork].headingClass} uppercase text-center select-none`}
      >
        ending soon
      </span>
      <div className="flex flex-wrap items-center justify-center gap-10 mt-10">
        {endingSoonItems.map((item, index) => renderCard(item, index))}
      </div>

      {/* Seção Most Popular */}
      <span
        className={`${networkStyles[selectedNetwork].headingClass} uppercase text-center select-none mt-10`}
      >
        most popular
      </span>
      <div className="flex flex-wrap w-full max-w-7xl p-4 gap-5 items-center justify-center rounded-box">
        {mostPopularItems.map((item, index) => (
          <div key={index} className="carousel-item">
            {renderCard(item, index)}
          </div>
        ))}
      </div>

      {/* Seção Ended */}
      <span
        className={`${networkStyles[selectedNetwork].headingClass} uppercase text-center select-none mt-10`}
      >
        ended
      </span>
      <div className="flex flex-wrap w-full max-w-7xl p-4 gap-5 items-center justify-center rounded-box">
        {endedItems.map((item, index) => (
          <div key={index} className="carousel-item">
            {renderCard(item, index)}
          </div>
        ))}
      </div>
    </main>
  );
}
