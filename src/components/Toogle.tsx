"use client";
import { useNetworkContext } from "@/contexts/Network";
import Image from "next/image";

// Podemos tipar melhor as redes:
type NetworkType = "sei" | "polygon" | "base";

interface Chain {
  name: NetworkType;
  src: string;
}

// Array com cada blockchain e o caminho do seu ícone (em public/)
const CHAINS: Chain[] = [
  { name: "sei", src: "/sei.png" },
  { name: "polygon", src: "/poly.png" },
  { name: "base", src: "/base.png" },
];

export default function BlockchainToggle() {
  const { selectedNetwork, setSelectedNetwork } = useNetworkContext();

  // Retorna classes de cor diferentes caso o botão seja o selecionado ou não
  const getButtonClasses = (chainName: NetworkType) => {
    const baseClasses =
      "w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200";
    return selectedNetwork === chainName
      ? `${baseClasses} bg-blue-700 text-white`
      : `${baseClasses} bg-blue-200 text-blue-700`;
  };

  return (
    <div className="flex items-center bg-blue-100 p-1 rounded-lg space-x-2">
      {CHAINS.map((chain) => (
        <button
          key={chain.name}
          className={getButtonClasses(chain.name)}
          onClick={() => setSelectedNetwork(chain.name)}
        >
          <Image src={chain.src} alt={chain.name} width={24} height={24} />
        </button>
      ))}
    </div>
  );
}
