"use server";

import { StudentProps } from "@/app/types/types";
import { axiosInstance } from ".";
import axios from "axios";

export async function createStudent(data: StudentProps) {
  try {
    const response = await axiosInstance.post("/students", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to create student";
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteStudent(id: string) {
  console.log("deleted", id);
  return {
    ok: true,
  };
}
export async function getAllStudents() {
  try {
    const response = await axiosInstance.get("/students");
    const students = response.data;
    return students as StudentProps[];
  } catch (error) {
    console.log(error);
  }
}
export async function getStudentNextSequence() {
  try {
    const response = await axiosInstance.get("/students/seq");
    const nextSeq = response.data;
    return nextSeq as number
  } catch (error) {
    console.log(error);
  }
}
