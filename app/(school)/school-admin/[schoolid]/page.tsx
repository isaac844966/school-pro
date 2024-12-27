import SchoolAdminForm from "@/components/dashboard/forms/school/school-admin-form";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";

async function page({
  params,
  searchParams,
}: {
  params: Promise<{ schoolid: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const schoolid = (await params).schoolid;
  const name = (await searchParams).name;
  const schoolLogo = (await searchParams).logo;
  if (!schoolid || !name || !schoolLogo) {
    return notFound();
  }
  return (
    <div className="max-w-3xl mx-auto p-16">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-6">
          <SchoolAdminForm
            schoolName={name as string}
            schoolId={schoolid}
            schoolLogo={schoolLogo as string}
          />
        </CardContent>
      </Card>
    </div>
  );
}
export default page;
