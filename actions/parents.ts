"use server";

import { ParentProps } from "@/app/types/types";
import { axiosInstance } from ".";
import axios from "axios";

export async function createParent(data: ParentProps) {
  try {
    const response = await axiosInstance.post("/parents", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to create parent";
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteParent(id: string) {
  console.log("deleted", id);
  return {
    ok: true,
  };
}
export async function getAllParents() {
  try {
    const response = await axiosInstance.get("/parents");
    const parents = response.data;
    console.log(parents);
    return parents as ParentProps[];
  } catch (error) {
    console.log(error);
  }
}
