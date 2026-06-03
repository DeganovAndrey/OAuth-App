import { clientApi } from "../api/axios";
import type { User } from "../types";

export const getUserIdEmail = async (email: string): Promise<number> => {
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const res = await clientApi.get<{ data: User[]; total_pages: number }>(
      `/users?page=${page}`,
    );
    const user = res.data.data.find((el) => el.email === email);
    if (user) return user.id;
    console.log(user.id);
    totalPages = res.data.total_pages;
    page++;
  }
  throw new Error(`User with this ${email} not found`);
};
