"use server";

import { CreateSubjectData, Subject, SubjectList } from "@/app/types/types";
import { axiosInstance } from ".";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function createSubject(
  data: CreateSubjectData
): Promise<Subject | null> {
  try {
    const response = await axiosInstance.post("/subjects", data);
    const newSubject = response.data;

    revalidatePath("/dashboard/academics/subjects");

    return newSubject;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to create subject";
      console.error("Error creating subject:", message);
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
}

export async function deleteSubject(id: string): Promise<{ ok: boolean }> {
  try {
    await axiosInstance.delete(`/subjects/${id}`);

    revalidatePath("/dashboard/academics/subjects");

    return { ok: true };
  } catch (error) {
    console.error("Error deleting subject:", error);
    return { ok: false };
  }
}

export async function getAllSubjects(schoolId: string): Promise<Subject[]> {
  try {
    const response = await axiosInstance.get(`/subjects/school/${schoolId}`);
    return response.data as Subject[];
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return [];
  }
}

export async function getAllSubjectsList(
  schoolId: string
): Promise<SubjectList[]> {
  try {
    const response = await axiosInstance.get(`/subjects/list/${schoolId}`);
    return response.data as SubjectList[];
  } catch (error) {
    console.error("Error fetching subjects list:", error);
    return [];
  }
}
