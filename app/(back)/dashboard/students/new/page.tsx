import { getServerUser } from "@/actions/auth";
import { getAllClasses } from "@/actions/classes";
import { getAllParents } from "@/actions/parents";
import { getStudentNextSequence } from "@/actions/students";
import BulkStudentForm from "@/components/dashboard/forms/students/bulk-student-form";
import SingleStudentForm from "@/components/dashboard/forms/students/student-forms";
import InfoBanner from "@/components/info-banner";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Users } from "lucide-react";

async function page() {
  const user = await getServerUser();
  const classes = (await getAllClasses(user?.schoolId ?? "")) || [];
  const parents = (await getAllParents(user?.schoolId ?? "")) || [];
  const nextSequence =
    (await getStudentNextSequence(user?.schoolId ?? "")) || 0;
  return (
    <div className="w-full mx-auto p-6 lg:px-20">
      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="single"
            className="flex items-center justify-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground "
          >
            <UserPlus className="w-4 h-4" />
            <span>Single Student Admission</span>
          </TabsTrigger>
          <TabsTrigger
            value="bulk"
            className="flex items-center justify-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground "
          >
            <Users className="w-4 h-4" />
            <span>Bulk Student Admission</span>
          </TabsTrigger>
        </TabsList>
        <Card className="border-t-4 border-blue-600 shadow mt-10">
          <CardContent className="p-6">
            <TabsContent value="single" className="mt-6">
              <InfoBanner
                message="Please Make sure you have Already Created the Parent,Class and Stream for the Student"
                type="warning"
              />
              <SingleStudentForm
                schoolId={user?.schoolId as string}
                schoolName={user?.schoolName as string}
                schoolLogo={user?.schoolLogo as string}
                classes={classes}
                parents={parents}
                nextSeq={nextSequence}
              />
            </TabsContent>
            <TabsContent value="bulk" className="mt-6">
              <BulkStudentForm />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
export default page;
