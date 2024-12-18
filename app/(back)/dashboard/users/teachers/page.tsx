import React from "react";

import TableHeader from "@/components/dashboard/Tables/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";
import { columns } from "./columns";
import { getAllTeachers } from "@/actions/teachers";

export default async function page() {
  const teachers = (await getAllTeachers()) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Teachers"
        linkTitle="Add Teachers"
        href="/dashboard/users/teachers/new"
        data={teachers}
        model="teachers"
      />
      <div className="py-8">
        <DataTable data={teachers} columns={columns} />
      </div>
    </div>
  );
}
