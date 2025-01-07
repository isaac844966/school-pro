"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

import {
  Calendar,
  Check,
  LucideIcon,
  RefreshCcw,
  Star,
  Stethoscope,
  Users,
  X,
} from "lucide-react";
import { User } from "@/app/types/types";
export interface PatientProps {
  patientId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  gender: string;
  occupation: string;
  dob: string;
}
export type DoctorAnalyticsProps = {
  title: string;
  count: number;
  icon: LucideIcon;
  unit: string;
  detailLink: string;
};
export default function PortalAnalytics({ user }: { user: User }) {
  const analytics: DoctorAnalyticsProps[] = [
    {
      title: "Total Patients",
      count: 1234,
      icon: Users,
      unit: "",
      detailLink: "/analytics/patients",
    },
    {
      title: "Consultations",
      count: 156,
      icon: Stethoscope,
      unit: "",
      detailLink: "/analytics/consultations",
    },
    {
      title: "Appointments",
      count: 42,
      icon: Calendar,
      unit: "",
      detailLink: "/analytics/appointments",
    },
    {
      title: "Rating",
      count: 4.8,
      icon: Star,
      unit: "",
      detailLink: "/analytics/ratings",
    },
  ];

  const status = "APPROVED";
  return (
    <div className="px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight mb-3">
          Welcome, {user?.role} {user.name}
        </h1>
        <div className="">
          <button
            className={cn(
              "py-2 px-3 rounded-md text-xs flex items-center space-x-2",
              status === "APPROVED"
                ? "bg-green-500 text-white"
                : status === "PENDING"
                ? "bg-orange-400"
                : "bg-red-500 text-white"
            )}
          >
            {status === "APPROVED" ? (
              <Check />
            ) : status === "PENDING" ? (
              <RefreshCcw />
            ) : (
              <X />
            )}

            {status}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
        {analytics.map((item, i) => {
          const Icon = item.icon;
          return (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {item.unit}
                  {item.count.toString().padStart(2, "0")}
                </div>
                <Link
                  href={item.detailLink}
                  className="text-xs text-muted-foreground"
                >
                  View Details
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
