import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/api";
import type { User } from "../types";

export const useProfile = (id: number) => {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => getProfile(id),
    enabled: !!id,
  });
};
