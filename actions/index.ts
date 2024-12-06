import axios from "axios";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_API_URL) {
  throw new Error("API URL is not defined in the environment variables.");
}

export const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
