import StudentDetailsPage from "@/components/portal/students/student-details-page";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const studentId = (await params).id;
  return <StudentDetailsPage />;
}
