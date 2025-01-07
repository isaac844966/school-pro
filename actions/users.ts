"use server";

import {
  ParentProps,
  Teacher,
  UserCreateProps,
  UserRole,
} from "@/app/types/types";
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
export async function getProfileId(userId: string, role: UserRole) {
  try {
    if (!userId || !role) {
      return null;
    }

    const response = await axiosInstance.get(`/users/${userId}?role=${role}`);

    return response.data.id as string;
  } catch (error) {
    console.error("Error fetching profile ID:", error);
    return null;
  }
}
