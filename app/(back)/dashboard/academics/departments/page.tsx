import { getServerUser } from "@/actions/auth";
import { getAllDepartments } from "@/actions/departments";
import DepartmentManagement from "@/components/dashboard/department-management";

export default async function page() {
  const user = await getServerUser();
  const departments = (await getAllDepartments(user?.schoolId ?? "")) || [];
  return (
    <div>
      <DepartmentManagement
        departments={departments}
        schoolId={user?.schoolId as string}
      />
    </div>
  );
}
