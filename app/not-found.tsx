"use client";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
      <Card className="w-full max-w-md p-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <Terminal className="h-6 w-6 text-red-500" />
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight">
          404 - Page Not Found
        </h1>
        <p className="mb-6 text-muted-foreground">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might
          have been moved or deleted.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/">Go to Homepage</Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="border-gray-200 hover:bg-gray-100"
          >
            Go Back
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} SchoolBase. All rights reserved.
        </p>
      </Card>
    </main>
  );
}
