import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function convertToValidDateFormat(date: string): string | null {
  if (!date) return null;

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    console.error(`Invalid date: ${date}`);
    return null;
  }

  return parsedDate.toISOString().split("T")[0];
}


// Optional: If you want to keep the original formatDate for display
export function formatReadableDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateId() {
  const now = new Date()

  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, "0")
  const date = now.getDate().toString().padStart(2, "0")
  const hour = now.getHours().toString().padStart(2, "0")
  const minutes = now.getMinutes().toString().padStart(2, "0")
  return `${year}${month}${date}${hour}${minutes}`
}