"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, DollarSign, BarChart2, User } from "lucide-react";
import Image from "next/image";
import SectionHeader from "./SectionHeader";

export default function TabFeatures() {
  const sections = {
    students: {
      title: "Student Management",
      description:
        "Comprehensive student information system for managing enrollments, profiles, and academic records with ease",
      features: [
        "Digital student profiles with complete academic history",
        "Automated enrollment and registration process",
        "Parent portal access with real-time updates",
        "Student performance tracking and analytics",
        "Digital document management for student records",
        "Custom fields for additional student information",
        "Bulk student data import/export capabilities",
        "Student behavior and disciplinary record tracking",
      ],
    },
    academics: {
      title: "Academic Management",
      description:
        "Streamline curriculum planning, examinations, grading, and report card generation in one unified system",
      features: [
        "Dynamic curriculum and syllabus management",
        "Automated grade calculation and GPA tracking",
        "Custom report card generation",
        "Assignment and homework management",
        "Online examination system with multiple question types",
        "Academic calendar management",
        "Course and class scheduling",
        "Learning resource distribution",
      ],
    },
    finance: {
      title: "Financial Management",
      description:
        "Complete fee management system with online payments, invoicing, and comprehensive financial reporting",
      features: [
        "Online fee payment gateway integration",
        "Automated invoice generation",
        "Payment reminder system",
        "Financial reporting and analytics",
        "Salary and payroll management",
        "Expense tracking and budgeting",
        "Scholarship management",
        "Multiple payment method support",
      ],
    },
    analytics: {
      title: "Analytics & Reports",
      description:
        "Powerful analytics tools for data-driven decisions with customizable reporting and insights",
      features: [
        "Customizable dashboard with key metrics",
        "Performance trend analysis",
        "Attendance and enrollment statistics",
        "Financial insights and projections",
        "Student progress tracking",
        "Staff performance analytics",
        "Custom report generation",
        "Data export in multiple formats",
      ],
    },
  };

  return (
    <>
      <SectionHeader
        heading="All-in-One School Management Platform"
        title="Additional Features"
        description="Streamline your entire school operations with our comprehensive suite of integrated modules designed specifically for modern educational institutions."
      />
      <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="students" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Students</span>
            </TabsTrigger>
            <TabsTrigger value="academics" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden md:inline">Academics</span>
            </TabsTrigger>
            <TabsTrigger value="finance" className="gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden md:inline">Finance</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart2 className="h-4 w-4" />
              <span className="hidden md:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>
          {Object.entries(sections).map(([key, section]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                          {section.title}
                        </h2>
                        <p className="text-muted-foreground mt-2">
                          {section.description}
                        </p>
                      </div>
                      <div className="grid gap-2">
                        {section.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 text-sm"
                          >
                            <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                              {index + 1}
                            </div>
                            {feature}
                          </div>
                        ))}
                      </div>
                      <Button className="w-full sm:w-auto">
                        Learn more about {section.title}
                      </Button>
                    </div>
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                      <Image
                        src="/images/placeholder.webp"
                        alt="Feature preview"
                        className="w-full h-full object-cover"
                        width={800}
                        height={800}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
}
