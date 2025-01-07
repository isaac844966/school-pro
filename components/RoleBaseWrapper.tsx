import { getServerUser } from "@/actions/auth";
import { UserRole } from "@/app/types/types";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import NotAuthorized from "./not-authorized";

type Props = {
  children: ReactNode;
  allowedRoles: UserRole[];
};
async function RoleBaseWrapper({ children, allowedRoles }: Props) {
  const user = await getServerUser();
  if (!user) {
    redirect("/login");
  }
  const userRole = user.role as UserRole;
  //check allowed role
  if (!allowedRoles.includes(userRole)) return <NotAuthorized />;
  return <div>{children}</div>;
}
export default RoleBaseWrapper;
