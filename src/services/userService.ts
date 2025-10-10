import { api } from "./api";
import type { User } from "../types/userTypes";

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data.data; 
};
