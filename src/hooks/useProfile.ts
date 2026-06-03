import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/api";
import type { User } from "../types";
import { tokenStorage } from "../utils/authStore";

export const useProfile = () => {
  const id = tokenStorage.id;

  return useQuery<User>({
    queryKey: ["user", id, tokenStorage.sessionId],
    queryFn: () => {
      return getProfile(id);
    },

    enabled: !!tokenStorage.sessionId && !!id,
    staleTime: 5 * 60 * 1000,
  });
};
