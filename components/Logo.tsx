import { GraduationCap } from "lucide-react";
import Link from "next/link";

function Logo({ variant = "light" }: { variant?: "dark" | "light" }) {
  if (variant === "light") {
    return (
      <Link href={"/"} className="flex items-center space-x-2">
        <div className="bg-blue-500 rounded-full p-1">
          <span className="text-white font-bold text-xl">
            <GraduationCap />
          </span>
        </div>
        <span className=" font-bold text-xl">
          School <span className="text-blue-500">Base</span>
        </span>
      </Link>
    );
  } else {
    return (
      <Link href={"/"} className="flex items-center space-x-2">
        <div className="bg-white rounded-full p-1">
          <span className="text-blue-800 font-bold text-xl">
            <GraduationCap />
          </span>
        </div>
        <span className=" font-bold text-xl">
          School <span className="text-blue-100">Pro</span>
        </span>
      </Link>
    );
  }
}
export default Logo;
