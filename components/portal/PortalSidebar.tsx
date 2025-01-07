"use client";
import React from "react";
import Link from "next/link";
import {
  Banknote,
  Bell,
  DollarSign,
  Home,
  LayoutGrid,
  LineChart,
  LucideIcon,
  Mail,
  Package,
  ScrollText,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "../Logo";
import { User, UserRole } from "@/app/types/types";
import { useUserSession } from "@/store/auth";

interface NavLinks {
  title: string;
  href: string;
  icon: LucideIcon;
  count?: number;
}
type RoleLinks = {
  [K in UserRole]: NavLinks[];
};
export function renderLoggedInUserLinks(role: UserRole): NavLinks[] {
  const commonLinks: NavLinks[] = [
    {
      title: "Dashboard",
      href: "/portal",
      icon: Home,
    },
  ];
  const links: RoleLinks = {
    SUPER_ADMIN: [
      {
        title: "Orders",
        href: "/dashboard/orders",
        icon: ShoppingCart,
        count: 6,
      },
      {
        title: "Products",
        href: "/dashboard/products",
        icon: Package,
      },
      {
        title: "Customers",
        href: "/dashboard/customers",
        icon: Users,
      },
      {
        title: "Categories",
        href: "/dashboard/categories",
        icon: LayoutGrid,
      },
      {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: LineChart,
      },
    ],
    ADMIN: [
      {
        title: "Orders",
        href: "/dashboard/orders",
        icon: ShoppingCart,
        count: 6,
      },
      {
        title: "Products",
        href: "/dashboard/products",
        icon: Package,
      },
      {
        title: "Customers",
        href: "/dashboard/customers",
        icon: Users,
      },
      {
        title: "Categories",
        href: "/dashboard/categories",
        icon: LayoutGrid,
      },
      {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: LineChart,
      },
    ],
    TEACHER: [
      {
        title: "Exams",
        href: "/portal/teacher/exams",
        icon: ScrollText,
      },
      {
        title: "Question Bank",
        href: "/portal/teacher/questions",
        icon: Banknote,
      },
      {
        title: "Exams Papers",
        href: "/portal/teacher/exam-papers",
        icon: ShoppingCart,
      },
    ],
    PARENT: [
      {
        title: "My Children",
        href: "/portal/parent",
        icon: Users,
      },
      {
        title: "Payments",
        href: "/portal/parent/payments",
        icon: DollarSign,
      },
      {
        title: "Messages",
        href: "/portal/parent/messages",
        icon: Mail,
      },
    ],
    STUDENT: [
      {
        title: "Students",
        href: "/portal/student",
        icon: ShoppingCart,
      },
    ],
    SECRETARY: [
      {
        title: "Users",
        href: "/dashboard/orders",
        icon: ShoppingCart,
      },
    ],
  };
  return [...commonLinks, ...links[role]];
}

function PortalSidebar({ user }: { user: User }) {
  const sidebarLinks = renderLoggedInUserLinks(user.role as UserRole);
  const pathname = usePathname();
  const { clearSession } = useUserSession();

  const router = useRouter();
  async function handleLogout() {
    await clearSession();
    router.push("/login");
  }
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 justify-between items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo schoolLogo={user.schoolLogo} schoolName={user.schoolName} />
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {sidebarLinks.map((item, i) => {
              const Icon = item.icon;
              const isActive = item.href === pathname;
              return (
                <Link
                  key={i}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive && " bg-muted  text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                  {item.count && (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {item.count}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button size="sm" className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
export default PortalSidebar;
