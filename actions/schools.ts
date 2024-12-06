"use server";
import { SchoolProps } from "@/app/types/types";
import axios from "axios";
import { axiosInstance } from ".";

export async function createSchool(data: SchoolProps) {
  try {
    const response = await axiosInstance.post("/schools", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to create school";
      throw new Error(message);
    }
    throw error;
  }
}
