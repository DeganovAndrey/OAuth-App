import { useEffect, useState } from "react";
import type { User } from "../types";
import { useQueryClient } from "@tanstack/react-query";
import { tokenStorage } from "../utils/authStore";
import { AuthContext } from "./AuthContext";
import { Outlet } from "react-router-dom";

export const AuthProvider = () => {
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
    const initializeAuth = async () => {};
    initializeAuth().catch(() => {});
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
      <Outlet />
    </AuthContext.Provider>
  );
};
