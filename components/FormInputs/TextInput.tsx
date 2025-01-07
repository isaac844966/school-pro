/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";

// Utility function to format the phone number
function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-numeric characters except the '+' at the beginning
  let sanitized = phoneNumber.replace(/[^\d+]/g, "");

  if (sanitized.startsWith("+2340")) {
    // If starts with '+2340', remove the extra '0'
    return sanitized.replace("+2340", "+234");
  } else if (sanitized.startsWith("0")) {
    // If starts with '0', remove the '0' and prepend '+234'
    return "+234" + sanitized.slice(1);
  }

  // If already in correct format, return as-is
  return sanitized;
}

// Component Props
type TextInputProps = {
  register: any;
  errors: any;
  label: string;
  type?: string;
  name: string;
  toolTipText?: string;
  unit?: string;
  placeholder?: string;
  icon?: any;
  min?: number;
  max?: number;
};

// TextInput Component
export default function TextInput({
  register,
  errors,
  label,
  type = "text",
  name,
  toolTipText,
  unit,
  icon,
  placeholder,
  min,
  max,
}: TextInputProps) {
  const Icon = icon;
  const [formattedValue, setFormattedValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (type === "phone") {
      const formatted = formatPhoneNumber(input);
      setFormattedValue(formatted);
    } else {
      setFormattedValue(input);
    }
  };

  return (
    <div>
      {/* Label and Tooltip */}
      <div className="flex space-x-2 items-center">
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        {toolTipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <CircleHelp className="w-4 h-4 text-slate-500" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{toolTipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* Input Field */}
      <div className="mt-2">
        <div className="relative rounded-md">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Icon className="text-slate-300 w-4 h-4" />
            </div>
          )}
          <input
            min={min}
            max={max}
            id={name}
            type={type}
            value={formattedValue}
            {...register(`${name}`, { required: true })}
            className={cn(
              "block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-sm",
              (errors[`${name}`] && "focus:ring-red-500 pl-8") ||
                (icon && "pl-8")
            )}
            placeholder={placeholder || label}
            onChange={handleInputChange}
          />
          {unit && (
            <p className="bg-white py-2 px-3 rounded-tr-md rounded-br-md absolute inset-y-0 right-1 my-[2px] flex items-center">
              {unit}
            </p>
          )}
        </div>
        {errors[`${name}`] && (
          <span className="text-xs text-red-600">{label} is required</span>
        )}
      </div>
    </div>
  );
}
