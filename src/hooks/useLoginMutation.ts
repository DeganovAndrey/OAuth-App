import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/api";
import { useAuth } from "../context/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import type { Payload } from "../types";

export const useLoginMutation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const from =
    (location.state as { from?: Location })?.from?.pathname ?? "/dashboard";

  return useMutation({
    mutationFn: (payload: Payload) => loginUser(payload),
    onSuccess: (data, variables) => {
      login(data.token, { email: variables.email });
      navigate(from, { replace: true });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};