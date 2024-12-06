"use server";

import {
  Class,
  ClassCreateProps,
  Stream,
  StreamCreateProps,
} from "@/app/types/types";
import { axiosInstance } from ".";
import axios from "axios";

export async function createClass(data: ClassCreateProps) {
  try {
    const response = await axiosInstance.post("/classes", data);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data.data;
  } catch (error) {
    console.error("Error in createClass:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to create class");
    }
    throw new Error("An unexpected error occurred while creating the class");
  }
}

export async function createStream(data: StreamCreateProps) {
  try {
    const response = await axiosInstance.post("/streams", data);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data.data;
  } catch (error) {
    console.error("Error in createStream:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to create stream");
    }
    throw new Error("An unexpected error occurred while creating the stream");
  }
}

export async function deleteContact(id: string) {
  try {
    const response = await axiosInstance.delete(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in deleteContact:", error);
    throw new Error("Failed to delete contact");
  }
}

export async function getAllClasses(): Promise<Class[]> {
  try {
    const response = await axiosInstance.get("/classes");
    return response.data.map((classItem: any) => ({
      ...classItem,
      streams: classItem.streams || [],
    }));
  } catch (error) {
    console.error("Error in getAllClasses:", error);
    throw new Error("Failed to fetch classes");
  }
}

export async function getAllStreams(): Promise<Stream[]> {
  try {
    const response = await axiosInstance.get("/streams");
    console.log("Retrieved streams:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in getAllStreams:", error);
    throw new Error("Failed to fetch streams");
  }
}