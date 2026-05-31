import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/api";
import type { User } from "../types";
import { tokenStorage } from "../utils/authStore";

export const useProfile = (id: number) => {
  return useQuery<User>({
    queryKey: ["user", id, tokenStorage.sessionId],
    queryFn: () => getProfile(id),
    enabled: !!tokenStorage.sessionId && !!id,
    staleTime: 5 * 60 * 1000,
    // данные остаются свежими 5 минут,
    // затем фоново рефетчим и обновляем данные
    // а при выходе - принудительно сбрасываем кэш через removeQueries
  });
};
