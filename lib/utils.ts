import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
  const now = new Date();

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const date = now.getDate().toString().padStart(2, "0");
  const hour = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${year}${month}${date}${hour}${minutes}`;
}

export function convertDateToIso(dateStr: string | null): string {
  if (!dateStr) {
    throw new Error("Date string is required");
  }

  // If already in correct ISO format, return as is with time
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return `${dateStr}T00:00:00.000Z`;
  }

  // Try multiple date parsing strategies
  const formats = [
    () => new Date(dateStr), // Default JS Date parsing
    () => {
      // Handle DD/MM/YYYY format
      const [day, month, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day);
    },
    () => {
      // Handle MM/DD/YYYY format
      const [month, day, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day);
    },
  ];

  let parsedDate: Date | null = null;

  for (const parseMethod of formats) {
    try {
      const date = parseMethod();
      if (!isNaN(date.getTime())) {
        parsedDate = date;
        break;
      }
    } catch {}
  }

  if (!parsedDate) {
    throw new Error(
      `Invalid date format. Received: ${dateStr}. Expected formats: YYYY-MM-DD, DD/MM/YYYY, MM/DD/YYYY`
    );
  }

  return parsedDate.toISOString().split("T")[0] + "T00:00:00.000Z";
}
