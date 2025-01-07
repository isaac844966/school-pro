import React from "react";

import PortalAnalytics from "@/components/portal/PortalAnalytics";
import { getServerUser } from "@/actions/auth";
import { User } from "@/app/types/types";

export default async function Portal() {
  const user = await getServerUser();
  return <PortalAnalytics user={user as User} />;
}
