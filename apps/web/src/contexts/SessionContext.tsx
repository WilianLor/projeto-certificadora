import { createContext, ReactNode, useEffect, useState } from "react";
import api, { ApiResponse } from "../services/api";
import { toast } from "react-toastify";
import { TokensData } from "./types";

interface SessionContextType {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLogged?: boolean;
  nome?:any;
}

interface SessionContextProviderProps {
  children: ReactNode;
}

export const SessionContext = createContext({} as SessionContextType);

export const SessionContextProvider = ({
  children,
}: SessionContextProviderProps) => {
  const [isLogged, setIsLogged] = useState<boolean>();

  useEffect(() => {
    const tokens = window.localStorage.getItem("tokens");

    setIsLogged(!!tokens);
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    const response = await api.post<ApiResponse<TokensData>>("/auth/login", {
      username,
      password,
      
    });

   

    if (response.data.status === "success") {
      window.localStorage.setItem("tokens", JSON.stringify(response.data.data));

      setIsLogged(true);

      if(response.data.data?.admin === true){
            window.location.href = "/admin";
      }else {
        window.location.href = "./donates";
      }
    
      


  
    } else {
      toast(response.data.error, { type: "error" });
    }
  };

  const [nome, setNome]:any = useState<string>("")

  useEffect(() => {
    const getName = () => {
      // Obtenha o item 'tokens' do localStorage
      const usuario = window.localStorage.getItem("tokens");

      // Verifique se o item não é null e faça o parse do JSON
      if (usuario) {
        const parsedUsuario = JSON.parse(usuario);

        // Acesse o 'username' e defina o estado
        setNome(parsedUsuario.username);
      }
    };

    getName();
  }, []);
  
  const logout = () => {
    window.localStorage.removeItem("tokens");
    setIsLogged(false);
    window.location.href = "/login";
  };

  return (
    <SessionContext.Provider value={{ login, logout, isLogged, nome}}>
      {children}
    </SessionContext.Provider>
  );
};
