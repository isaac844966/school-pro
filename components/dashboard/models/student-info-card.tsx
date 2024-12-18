"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StudentProps } from "@/app/types/types";
import {
  Calendar,
  Flag,
  Globe,
  Mail,
  MapPin,
  Phone,
  User,
  Users,
  BookOpen,
  Layers,
  UserPlus,
  Hash,
  FileText,
  Heart,
} from "lucide-react";

interface StudentCardInfoProps {
  row: StudentProps;
}

export default function StudentCardInfo({ row }: StudentCardInfoProps) {
  const InfoItem = ({
    icon: Icon,
    title,
    value,
    fallback,
  }: {
    icon: any;
    title: string;
    value: string | undefined;
    fallback: string;
  }) => (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-sm text-muted-foreground break-all">
        {value || fallback}
      </p>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[900px]">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold mb-4">
            {row.firstName?.substring(0, 1).toUpperCase()}
            {row.lastName?.substring(0, 1).toUpperCase()}
          </div>
          <DialogTitle className="text-xl">{`${row.firstName} ${row.lastName}`}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
          <InfoItem
            icon={Mail}
            title="Email"
            value={row.email}
            fallback="N/A"
          />
          <InfoItem
            icon={Phone}
            title="Phone"
            value={row.phone}
            fallback="N/A"
          />
          <InfoItem
            icon={Users}
            title="Gender"
            value={row.gender}
            fallback="N/A"
          />
          <InfoItem
            icon={MapPin}
            title="Address"
            value={row.address}
            fallback="N/A"
          />
          <InfoItem
            icon={Flag}
            title="Nationality"
            value={row.nationality}
            fallback="N/A"
          />
          <InfoItem
            icon={Globe}
            title="Registration Number"
            value={row.regNo}
            fallback="N/A"
          />
          <InfoItem
            icon={Calendar}
            title="Date of Birth"
            value={new Date(row.dob).toLocaleDateString()}
            fallback="N/A"
          />
          <InfoItem
            icon={User}
            title="Joined"
            value={new Date(row.createdAt).toLocaleDateString()}
            fallback="N/A"
          />
          <InfoItem
            icon={BookOpen}
            title="Class"
            value={row.classTitle}
            fallback={row.classId}
          />
          <InfoItem
            icon={Layers}
            title="Stream"
            value={row.streamTitle}
            fallback={row.streamId}
          />
          <InfoItem
            icon={UserPlus}
            title="Parent"
            value={row.parentName}
            fallback={row.parentId}
          />
          <InfoItem
            icon={Hash}
            title="Roll Number"
            value={row.rollNo}
            fallback="N/A"
          />
          <InfoItem
            icon={FileText}
            title="BCN"
            value={row.BCN}
            fallback="N/A"
          />
          <InfoItem
            icon={Heart}
            title="Religion"
            value={row.religion}
            fallback="N/A"
          />
          <InfoItem
            icon={Globe}
            title="State"
            value={row.state}
            fallback="N/A"
          />
          <InfoItem
            icon={Calendar}
            title="Admission Date"
            value={new Date(row.admissionDate).toLocaleDateString()}
            fallback="N/A"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
