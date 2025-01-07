import { getServerUser } from "@/actions/auth";
import Login from "@/components/frontend/auth/Login";
import { redirect } from "next/navigation";

async function page() {
  const user = await getServerUser();
  if (user) {
    const role = user?.role;
    const path =
      role === "ADMIN" || role === "SUPER_ADMIN" ? "/dashboard" : "/portal";
    redirect(path);
  }
  return (
    <div>
      <Login />
    </div>
  );
}
export default page;
