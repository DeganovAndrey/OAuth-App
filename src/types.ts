export type User = {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
};

export interface UsersResponse {
  data: User[];
  page: number;
  per_page: number;
  total: number;
}

export interface LoginResponse {
  token: string;
}

export interface Payload {
  email: string;
  password: string;
}
