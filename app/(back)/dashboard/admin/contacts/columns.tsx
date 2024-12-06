"use client";

import Image from "next/image";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { ContactProps } from "@/app/types/types";
import ContactCardInfo from "@/components/DataTableComponents/ContactCardInfo";
export const columns: ColumnDef<ContactProps>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableColumn column={column} title="email" />,
  },
  {
    accessorKey: "school",
    header: ({ column }) => <SortableColumn column={column} title="school" />,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <SortableColumn column={column} title="phone" />,
  },
  {
    accessorKey: "country",
    header: ({ column }) => <SortableColumn column={column} title="country" />,
  },

  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => <ContactCardInfo row={row.original} />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const contact = row.original;
      return (
        <ActionColumn
          row={row}
          model="contact"
          editEndpoint={`#`}
          id={contact.id}
        />
      );
    },
  },
];
