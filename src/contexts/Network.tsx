"use client";
import { createContext, useContext, useState, useEffect } from "react";

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
  const [isSei, setIsSei] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("isSei");
      if (storedValue) {
        setIsSei(JSON.parse(storedValue));
      }
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("isSei", JSON.stringify(isSei));
    }
  }, [isSei, isMounted]);

  if (!isMounted) {
    return null;
  }

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
