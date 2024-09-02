import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { AxiosRequestHeaders } from "axios";

// Defina o tipo para o contexto
interface RefreshTokenContextType {
  token: string | null;
}

export const RefreshTokenContext = createContext<RefreshTokenContextType | null>(null);

const RefreshTokenProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Função para atualizar o token
    const updateToken = async () => {
      const storedTokens = window.localStorage.getItem("tokens");
      if (storedTokens) {
        const parsedTokens = JSON.parse(storedTokens);
        setToken(parsedTokens.accessToken);

        api.interceptors.request.use((config) => {
          if (!config.headers) {
            config.headers = {} as AxiosRequestHeaders;
          }
          config.headers.Authorization = `Bearer ${parsedTokens.accessToken}`;
          return config;
        });

        api.interceptors.response.use(
          (response) => response,
          async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
              originalRequest._retry = true;

              try {
                const refreshTokenResponse = await api.post("/auth/refresh-token", {
                  refreshToken: parsedTokens.refreshToken,
                });

                if (refreshTokenResponse.data.status === "success") {
                  const newTokens = refreshTokenResponse.data.data;
                  window.localStorage.setItem("tokens", JSON.stringify(newTokens));
                  setToken(newTokens.accessToken);

                  originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
                  return api(originalRequest);
                }
              } catch (err) {
                console.error("Failed to refresh token", err);
                // Handle logout or token refresh failure here
              }
            }

            return Promise.reject(error);
          }
        );
      }
    };

    updateToken();
  }, []);

  return (
    <RefreshTokenContext.Provider value={{ token }}>
      {children}
    </RefreshTokenContext.Provider>
  );
};

export default RefreshTokenProvider;
