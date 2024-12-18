
import { getAllDepartments } from "@/actions/departments";
import DepartmentManagement from "@/components/dashboard/department-management";

export default async function page() {
  const departments = (await getAllDepartments()) || [];
  return (
    <div>
      <DepartmentManagement departments={departments}/>
    </div>
  );
}
