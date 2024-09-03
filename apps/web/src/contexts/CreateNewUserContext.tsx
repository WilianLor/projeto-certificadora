import React, { createContext, ReactNode, useContext } from "react";
import { toast } from "react-toastify";
import api, { ApiResponse } from "../services/api";  // Importe a instância configurada do axios
import { TokensData } from "./types";

// Definir o tipo do contexto
interface CreateNewUserContextType {
  createuser: (username: string, password: string, isAdmin: number) => void; // Adicionei isAdmin
}

// Inicializar o contexto com um valor default
export const CreateNewUserContext = createContext<CreateNewUserContextType | null>(null);

// Tipar as props do provedor, especialmente o children
interface CreateNewUserProviderProps {
  children: ReactNode;
}

const CreateNewUserProvider: React.FC<CreateNewUserProviderProps> = ({ children }) => {

  const createuser = async (username: string, password: string, isAdmin: number) => {
    const userData = { username, password, isAdmin }; // Inclua isAdmin no payload

    try {
      const response = await api.post<ApiResponse<TokensData>>("user/", userData);

      if (response.data.status !== "error") {
        toast.success("Usuário criado com sucesso...");

      } else {
        toast.warning(response.data.error || "Erro ao criar usuário");
      };
    } catch (error: any) {
      if (error.response) {
        console.error('Erro na resposta:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('Nenhuma resposta do servidor:', error.request);
      } else {
        console.error('Erro na requisição:', error.message);
      }
    }
  };

  return (
    <CreateNewUserContext.Provider value={{ createuser }}>
      {children}
    </CreateNewUserContext.Provider>
  );
};

export default CreateNewUserProvider;
