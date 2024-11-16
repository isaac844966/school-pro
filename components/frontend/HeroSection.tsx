import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SmallTitle from "./SmallTitle";

export default function HeroSection() {
  return (
    <section className="w-full   min-h-[80vh]  pt-24 md:py-24 lg:py-32 xl:py-48 ">
      <div className="px-4 md:px-6  ">
        <div className="flex flex-col items-center space-y-4 text-center">
          <SmallTitle
            icon={<Sparkles className="mr-2 h-4 w-4" />}
            text="Welcome to SchoolBase"
          />
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
            Your Complete School
            <br />
            Management Solution
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            From admissions to academics, simplify every aspect of school
            administration with our comprehensive and user-friendly platform.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-6 ">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link
              href="#features"
              className="inline-flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white px-6 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            >
              See All features
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
