"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreatePeriodForm from "@/components/dashboard/forms/academics/period-form";
import { GroupedPeriods, Period } from "@/app/types/types";

export default function PeriodsPage({
  schoolId,
  terms,
}: {
  schoolId: string;
  terms: GroupedPeriods;
}) {
  // // Convert years to numbers and sort them in descending order
  const sortedYears = Object.keys(terms)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Academic Periods</CardTitle>
          <CreatePeriodForm schoolId={schoolId} />
        </CardHeader>
        <CardContent>
          {sortedYears.map((year) => (
            <div key={year} className="mb-8">
              <h3 className="text-xl font-semibold mb-4">{year}</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Term</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {terms[year]
                    .sort((a, b) => a.term - b.term)
                    .map((period) => (
                      <TableRow key={period.id}>
                        <TableCell>Term {period.term}</TableCell>
                        <TableCell>
                          {new Date(period.startDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(period.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              period.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {period.isActive ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
