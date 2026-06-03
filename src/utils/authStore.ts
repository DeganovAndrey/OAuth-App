interface TokenStorage {
  accessToken: string;
  sessionId: string;
  refreshToken: string;
  email?: string;
  id?: number;
}

export const tokenStorage: TokenStorage = {
  accessToken: "",
  sessionId: "",
  refreshToken: "valid-refresh-token",
  email: "",
  id: 0,
};
