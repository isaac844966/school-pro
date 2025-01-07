import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { BriefStudent } from "./StudentList";
function calculateAge(dateString: string): number {
  const birthDate = new Date(dateString);
  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthDate.getFullYear();

  const currentMonth = currentDate.getMonth();
  const birthMonth = birthDate.getMonth();
  if (
    birthMonth > currentMonth ||
    (birthMonth === currentMonth && birthDate.getDate() > currentDate.getDate())
  ) {
    age--;
  }
  return age;
}

export function StudentCard({
  id,

  fullName,
  regNo,
  classTitle: studentClass,
  streamTitle,
  dob,
  imageUrl,
}: BriefStudent) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Image
            src={imageUrl}
            alt={fullName}
            height={64}
            width={64}
            className="rounded-full"
          />
          <div>
            <CardTitle className="text-lg">{fullName}</CardTitle>
            <p className="text-sm text-muted-foreground">{regNo}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-8 items-center">
          <p>
            <span className="font-semibold">Class:</span>
            {studentClass}
          </p>
          <p>
            <span className="font-semibold">Stream:</span>
            {streamTitle}
          </p>
        </div>

        <p>
          <span className="font-semibold">Age:</span>
          {calculateAge(dob)}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="full" asChild>
          <Link href={`/portal/parent/student/${id}`}>view details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
