"use server";

import { ContactProps } from "@/app/types/types";
import { axiosInstance } from ".";
import axios from "axios";
export type Analytics = {
  title: string;
  count: number;
};

export async function getAllAnalytis(schoolId: string) {
  try {
    const response = await axiosInstance.get(`/analytics/school/${schoolId}`);
    const analytics = response.data;
    return analytics as Analytics[];
  } catch (error) {
    console.log(error);
  }
}
