import { getServerUser } from "@/actions/auth";
import AppSidebar from "@/components/dashboard/sidebar/app-sidebar";
import SidebarHeader from "@/components/dashboard/sidebar/sidebar-header";
import PortalHeader from "@/components/portal/PortalHeader";
import PortalSidebar from "@/components/portal/PortalSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

async function PortalLayout({ children }: { children: ReactNode }) {
  const user = await getServerUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <PortalSidebar user={user} />
      <div className="flex flex-col">
        <PortalHeader user={user} />
        <div className="flex min-h-screen w-full flex-col">{children}</div>
      </div>
    </div>
  );
}
export default PortalLayout;
