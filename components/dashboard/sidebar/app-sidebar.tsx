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
  BookOpen,
  Bot,
  SquareTerminal,
  User as UserIcon,
  ChevronRight,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Logo from "@/components/Logo";
import UserMenu from "./user-menu";
import { getServerUser } from "@/actions/auth";
import { redirect } from "next/navigation";

interface SidebarLink {
  title: string;
  url: string;
  icon: any;
  isActive?: boolean;
  items: Array<{
    title: string;
    url: string;
  }>;
}

export default async function AppSidebar() {
  const user = await getServerUser();
  if (!user) {
    redirect("/login");
  }
  const sidebarLinks: SidebarLink[] = [
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
      icon: UserIcon,
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
        { title: "Periods", url: "/dashboard/academics/terms" },
        { title: "Examinations", url: "#" },
        { title: "Assignments", url: "#" },
        { title: "Report Cards", url: "#" },
      ],
    },
    // ... other sidebar links remain the same ...
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Logo schoolLogo={user.schoolLogo} schoolName={user.schoolName} />
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
