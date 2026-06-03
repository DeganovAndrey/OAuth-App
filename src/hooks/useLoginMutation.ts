import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, loginUser } from "../api/api";
import { useAuth } from "../context/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import type { Payload } from "../types";
import { tokenStorage } from "../utils/authStore";
import { getUserIdEmail } from "../utils/getUserIdEmail";

export const useLoginMutation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const queryClient = useQueryClient();

  const from =
    (location.state as { from?: Location })?.from?.pathname ?? "/dashboard";

  return useMutation({
    mutationFn: (payload: Payload) => loginUser(payload),
    onSuccess: async (data, variables) => {
      login(data.token, { email: variables.email });
      tokenStorage.email = variables.email;

      try {
        const id = await getUserIdEmail(variables.email);
        tokenStorage.id = id;

        await queryClient.fetchQuery({
          queryKey: ["user", id, tokenStorage.sessionId],
          queryFn: () => getProfile(id),
        });
      } catch (error) {
        return error;
      }
      navigate(from, { replace: true });
    },
    onError: (error) => error.message,
  });
};
