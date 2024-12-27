import { getServerUser } from "@/actions/auth";
import { getAllDepartmentsLIst } from "@/actions/departments";
import { getAllSubjects } from "@/actions/subjects";
import SubjectManagement from "@/components/dashboard/subject-management";

export default async function page() {
  const user = await getServerUser();
  const departments = (await getAllDepartmentsLIst(user?.schoolId ?? "")) || [];
  const subjects = (await getAllSubjects(user?.schoolId ?? "")) || [];
  return (
    <div>
      <SubjectManagement
        subjects={subjects}
        departments={departments.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
        schoolId ={user?.schoolId??""}
      />
    </div>
  );
}
