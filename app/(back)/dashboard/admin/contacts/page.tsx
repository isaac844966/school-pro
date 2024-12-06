import React from "react";
import { columns } from "./columns";

import { getAllContacts } from "@/actions/admin";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";

export default async function page() {
  const contacts = (await getAllContacts()) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Contacts"
        linkTitle="Add Contacts"
        href="/contact-us"
        data={contacts}
        model="contact"
      />
      <div className="py-8">
        <DataTable data={contacts} columns={columns} />
      </div>
    </div>
  );
}
