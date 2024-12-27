"use server";
import { getServerUser } from "@/actions/auth";
import ParentForm from "@/components/dashboard/forms/users/parent-form";
import { Card, CardContent } from "@/components/ui/card";

async function page() {
  const user = await getServerUser();
  return (
    <div className="w-full mx-auto p-6 lg:px-20">
      <Card className="border-t-4 border-blue-600 shadow mt-10">
        <CardContent className="p-6">
          <ParentForm
            schoolId={user?.schoolId as string}
            schoolLogo={user?.schoolLogo as string}
            schoolName={user?.schoolName as string}
          />
        </CardContent>
      </Card>
    </div>
  );
}
export default page;
