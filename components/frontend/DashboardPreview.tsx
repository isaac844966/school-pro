import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";

import Image from "next/image";

export function DashboardPreveiw() {
  return (
    <div className="bg-white py-24 ">
      <div className="mx-auto max-w-7xl">
        <Card className="w-full ">
          <CardContent className="mt-4">
            <Image
              src="/images/dashboard.webp"
              alt="Dashboard Preview"
              width={2016}
              height={1210}
              className="w-full rounded-xl"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
