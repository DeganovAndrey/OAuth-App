import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import type { Payload } from "../types";
import type { AxiosError } from "axios";

export const useRegisterMutation = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (payload: Payload) => registerUser(payload),
    onSuccess: () => navigate("/login"),
    onError: (error) => {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) return "Плохой запрос клиента";
      else if (axiosError.response?.status === 409) return "Email уже занят";
      else if (axiosError.response?.status === 422)
        return "Проверьте правильность заполнения полей";
      else return "Неизвестная ошибка";
    },
  });
  return { ...mutation };
};
