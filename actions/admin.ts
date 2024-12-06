"use server";

import { ContactProps } from "@/app/types/types";
import { axiosInstance } from ".";
import axios from "axios";

export async function createContact(data: ContactProps) {
  try {
    const response = await axiosInstance.post("/contacts", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to create contact";
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteContact(id: string) {
  console.log("deleted", id);
  return {
    ok: true,
  };
}
export async function getAllContacts() {
  try {
    const response = await axiosInstance.get("/contacts");
    const contacts = response.data;
    console.log(contacts);
    return contacts as ContactProps[];
  } catch (error) {
    console.log(error);
  }
}
