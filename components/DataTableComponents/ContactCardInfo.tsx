"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContactProps } from "@/app/types/types";
import {
  Calendar,
  Globe,
  Mail,
  MapPin,
  Phone,
  School,
  Users,
} from "lucide-react";

interface ContactCardInfoProps {
  row: ContactProps;
}

export default function ContactCardInfo({ row }: ContactCardInfoProps) {
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
            {row.fullName?.substring(0, 2).toUpperCase()}
          </div>
          <DialogTitle className="text-xl">{row.fullName}</DialogTitle>
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
              <School className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium">School</p>
            <p className="text-sm text-muted-foreground">{row.school}</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium">Country</p>
            <p className="text-sm text-muted-foreground">{row.country}</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium">School Page</p>
            <a
              href={`https://${row.school}.edu`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Visit Website
            </a>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium">Students</p>
            <p className="text-sm text-muted-foreground">272</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <School className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium">Role</p>
            <p className="text-sm text-muted-foreground">Principal</p>
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
