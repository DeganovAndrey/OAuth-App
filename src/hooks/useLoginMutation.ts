import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/api";
import { useAuth } from "../context/useAuth";
// import { useNavigate } from "react-router-dom";
import type { Payload } from "../types";

export const useLoginMutation = () => {
  // const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationFn: (payload: Payload) => loginUser(payload),
    onSuccess: (data, variables) => {
      login(data.token, { email: variables.email });
      // navigate("/dashboard");
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
