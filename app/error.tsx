"use client";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500">
          <AlertTriangle className="h-8 w-8 text-white" />
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          500 - Server Error
        </h1>
        <p className="mb-8 text-muted-foreground">
          Oops! Something went wrong on our end. We&apos;re working to fix the
          issue.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button asChild className="bg-[#4263EB] hover:bg-[#4263EB]/90">
            <Link href="/">
              <span className="flex items-center justify-center gap-2">
                Go to Homepage
              </span>
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="border-gray-200 hover:bg-gray-50"
          >
            Try Again
          </Button>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          © 2024 SchoolPro. All rights reserved.
        </p>
      </div>
    </main>
  );
}
