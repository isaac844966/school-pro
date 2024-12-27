"use server";

import { ParentProps, Teacher, UserCreateProps } from "@/app/types/types";
import { axiosInstance } from ".";
import axios from "axios";

export async function createUser(data: UserCreateProps) {
  try {
    const response = await axiosInstance.post("/register", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create user";
      throw new Error(message);
    }
    throw error;
  }
}
