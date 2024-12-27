"use client";

import { useState, useCallback } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Subject, SubjectCategory, SubjectType } from "@/app/types/types";
import SubjectForm from "./forms/academics/subject-form";

export type DepartmentOptions = {
  label: string;
  value: string;
};

export default function SubjectManagement({
  departments,
  subjects: initialSubjects,
  schoolId,
}: {
  departments: DepartmentOptions[];
  subjects: Subject[];
  schoolId: string;
}) {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(
    subjects[0] || null
  );
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubjects = subjects.filter((subject) =>
    subject?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsMobileSidebarOpen(false);
  };

  const handleSubjectCreated = useCallback((newSubject: Subject) => {
    setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
    setSelectedSubject(newSubject);
  }, []);

  const Sidebar = () => (
    <div className="w-full h-full bg-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Subjects</h2>
        <SubjectForm
          onSubjectCreated={handleSubjectCreated}
          departments={departments}
          schoolId={schoolId}
        />
      </div>
      <div className="mb-4 relative">
        <Input
          type="search"
          placeholder="Search subjects..."
          className="w-full pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="space-y-2">
        {filteredSubjects.map((subject) => (
          <div
            key={subject.id}
            className={`flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg cursor-pointer ${
              selectedSubject?.id === subject.id ? "bg-gray-100" : ""
            }`}
            onClick={() => handleSubjectSelect(subject)}
          >
            <div>
              <div className="font-medium">{subject?.name}</div>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {subject?.code}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:block transition-all duration-300 ease-in-out ${
          isDesktopSidebarOpen ? "w-80" : "w-0"
        } border-r bg-white overflow-hidden`}
      >
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex"
              onClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
            >
              {isDesktopSidebarOpen ? (
                <ChevronLeft className="h-6 w-6" />
              ) : (
                <ChevronRight className="h-6 w-6" />
              )}
            </Button>
            <h1 className="text-xl font-semibold">Subject Management</h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          {selectedSubject ? (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedSubject?.name}
                    </h2>
                    <div className="text-sm text-gray-500">
                      Subjects / {selectedSubject?.name}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit Subject
                    </Button>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Subject Information</CardTitle>
                    <CardDescription>
                      General information about the subject
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        Subject Code
                      </div>
                      <div className="mt-1">{selectedSubject.code}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        Short Name
                      </div>
                      <div className="mt-1">
                        {selectedSubject?.shortName || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        Category
                      </div>
                      <div className="mt-1">{selectedSubject?.category}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        Type
                      </div>
                      <div className="mt-1">{selectedSubject?.type}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        Department
                      </div>
                      <div className="mt-1">
                        {selectedSubject?.departmentName}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Subject Details</CardTitle>
                    <CardDescription>
                      Detailed information about the subject
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Is Active
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          selectedSubject?.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedSubject?.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Is Optional
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          selectedSubject?.isOptional
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {selectedSubject?.isOptional ? "Optional" : "Mandatory"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Has Theory
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          selectedSubject?.hasTheory
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {selectedSubject?.hasTheory ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Has Practical
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          selectedSubject?.hasPractical
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {selectedSubject?.hasPractical ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Lab Required
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          selectedSubject?.labRequired
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {selectedSubject?.labRequired ? "Yes" : "No"}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Marks Information</CardTitle>
                    <CardDescription>
                      Passing and total marks for the subject
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500">
                          Passing Marks
                        </div>
                        <div className="mt-1 text-2xl font-bold">
                          {selectedSubject?.passingMarks || "N/A"}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">
                          Total Marks
                        </div>
                        <div className="mt-1 text-2xl font-bold">
                          {selectedSubject?.totalMarks || "N/A"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-gray-500">
                Select a subject to view its details
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
