"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ParentProps } from "@/app/types/types";
import {
  Briefcase,
  Calendar,
  Flag,
  Globe,
  Mail,
  MapPin,
  Phone,
  User,
  Users,
} from "lucide-react";

interface ParentCardInfoProps {
  row: ParentProps;
}

export default function ParentCardInfo({ row }: ParentCardInfoProps) {
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
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground break-all">
              {row.email}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium">Phone</p>
            <p className="text-sm text-muted-foreground">{row.phone}</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium">Relationship</p>
            <p className="text-sm text-muted-foreground">{row.relationship}</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium">Address</p>
            <p className="text-sm text-muted-foreground">{row.address}</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Flag className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium">Nationality</p>
            <p className="text-sm text-muted-foreground">{row.nationality}</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium">WhatsApp</p>
            <p className="text-sm text-muted-foreground">{row.whatsappNo}</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium">Occupation</p>
            <p className="text-sm text-muted-foreground">{row.occupation}</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium">NIN</p>
            <p className="text-sm text-muted-foreground">{row.NIN}</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium">Date of Birth</p>
            <p className="text-sm text-muted-foreground">
              {new Date(row.dob).toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium">Contact Method</p>
            <p className="text-sm text-muted-foreground">{row.contactMethod}</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium">Joined</p>
            <p className="text-sm text-muted-foreground">
              {new Date(row.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
