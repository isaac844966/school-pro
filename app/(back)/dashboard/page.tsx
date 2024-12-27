import { getAllAnalytis } from "@/actions/analytics";
import { getServerUser } from "@/actions/auth";
import Dashboard from "@/components/dashboard/overview";
import { redirect } from "next/navigation";

async function page() {
  const user = await getServerUser();
  const analytics = (await getAllAnalytis(user?.schoolId ?? "")) || [];
  console.log(analytics);
  if (!user) {
    redirect("/login");
  }

  return <Dashboard user={user} analytics={analytics} />;
}
export default page;
