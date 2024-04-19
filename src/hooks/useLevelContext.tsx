import React, { ReactNode, createContext, useContext, useState } from "react";

interface LevelContextType {
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  isProceeding: boolean;
  setIsProceeding: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LevelContext = createContext<LevelContextType | undefined>(undefined);

export function LevelContextProvider({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState<number>(0);
  const [isProceeding, setIsProceeding] = useState<boolean>(true);

  return (
    <LevelContext.Provider value={{ level, setLevel, isProceeding, setIsProceeding }}>
      {children}
    </LevelContext.Provider>
  );
}
export const useLevelContext = () => {
  const context = useContext(LevelContext);
  if (context === undefined) {
    throw new Error("useLevelContext must be used within LevelContext");
  }
  return context;
};
