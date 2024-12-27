"use client";
export interface User {
  schoolLogo: string | null;
  schoolName: string | null;
}

import Image from "next/image";
import Link from "next/link";

function Logo({
  variant = "light",
  size = "md",
  schoolLogo,
  schoolName,
}: {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  schoolLogo?: string | null;
  schoolName?: string | null;
}) {
  if (variant === "light") {
    return (
      <Link href="/" className="flex  items-center justify-center space-x-2">
        <Image
          src={schoolLogo ?? "/images/logo.webp"}
          alt={schoolName ?? "School Base"}
          width={500}
          height={150}
          className="w-40 h-20 object-fill"
        />
      </Link>
    );
  }

  return (
    <Link href="/" className="flex   items-center justify-center space-x-2">
      <Image
        src={schoolLogo ?? "/images/logo.webp"}
        alt={schoolName ?? "School Base"}
        width={500}
        height={10}
        className=" w-40 h-20 object-fill"
      />
    </Link>
  );
}

export default Logo;
