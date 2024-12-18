import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  CreditCard,
  Key,
  Settings2,
  Sparkles,
  SquareTerminal,
  User,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronRight } from "lucide-react";
import Logo from "@/components/Logo";
import UserMenu from "./user-menu";
export default function AppSidebar() {
  const sidebarLinks = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [{ title: "Overview", url: "#" }],
    },
    {
      title: "Student Management",
      url: "/dashboard/students",
      icon: Bot,
      items: [
        { title: "Student Directory", url: "/dashboard/students" },
        { title: "Fees", url: "/dashboard/students/fees" },
        { title: "Students Ids", url: "/dashboard/students/ids" },
        { title: "Attendance", url: "/dashboard/students/attendance" },
      ],
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: User,
      items: [
        { title: "Parents", url: "/dashboard/users/parents" },
        { title: "Teachers", url: "/dashboard/users/teachers" },
        { title: "Secretary", url: "/dashboard/users/secretary" },
      ],
    },
    {
      title: "Academics",
      url: "/dashboard/academics",
      icon: BookOpen,
      items: [
        { title: "Classes and Streams", url: "/dashboard/academics/classes" },
        { title: "Subjects", url: "/dashboard/academics/subjects" },
        { title: "Departments", url: "/dashboard/academics/departments" },
        { title: "Examinations", url: "#" },
        { title: "Assignments", url: "#" },
        { title: "Report Cards", url: "#" },
      ],
    },
    {
      title: "Staff Management",
      url: "#",
      icon: BadgeCheck,
      items: [
        { title: "Staff Directory", url: "#" },
        { title: "Attendance", url: "#" },
        { title: "Leave Management", url: "#" },
        { title: "Performance", url: "#" },
      ],
    },
    {
      title: "Communication",
      url: "#",
      icon: Sparkles,
      items: [
        { title: "Messages", url: "#" },
        { title: "Announcements", url: "#" },
        { title: "Notice Board", url: "#" },
        { title: "Emergency Alerts", url: "#" },
      ],
    },
    {
      title: "Finance",
      url: "#",
      icon: CreditCard,
      items: [
        { title: "Fee Management", url: "#" },
        { title: "Payments", url: "#" },
        { title: "Scholarships", url: "#" },
        { title: "Reports", url: "#" },
      ],
    },
    {
      title: "Transport",
      url: "#",
      icon: SquareTerminal,
      items: [
        { title: "Routes", url: "#" },
        { title: "Tracking", url: "#" },
        { title: "Drivers", url: "#" },
        { title: "Maintenance", url: "#" },
      ],
    },
    {
      title: "Resources",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Library", url: "#" },
        { title: "Inventory", url: "#" },
        { title: "Facilities", url: "#" },
        { title: "Assets", url: "#" },
      ],
    },
    {
      title: "Reports & Analytics",
      url: "#",
      icon: Bell,
      items: [
        { title: "Academic Reports", url: "#" },
        { title: "Financial Reports", url: "#" },
        { title: "Custom Reports", url: "#" },
        { title: "Analytics Dashboard", url: "#" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "School Profile", url: "#" },
        { title: "User Management", url: "#" },
        { title: "System Settings", url: "#" },
        { title: "Backup & Security", url: "#" },
      ],
    },
    {
      title: "Admin Only",
      url: "/dashboard/admin",
      icon: Key,
      items: [{ title: "Contacts", url: "/dashboard/admin/contacts" }],
    },
  ];
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Logo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarLinks.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
