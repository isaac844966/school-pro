import {  getServerUser } from "@/actions/auth";
import { getAllClasses } from "@/actions/classes";
import ClassListing from "@/components/dashboard/class-listing";

export default async function page() {

  const user = await getServerUser();
  const classes = (await getAllClasses(user?.schoolId ?? "")) || [];

  return (
    <div>
      <ClassListing classes={classes} schoolId={user?.schoolId as string} />
    </div>
  );
}
