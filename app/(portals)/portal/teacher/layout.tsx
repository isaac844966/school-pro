import { ReactNode } from "react";
import RoleBaseWrapper from "@/components/RoleBaseWrapper";

export default function RoleLayout({ children }: { children: ReactNode }) {
  return (
    <RoleBaseWrapper allowedRoles={["TEACHER"]}>{children}</RoleBaseWrapper>
  );
}
