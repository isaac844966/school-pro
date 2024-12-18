"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Teacher } from "@/app/types/types";
import {
  Briefcase,
  Calendar,
  Flag,
  Globe,
  Mail,
  MapPin,
  Phone,
  User,
  GraduationCap,
  Book,
  Users,
} from "lucide-react";

interface TeacherCardInfoProps {
  row: Teacher;
}

export default function TeacherCardInfo({ row }: TeacherCardInfoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[700px]">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold mb-4">
            {row.firstName?.substring(0, 1).toUpperCase()}
            {row.lastName?.substring(0, 1).toUpperCase()}
          </div>
          <DialogTitle className="text-xl">{`${row.title} ${row.firstName} ${row.lastName}`}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
          <InfoItem icon={Mail} label="Email" value={row.email} />
          <InfoItem icon={Phone} label="Phone" value={row.phone} />
          <InfoItem
            icon={GraduationCap}
            label="Designation"
            value={row.designation}
          />
          <InfoItem icon={MapPin} label="Address" value={row.address} />
          <InfoItem icon={Flag} label="Nationality" value={row.nationality} />
          <InfoItem icon={Globe} label="WhatsApp" value={row.whatsappNo} />
          <InfoItem
            icon={Briefcase}
            label="Experience"
            value={`${row.experience} years`}
          />
          <InfoItem icon={User} label="NIN" value={row.NIN} />
          <InfoItem
            icon={Calendar}
            label="Date of Birth"
            value={new Date(row.dateOfBirth).toLocaleDateString()}
          />
          <InfoItem
            icon={Mail}
            label="Contact Method"
            value={row.contactMethod}
          />
          <InfoItem
            icon={Calendar}
            label="Date of Joining"
            value={new Date(row.dateOfJoining).toLocaleDateString()}
          />
          <InfoItem icon={Book} label="Main Subject" value={row.mainSubject} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Subjects</h3>
            <p className="text-sm text-muted-foreground">
              {row.subjects.join(", ")}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Classes</h3>
            <p className="text-sm text-muted-foreground">
              {row.classes.join(", ")}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-sm text-muted-foreground break-all">{value}</p>
    </div>
  );
}
