import { createContext } from "react";
import type { User } from "../types";

export interface AuthContext {
  isAuthenticated: boolean;
  login: (accessToken: string, user: User) => void;
  logout: () => void;
  user: User | null;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);
