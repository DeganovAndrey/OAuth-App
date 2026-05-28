import { type LoginResponse, type Payload, type User } from "../types";
import { clientApi } from "./axios";

export const loginUser = (payload: Payload): Promise<LoginResponse> =>
  clientApi.post("/login", payload);

export const registerUser = (payload: Payload): Promise<LoginResponse> =>
  clientApi.post("/register", payload);

export const getProfile = (id: number): Promise<User> =>
  clientApi.get<never, { data: User }>(`/users/${id}`).then((res) => res.data);

export const logoutUser = (): Promise<void> => clientApi.post("/logout");
