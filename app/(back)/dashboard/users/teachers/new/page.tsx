import { getServerUser } from "@/actions/auth";
import { getAllClassList } from "@/actions/classes";
import {
  getAllDepartments,
  getAllDepartmentsLIst,
} from "@/actions/departments";
import { getAllSubjectsList } from "@/actions/subjects";
import TeacherForm from "@/components/dashboard/forms/users/teacher-form";
import { Card, CardContent } from "@/components/ui/card";

async function page() {
  const user = await getServerUser();
  const departmentsData =
    (await getAllDepartmentsLIst(user?.schoolId ?? "")) || [];
  const classesData = (await getAllClassList(user?.schoolId ?? "")) || [];
  const subjectsData = (await getAllSubjectsList(user?.schoolId ?? "")) || [];

  const departments = departmentsData.map((d) => ({
    value: d.id,
    label: d.name,
  }));

  const classes = classesData.map((c) => ({
    value: c.id,
    label: c.title,
  }));

  const subjects = subjectsData.map((s) => ({
    value: s.id,
    label: s.name,
  }));

  return (
    <div className="w-full mx-auto p-6 lg:px-20">
      <Card className="border-t-4 border-blue-600 shadow mt-10">
        <CardContent className="p-6">
          <TeacherForm
            classes={classes}
            departments={departments}
            subjects={subjects}
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
