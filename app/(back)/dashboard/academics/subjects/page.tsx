import { getAllDepartmentsLIst } from "@/actions/departments";
import { getAllSubjects } from "@/actions/subjects";
import SubjectManagement from "@/components/dashboard/subject-management";

export default async function page() {
  const departments = (await getAllDepartmentsLIst()) || [];
  const subjects = (await getAllSubjects()) || [];
  return (
    <div>
      <SubjectManagement
        subjects={subjects}
        departments={departments.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
      />
    </div>
  );
}
