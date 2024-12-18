"use server";

import { ParentProps, Teacher, TeacherCreateProps } from "@/app/types/types";
import { axiosInstance } from ".";
import axios from "axios";

export async function createTeacher(data: TeacherCreateProps) {
  try {
    const response = await axiosInstance.post("/teachers", data);
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
export async function getAllTeachers() {
  try {
    const response = await axiosInstance.get("/teachers");
    const teachers = response.data;
    console.log(teachers);
    return teachers as Teacher[];
  } catch (error) {
    console.log(error);
  }
}
