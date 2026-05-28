import { useEffect, useState, type PropsWithChildren } from "react";
import type { User } from "../types";
import { useQueryClient } from "@tanstack/react-query";
import { tokenStorage } from "../authStore";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = user !== null;

  const queryClient = useQueryClient();

  const login = (token: string, userData: User) => {
    setUser(userData);
    tokenStorage.accessToken = token;
  };

  const logout = () => {
    tokenStorage.accessToken = "";
    setUser(null);
    queryClient.clear();
  };

  useEffect(() => {
    const initializeAuth = async () => {
      // TODO: запрос к /auth/refresh с refreshToken (httpOnly cookie)
      // const { accessToken, user } = await clientApi.post("/auth/refresh");
      // login(accessToken, user);
    };
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
