import { getServerUser } from "@/actions/auth";
import Login from "@/components/frontend/auth/Login";
import { redirect } from "next/navigation";

async function page() {
  const user = await getServerUser();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <div>
      <Login />
    </div>
  );
}
export default page;
