"use server";

import { PeriodCreateProps, Period, GroupedPeriods } from "@/app/types/types";
import { axiosInstance } from ".";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function createPeriod(data: PeriodCreateProps) {
  try {
    const response = await axiosInstance.post("/periods", data);
    revalidatePath("/dashboard/academics/terms");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to create period";
      throw new Error(message);
    }
    throw error;
  }
}

export async function getAllPeriods(schoolId: string) {
  try {
    const response = await axiosInstance.get(`/periods/list//${schoolId}`);
    const periods = response.data.data;
    return periods as Period[];
  } catch (error) {
    console.log(error);
  }
}
export async function getAllGroupedPeriods(schoolId: string) {
  try {
    const response = await axiosInstance.get(`/periods/${schoolId}`);
    const periods = response.data;
    return periods as GroupedPeriods;
  } catch (error) {
    console.log(error);
  }
}
