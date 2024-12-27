import React from "react";

import TableHeader from "@/components/dashboard/Tables/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";
import { columns } from "./columns";
import { getAllParents } from "@/actions/parents";
import { getServerUser } from "@/actions/auth";

export default async function page() {
  const user = await getServerUser();
  const parents = (await getAllParents(user?.schoolId ?? "")) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Parents"
        linkTitle="Add Parent"
        href="/dashboard/users/parents/new"
        data={parents}
        model="parent"
      />
      <div className="py-8">
        <DataTable data={parents} columns={columns} />
      </div>
    </div>
  );
}
