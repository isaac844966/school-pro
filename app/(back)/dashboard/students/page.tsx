import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <h2>Students</h2>
      <Button asChild>
        <Link href="/dashboard/students/new">New Student</Link>
      </Button>
    </div>
  );
}
