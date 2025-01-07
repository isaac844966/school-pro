import { getServerUser } from "@/actions/auth";
import AppSidebar from "@/components/dashboard/sidebar/app-sidebar";
import SidebarHeader from "@/components/dashboard/sidebar/sidebar-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getServerUser();
  if (!user) {
    redirect("/login");
  }
  if (user?.role !== "ADMIN") {
    redirect("/login");
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
export default DashboardLayout;
