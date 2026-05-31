import axios from "axios";
import { tokenStorage } from "../utils/authStore";
import { logoutUser } from "./api";

export const clientApi = axios.create({
  baseURL: "https://reqres.in/api",
  timeout: 5000,
});

let isRefreshing = false;
let queue: Array<(token: string) => void> = [];

const processQueue = (newToken: string) => {
  queue.forEach((resolve) => resolve(newToken));
  queue = [];
};

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

clientApi.interceptors.response.use(
  (response) => response.data,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          queue.push((newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(clientApi(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const { accessToken } = await axios.post<
          never,
          { accessToken: string }
        >(
          "/api/auth/refresh",
          {},
          { headers: { Authorization: `Bearer ${tokenStorage.refreshToken}` } },
        );
        tokenStorage.accessToken = accessToken;
        processQueue(accessToken);
        originalRequest.headers.Authorization = `Bearer ${tokenStorage.accessToken}`;
        return clientApi(originalRequest);
      } catch {
        logoutUser();
        tokenStorage.accessToken = "";
        tokenStorage.sessionId = "";
        tokenStorage.refreshToken = "";
        window.location.href = "/login";
        return Promise.reject(new Error("Сессия истекла, войди заново"));
      } finally {
        isRefreshing = false;
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
