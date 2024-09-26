"use client"
import { createContext, useContext, useState } from "react";

export interface NetworkContextType {
  isSei: boolean;
  setIsSei: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NetworkContext = createContext<NetworkContextType>({
  isSei: true,
  setIsSei: () => {},
});

const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSei, setIsSei] = useState(true);

  const value = {
    isSei,
    setIsSei,
  };

  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  );
};

export const useNetworkContext = () => {
  return useContext(NetworkContext);
};

export default NetworkProvider;