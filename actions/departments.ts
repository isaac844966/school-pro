"use server";

import { Department, DepartmentList } from "@/app/types/types";
import { axiosInstance } from ".";
import axios from "axios";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createDepartment(data: Department) {
  try {
    const response = await axiosInstance.post("/departments", data);
    // revalidateTag("departments");
    // revalidatePath("/dashboard/academics/departments");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to create department";
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteDepartment(id: string) {
  console.log("deleted", id);
  return {
    ok: true,
  };
}
export async function getAllDepartments(schoolId: string) {
  try {
    const response = await axiosInstance.get(`/departments/school/${schoolId}`);
    const departments = response.data;
    return departments as Department[];
  } catch (error) {
    console.log(error);
  }
}
export async function getAllDepartmentsLIst(schoolId: string) {
  try {
    const response = await axiosInstance.get(`/departments/list/${schoolId}`);
    const departments = response.data;
    console.log(departments);
    return departments as DepartmentList[];
  } catch (error) {
    console.log(error);
  }
}
