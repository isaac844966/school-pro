"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { ParentProps } from "@/app/types/types";
import ParentCardInfo from "@/components/dashboard/models/parent-info-card";

export const columns: ColumnDef<ParentProps>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.original.imageUrl
      return (
        <div className="flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={`${row.original.firstName} ${row.original.lastName}`}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    id: "name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableColumn column={column} title="Email" />,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <SortableColumn column={column} title="Phone" />,
  },
  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => <ParentCardInfo row={row.original} />,
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
