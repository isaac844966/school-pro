"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { StudentProps } from "@/app/types/types";
import StudentCardInfo from "@/components/dashboard/models/student-info-card";

export const columns: ColumnDef<StudentProps>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.original.imageUrl;
      return (
        <div className="flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={`${row.original.firstName} ${row.original.lastName}`}
            width={40}
            height={40}
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
    id: "classAndStream",
    header: ({ column }) => (
      <SortableColumn column={column} title="Class & Stream" />
    ),
    cell: ({ row }) => {
      const classTitle = row.original.classTitle;
      const streamTitle = row.original.streamTitle;
      return (
        <div>
          {classTitle ? (
            <div>{classTitle}</div>
          ) : (
            <div className="text-gray-400">No class assigned</div>
          )}
          {streamTitle ? (
            <div className="text-sm text-gray-600">{streamTitle}</div>
          ) : (
            <div className="text-sm text-gray-400">No stream assigned</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => <StudentCardInfo row={row.original} />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <ActionColumn
          row={row}
          model="student"
          editEndpoint={`#`}
          id={student.id}
        />
      );
    },
  },
];
