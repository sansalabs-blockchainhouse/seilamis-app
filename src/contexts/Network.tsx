"use client";
import { createContext, useContext, useState, useEffect } from "react";

type NetworkType = "sei" | "polygon" | "base";

export interface NetworkContextType {
  selectedNetwork: NetworkType;
  setSelectedNetwork: React.Dispatch<React.SetStateAction<NetworkType>>;
}

export const NetworkContext = createContext<NetworkContextType>({
  selectedNetwork: "sei",
  setSelectedNetwork: () => {},
});

const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>("sei");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("selectedNetwork");
      if (storedValue) {
        if (["sei", "polygon", "base"].includes(storedValue)) {
          setSelectedNetwork(storedValue as NetworkType);
        }
      }
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("selectedNetwork", selectedNetwork);
    }
  }, [selectedNetwork, isMounted]);

  if (!isMounted) {
    return null;
  }

  const value = {
    selectedNetwork,
    setSelectedNetwork,
  };

  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  );
};

export const useNetworkContext = () => useContext(NetworkContext);

export default NetworkProvider;
