import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <Button asChild>
        <Link href="/dashboard/users/parents/new">New Parents</Link>
      </Button>
    </div>
  );
}
