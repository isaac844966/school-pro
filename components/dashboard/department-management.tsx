"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  BookOpen,
  DollarSign,
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
import { Department } from "@/app/types/types";
import { formatDate } from "@/lib/utils";
import DepartmentForm from "./forms/academics/department-form.tsx";

export default function DepartmentManagement({
  departments: initialDepartments,
  schoolId,
}: {
  departments: Department[];
  schoolId: string;
}) {
  const [departments, setDepartments] =
    useState<Department[]>(initialDepartments);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(departments[0]);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDepartmentSelect = (department: Department) => {
    setSelectedDepartment(department);
    setIsMobileSidebarOpen(false);
  };

  const handleDepartmentCreated = (newDepartment: Department) => {
    setDepartments((prevDepartments) => [...prevDepartments, newDepartment]);
    setSelectedDepartment(newDepartment);
  };

  const Sidebar = () => (
    <div className="w-full h-full bg-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Departments</h2>
        <DepartmentForm userId="1233" schoolId={schoolId} />
      </div>
      <div className="mb-4 relative">
        <Input
          type="search"
          placeholder="Search departments..."
          className="w-full pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="space-y-2">
        {filteredDepartments.map((department) => (
          <div
            key={department.id}
            className={`flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg cursor-pointer ${
              selectedDepartment?.id === department.id ? "bg-gray-100" : ""
            }`}
            onClick={() => handleDepartmentSelect(department)}
          >
            <div>
              <div className="font-medium">{department.name}</div>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                {department.teachers.length} teachers
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
            <h1 className="text-xl font-semibold">Department Management</h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          {selectedDepartment ? (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedDepartment.name}
                    </h2>
                    <div className="text-sm text-gray-500">
                      Departments / {selectedDepartment.name}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit Department
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
                    <CardTitle>Department Information</CardTitle>
                    <CardDescription>
                      General information about the department
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        Head of Department
                      </div>
                      <div className="mt-1">
                        {selectedDepartment.hodName || "Not assigned"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        HOD Start Date
                      </div>
                      <div className="mt-1">
                        {selectedDepartment.hodStartDate
                          ? formatDate(selectedDepartment.hodStartDate)
                          : "Not set"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        Department Created
                      </div>
                      <div className="mt-1">
                        {formatDate(selectedDepartment.createdAt)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <div>
                        <span className="font-medium">
                          ${selectedDepartment.budget?.toLocaleString() || "0"}
                        </span>
                        <span className="text-gray-500 ml-1">
                          (
                          {selectedDepartment.budgetYear ||
                            "No budget year set"}
                          )
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Teachers</CardTitle>
                    <CardDescription>
                      Teachers assigned to this department
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedDepartment.teachers.length > 0 ? (
                        selectedDepartment.teachers.map((teacher) => (
                          <div
                            key={teacher.id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <GraduationCap className="w-4 h-4" />
                              </div>
                              <div>{teacher?.firstName}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500">
                          No teachers assigned
                        </div>
                      )}
                      <Button variant="outline" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Teacher
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Subjects</CardTitle>
                    <CardDescription>
                      Subjects taught in this department
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedDepartment.subjects.length > 0 ? (
                        selectedDepartment.subjects.map((subject) => (
                          <div
                            key={subject.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <BookOpen className="w-4 h-4 text-gray-500" />
                              <div>{subject.name}</div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-full text-sm text-gray-500">
                          No subjects added
                        </div>
                      )}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Subject
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-gray-500">
                Select a department to view its details
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
