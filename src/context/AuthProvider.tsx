import { useEffect, useState, type PropsWithChildren } from "react";
import type { User } from "../types";
import { useQueryClient } from "@tanstack/react-query";
import { tokenStorage } from "../utils/authStore";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = user !== null;

  const queryClient = useQueryClient();

  const login = (token: string, userData: User) => {
    tokenStorage.accessToken = token;
    tokenStorage.sessionId = crypto.randomUUID();
    setUser(userData);
  };

  const logout = () => {
    tokenStorage.accessToken = "";
    tokenStorage.sessionId = "";
    setUser(null);
    queryClient.removeQueries({ queryKey: ["user"] });
  };

  useEffect(() => {
    const initializeAuth = async () => {
      // TODO: const { accessToken, user } = await clientApi.post("/auth/refresh");
      // login(accessToken, user);
    };
    initializeAuth().catch(() => {
      // refresh протух — пользователь остаётся неавторизованным
    });
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
