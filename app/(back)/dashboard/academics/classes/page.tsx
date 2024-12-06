import { getAllClasses } from "@/actions/classes";
import ClassListing from "@/components/dashboard/class-listing";

export default async function page() {
  const classes = (await getAllClasses()) || [];
  return (
    <div>
      <ClassListing classes={classes} />
    </div>
  );
}
