import React from "react";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";
import { getAllStudents } from "@/actions/students";
import { columns } from "./columns";

export default async function StudentsPage() {
  const students = (await getAllStudents()) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Students"
        linkTitle="Add Student"
        href="/dashboard/students/new"
        data={students}
        model="student"
      />
      <div className="py-8">
        <DataTable data={students} columns={columns} />
      </div>
    </div>
  );
}
