"use server";
import { SchoolProps, School } from "@/app/types/types";
import axios from "axios";
import { axiosInstance } from ".";

export async function createSchool(data: SchoolProps) {
  try {
    const response = await axiosInstance.post("/schools", data);
    return response.data.data as School;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to create school";
      throw new Error(message);
    }
    throw error;
  }
}

export async function getSchoolById(id: string | null | undefined) {
  if (id) {
    try {
      const response = await axiosInstance.get(`/schools/${id}`);
      console.log(response);
      return response.data.data as School;
    } catch (error) {
      console.log(error);
    }
  }
}
