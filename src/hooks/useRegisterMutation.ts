import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import type { Payload } from "../types";
import { isAxiosError } from "axios";
import { useState } from "react";

export const useRegisterMutation = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (payload: Payload) => registerUser(payload),
    onSuccess: () => navigate("/dashboard"),
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.response?.status === 400)
          setErrorMessage("Плохой запрос клиента");
        else if (error.response?.status === 409)
          setErrorMessage("Email уже занят");
        else if (error.response?.status === 422)
          setErrorMessage("Проверьте правильность заполнения полей");
        else setErrorMessage(`Неизвестная ошибка - ${error.message}`);
      }
    },
  });
  return { ...mutation, errorMessage };
};

//  eve.holt@reqres.in
