import axios from "axios";
import { tokenStorage } from "../authStore";

export const clientApi = axios.create({
  baseURL: "https://reqres.in/api",
  timeout: 5000,
});

const STATUS_MESSAGES: Record<number, string> = {
  400: "Неверный запрос",
  401: "Нет авторизации",
  403: "Доступ запрещен",
  404: "Данные не найдены",
  500: "Ошибка сервера",
};

clientApi.interceptors.request.use((config) => {
  config.headers["x-api-key"] = "free_user_3EG30vwbmmwmn6qgiBsKpxLo7SG";
  if (tokenStorage.accessToken) {
    config.headers.Authorization = `Bearer ${tokenStorage.accessToken}`;
  }
  return config;
});
// Request interceptor — автоматически подставляет access token из памяти в заголовок
// Authorization: Bearer

clientApi.interceptors.response.use(
  (response) => response.data,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // перехватывает 401, пробует обновить токен (или делает logout), затем
      // повторяет исходный запрос

      try {
        // ЗАГЛУШКА: reqres.in не поддерживает refresh-токены.
        // В реальном проекте здесь был бы запрос к /auth/refresh
        // с refreshToken из httpOnly cookie или tokenStorage.refreshToken,
        // а в ответ пришёл бы новый accessToken, который мы сохранили бы в память:
        // const { accessToken } = await clientApi.post("/auth/refresh");
        // tokenStorage.accessToken = accessToken;
        throw new Error("Refresh недоступен");
      } catch {
        tokenStorage.accessToken = "";
        window.location.href = "/login";
        return Promise.reject(new Error("Сессия истекла, войди заново"));
      }
    }

    let message: string;
    if (error.response) {
      const { status, data } = error.response;
      message =
        data?.message ||
        STATUS_MESSAGES[status] ||
        `Ошибка сервера - ${status}`;
    } else if (error.request) {
      message = "Сервер не отвечает";
    } else {
      message = error.message || "Произошла непредвиденная ошибка";
    }
    return Promise.reject(new Error(message));
  },
);
