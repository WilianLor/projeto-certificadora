import React, { createContext, ReactNode, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SessionContext } from "./SessionContext";

// Definir o tipo do contexto
interface CreateNewUserContextType {
  createuser: (username: string, password: string) => void;
}

// Inicializar o contexto com um valor default
export const CreateNewUserContext = createContext<CreateNewUserContextType | null>(null);

// Tipar as props do provedor, especialmente o children
interface CreateNewUserProviderProps {
  children: ReactNode;
}

const url = process.env.REACT_APP_BACKEND_URL || "http://localhost:3030/";

const CreateNewUserProvider: React.FC<CreateNewUserProviderProps> = ({ children }) => {
  // Mover a chamada useContext para o corpo do componente
  const {login} = useContext(SessionContext);

  const createuser = (username: string, password: string) => {
    const userData = { username, password };

    axios.post(process.env.REACT_APP_BACKEND_URL || `${url}user/createuser`, userData)
      .then(response => {
        if (response.data.status !== "error") {
          toast.success("Usuário criado com sucesso...");

          setTimeout(() => {
           
              login(userData.username, userData.password);
            
          }, 3000);

        } else {
          toast.warning(response.data.message);
        }
      })
      .catch(error => {
        if (error.response) {
          console.error('Erro na resposta:', error.response.status, error.response.data);
        } else if (error.request) {
          console.error('Nenhuma resposta do servidor:', error.request);
        } else {
          console.error('Erro na requisição:', error.message);
        }
      });
  };

  return (
    <CreateNewUserContext.Provider value={{ createuser }}>
      {children}
    </CreateNewUserContext.Provider>
  );
};

export default CreateNewUserProvider;
