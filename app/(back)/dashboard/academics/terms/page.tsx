import { getServerUser } from "@/actions/auth";
import { getAllGroupedPeriods } from "@/actions/periods";
import { GroupedPeriods } from "@/app/types/types";
import PeriodsPage from "@/components/portal/academics/period-page";

export default async function page() {
  const user = await getServerUser();
  const terms = (await getAllGroupedPeriods(user?.schoolId ?? "")) || [];
  return (
    <PeriodsPage
      schoolId={user?.schoolId as string}
      terms={terms as GroupedPeriods}
    />
  );
}
