import { getServerUser } from "@/actions/auth";
import { getStudentByParentId } from "@/actions/parents";
import { getProfileId } from "@/actions/users";
import StudentList from "@/components/portal/StudentList";

export default async function page() {
  const user = await getServerUser();
  if (!user) {
    return;
  }
  const profileId = await getProfileId(user?.id, user?.role);
  console.log(`profileId ${profileId}`);
  const students = (await getStudentByParentId(profileId ?? "")) || [];
  console.log(`studentData ${students}`);
  return (
    <div className="p-8">
      {students && students?.length > 0 ? (
        <StudentList students={students} />
      ) : (
        <div>
          <h2>You don't have a Child yet</h2>
        </div>
      )}
    </div>
  );
}
