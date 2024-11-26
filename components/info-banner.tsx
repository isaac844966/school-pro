"use client";

import { useState } from "react";
import { X, Info, CheckCircle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "flex items-center justify-between py-2 px-4 mb-3 rounded-lg shadow-md",
  {
    variants: {
      type: {
        info: "bg-blue-100 text-blue-800 border border-blue-200",
        success: "bg-green-100 text-green-800 border border-green-200",
        warning: "bg-orange-100 text-orange-800 border border-orange-200",
        danger: "bg-red-100 text-red-800 border border-red-200",
      },
    },
    defaultVariants: {
      type: "info",
    },
  }
);
interface BannerProps extends VariantProps<typeof bannerVariants> {
  message: string;
  type?: "info" | "success" | "warning" | "danger";
}

export default function InfoBanner({ message, type = "info" }: BannerProps) {
  const [isVisible, setIsVissible] = useState(true);
  if (!isVisible) return null;

  return (
    <div className={cn(bannerVariants({ type }))}>
      <div className="flex items-center space-x-3">
        {type === "info" ? (
          <Info className="h-5 w-5 flex-shrink-0" />
        ) : (
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
        )}
        <p className="text-sm font-meduim">{message}</p>
      </div>
      <button
        onClick={() => setIsVissible(false)}
        className="text-grey-500 hover:text-grey-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 focus:ring-blue-600 rounded-full p-1"
        aria-label="Dismiss"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
