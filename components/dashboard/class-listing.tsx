"use client";

import { useState } from "react";
import {
  PlusCircle,
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ClassForm from "./forms/academics/class-foms";
import StreamForm from "./forms/academics/stream-form";

interface Section {
  id: string;
  name: string;
  teacher: string;
  students: number;
}

interface Class {
  id: string;
  name: string;
  sections: Section[];
  totalStudents: number;
}

// Mock data
const classes: Class[] = [
  {
    id: "class-53",
    name: "Class 53",
    sections: [],
    totalStudents: 120,
  },
  {
    id: "class-62",
    name: "Class 62",
    sections: [],
    totalStudents: 80,
  },
  {
    id: "class-74",
    name: "Class 74",
    sections: [],
    totalStudents: 160,
  },
  {
    id: "class-83",
    name: "Class 83",
    sections: [],
    totalStudents: 115,
  },
  {
    id: "class-92",
    name: "Class 92",
    sections: [],
    totalStudents: 75,
  },
];

const selectedClass: Class = {
  id: "class-5",
  name: "Class 5",
  sections: [
    {
      id: "5A",
      name: "5A",
      teacher: "Ms. Sarah",
      students: 40,
    },
    {
      id: "5B",
      name: "5B",
      teacher: "Mr. John",
      students: 38,
    },
    {
      id: "5C",
      name: "5C",
      teacher: "Ms. Emily",
      students: 42,
    },
  ],
  totalStudents: 120,
};

export default function ClassManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const Sidebar = () => (
    <div className="w-full h-full bg-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Classes</h2>
        <ClassForm userId="user123" />
      </div>
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search classes..."
          className="w-full"
          icon={<Search className="h-4 w-4" />}
        />
      </div>
      <div className="space-y-2">
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <ClassForm
                userId="user123"
                initialContent={classItem.name}
                editingId={classItem.id}
              />
              <div>
                <div className="font-medium">{classItem.name}</div>
                <div className="text-sm text-gray-500">
                  {classItem.sections.length} sections
                </div>
                <div className="text-sm text-gray-500">
                  {classItem.totalStudents} students
                </div>
              </div>
            </div>
            <Button size="icon" variant="ghost">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block w-64 border-r bg-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button size="icon" variant="ghost" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <Sidebar />
                </SheetContent>
              </Sheet>
              <Button
                size="icon"
                variant="ghost"
                className="hidden md:inline-flex"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{selectedClass.name}</h1>
                <div className="text-sm text-gray-500">
                  Classes / {selectedClass.name}
                </div>
              </div>
            </div>

            <StreamForm userId="user123" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedClass.sections.map((section) => (
            <Card key={section.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{section.name}</h3>
                  <div className="flex space-x-1">
                    <StreamForm
                      userId="user123"
                      initialContent={section.name}
                      editingId={section.id}
                    />
                    <Button size="icon" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Class Teacher: {section.teacher}
                </div>
                <div className="text-sm text-gray-500">
                  {section.students} students
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
