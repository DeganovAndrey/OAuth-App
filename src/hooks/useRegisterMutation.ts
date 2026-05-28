import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import type { Payload } from "../types";
import type { AxiosError } from "axios";
import { useAuth } from "../context/useAuth";
import { useState } from "react";

export const useRegisterMutation = () => {
  // const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const mutation = useMutation({
    mutationFn: (payload: Payload) => registerUser(payload),
    onSuccess: (data, variables) => {
      login(data.token, {
        email: variables.email,
      });
      // navigate("/login");
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400)
        setErrorMessage("Плохой запрос клиента");
      else if (axiosError.response?.status === 409)
        setErrorMessage("Email уже занят");
      else if (axiosError.response?.status === 422)
        setErrorMessage("Проверьте правильность заполнения полей");
      else setErrorMessage("Неизвестная ошибка");
    },
  });
  return { ...mutation, errorMessage };
};
