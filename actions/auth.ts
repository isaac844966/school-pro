"use server";
import { SessionData, User, School } from "@/app/types/types";
import { cookies } from "next/headers";

import { axiosInstance } from ".";
import axios from "axios";
import { getSchoolById } from "./schools";

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<SessionData> {
  try {
    const response = await axiosInstance.post("/login", data);
    console.log(response);

    const { user, accessToken, rereshToken } = response.data.data;
    const userData = response.data.data;
    await createServerSession(userData);
    const school = await getSchoolById(userData?.user.schoolId);
    await saveServerSchool(school as School);

    return response.data.data as SessionData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to login";
      throw new Error(message);
    }
    throw error;
  }
}

export async function createServerSession(data: SessionData) {
  try {
    const cookieStore = await cookies();
    cookieStore.set("user", JSON.stringify(data.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60,
    });
    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60,
    });
    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });
    return { success: true };
  } catch (error) {
    console.error("Session creation error:", error);
    return { success: false, error: "Invalid session data" };
  }
}
export async function saveServerSchool(data: School) {
  try {
    const cookieStore = await cookies();
    cookieStore.set("school", JSON.stringify(data), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return { success: true };
  } catch (error) {
    console.error("Session creation error:", error);
    return { success: false, error: "Invalid session data" };
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("user");
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: "Logout failed" };
  }
}

export async function getServerUser() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");
  if (!userCookie) return null;
  try {
    const user = JSON.parse(userCookie.value);
    return user as User;
  } catch (error) {
    return null;
  }
}
export async function getServerSchool() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("school");
  if (!userCookie) return null;
  try {
    const school = JSON.parse(userCookie.value);
    return school as School;
  } catch (error) {
    return null;
  }
}
