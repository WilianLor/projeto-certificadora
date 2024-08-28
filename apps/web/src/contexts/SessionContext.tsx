import { createContext, ReactNode } from "react";

interface SessionContextType {}

interface SessionContextProviderProps {
  children: ReactNode;
}

export const SessionContext = createContext({} as SessionContextType);

export const SessionContextProvider = ({
  children,
}: SessionContextProviderProps) => {
  return (
    <SessionContext.Provider value={{}}>{children}</SessionContext.Provider>
  );
};
