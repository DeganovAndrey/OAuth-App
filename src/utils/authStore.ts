interface TokenStorage {
  accessToken: string;
  sessionId: string;
}

export const tokenStorage: TokenStorage = {
  accessToken: "",
  sessionId: "",
};
