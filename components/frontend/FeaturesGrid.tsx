import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SectionHeader from "./SectionHeader";

export default function FeaturesGrid() {
  const features = [
    {
      title: "Student Information System",
      description:
        "Streamline your school administration with our comprehensive suite of integrated modules designed specifically for student data management.",
      imageUrl: "/images/placeholder.webp",
    },
    {
      title: "Academic Excellence Suite",
      description:
        "Enhance learning outcomes with powerful tools for curriculum planning, assessment tracking, and performance analytics.",
      imageUrl: "/images/placeholder.webp",
    },
    {
      title: "Smart Communication Hub",
      description:
        "Foster seamless collaboration between teachers, students, and parents through our integrated communication platform.",
      imageUrl: "/images/placeholder.webp",
    },
    {
      title: "Financial Management Center",
      description:
        "Efficiently manage school finances, from fee collection to expense tracking, all in one centralized system.",
      imageUrl: "/images/placeholder.webp",
    },
    {
      title: "Staff & HR Management",
      description:
        "Streamline staff administration, attendance tracking, and professional development planning.",
      imageUrl: "/images/placeholder.webp",
    },
    {
      title: "Transport & Safety Control",
      description:
        "Ensure student safety with real-time transport tracking and comprehensive safety management tools.",
      imageUrl: "/images/placeholder.webp",
    },
    {
      title: "Resource & Facility Manager",
      description:
        "Optimize resource allocation and maintain facilities efficiently with our integrated management system.",
      imageUrl: "/images/placeholder.webp",
    },
  ];

  return (
    <section className="w-full flex items-center py-12">
      <div className="container px-4 max-w-6xl md:px-6 mx-auto">
        <SectionHeader
          title="Features"
          heading="All-in-One School Management Platform"
          description="Streamline your entire school operations with our comprehensive suite of integrated modules designed specifically for modern educational institutions."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`border-2 hover:border-primary/50 transition-colors ${
                index === 2 ? "md:row-span-2 md:flex md:flex-col" : ""
              }`}
            >
              <CardHeader>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent
                className={`space-y-4 ${
                  index === 2 ? "md:flex-grow md:flex md:flex-col" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden rounded-lg ${
                    index === 2 ? "md:flex-grow" : "aspect-video"
                  }`}
                >
                  <Image
                    src={feature.imageUrl}
                    alt={`Illustration for ${feature.title}`}
                    className="w-full  transition-opacity duration-300 hover:opacity-80"
                    height={800}
                    width={300}
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
