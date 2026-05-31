interface TokenStorage {
  accessToken: string;
  sessionId: string;
  refreshToken: string;
}

export const tokenStorage: TokenStorage = {
  accessToken: "",
  sessionId: "",
  refreshToken: "valid-refresh-token",
};
