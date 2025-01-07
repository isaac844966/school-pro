import { StudentCard } from "./StudentCard";
export interface BriefStudent {
  id: string;
  fullName: string;
  regNo: string;
  classTitle: string;
  streamTitle: string;
  dob: string;
  imageUrl: string;
}
export default function StudentList({
  students,
}: {
  students: BriefStudent[];
}) {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Your Children</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {students.map((student) => {
          return <StudentCard key={student.id} {...student} />;
        })}
      </div>
    </div>
  );
}
