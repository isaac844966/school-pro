"use client";

import { useState, useCallback } from "react";
import {
  PlusCircle,
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  Menu,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import StreamForm from "./forms/academics/stream-form";
import {
  Class,
  Stream,
  StreamCreateProps,
  StreamWithCount,
} from "@/app/types/types";
import ClassForm from "./forms/academics/class-foms";
import { getAllClasses } from "@/actions/classes";

export default function ClassManagement({
  classes: initialClasses,
  schoolId,
}: {
  classes: Class[];
  schoolId: string;
}) {
  const [classes, setClasses] = useState<Class[]>(initialClasses);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const refreshClasses = useCallback(async () => {
    const updatedClasses = await getAllClasses(schoolId);
    setClasses(updatedClasses);
    if (selectedClass) {
      const updatedSelectedClass = updatedClasses.find(
        (c) => c.id === selectedClass.id
      );
      setSelectedClass(updatedSelectedClass || null);
    }
  }, [selectedClass]);

  const handleClassCreated = (newClass: Class) => {
    setClasses((prevClasses) => [...prevClasses, newClass]);
    setSelectedClass(newClass);
  };

  const handleStreamCreated = (newStream: Stream) => {
    setClasses((prevClasses) =>
      prevClasses.map((c) =>
        c.id === selectedClass?.id
          ? {
              ...c,
              streams: [...(c.streams || []), newStream as StreamWithCount],
            }
          : c
      )
    );

    setSelectedClass((prevClass) =>
      prevClass
        ? {
            ...prevClass,
            streams: [
              ...(prevClass.streams || []),
              newStream as StreamWithCount,
            ],
          }
        : null
    );
  };

  const handleClassSelect = (classItem: Class) => {
    setSelectedClass(classItem);
    setIsSidebarOpen(false);
  };

  const filteredClasses = classes.filter((classItem) =>
    classItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const Sidebar = () => (
    <div className="w-full h-full bg-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Classes</h2>
        <ClassForm
          schoolId={schoolId}
          userId="user123"
          onClassCreated={handleClassCreated}
        />
      </div>
      <div className="mb-4 relative">
        <Input
          type="search"
          placeholder="Search classes..."
          className="w-full pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="space-y-2">
        {filteredClasses.map((classItem) => (
          <div
            key={classItem.id}
            className={`flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer ${
              selectedClass?.id === classItem.id ? "bg-gray-100" : ""
            }`}
            onClick={() => handleClassSelect(classItem)}
          >
            <div>
              <div className="flex gap-4 items-center">
                <div className="font-medium">{classItem.title}</div>
                <div className="text-sm text-gray-500">
                  {classItem.streams?.length || 0} sections,{" "}
                </div>
              </div>

              <div className="text-sm text-gray-500 flex items-center -ml-1 mt-1">
                <User className="w-4 h-4" /> {classItem._count?.students || 0}{" "}
                students
              </div>
            </div>
            <div className="flex items-center ">
              <ClassForm
                schoolId={schoolId}
                userId="user123"
                initialContent={classItem.title}
                editingId={classItem.id}
                onClassCreated={refreshClasses}
              />
              <Button size="icon" variant="ghost">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <div className="hidden md:block w-64 border-r bg-white">
        <Sidebar />
      </div>
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        {selectedClass ? (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                    <SheetTrigger asChild>
                      <Button size="icon" variant="ghost" className="md:hidden">
                        <Menu className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="left"
                      className="w-[300px] sm:w-[400px]"
                    >
                      <Sidebar />
                    </SheetContent>
                  </Sheet>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hidden md:inline-flex"
                    onClick={() => setSelectedClass(null)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold">
                      {selectedClass.title}
                    </h1>
                    <div className="text-sm text-gray-500">
                      Classes / {selectedClass.title}
                    </div>
                  </div>
                </div>
                <StreamForm
                  classId={selectedClass.id}
                  onStreamCreated={handleStreamCreated}
                  schoolId={schoolId}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedClass.streams
                ?.filter((stream) => stream?.classId === selectedClass.id)
                .map((stream) => (
                  <Card key={stream?.id || "unknown"}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">
                          {stream?.title || "Untitled Stream"}
                        </h3>
                        <div className="flex ">
                          <StreamForm
                            schoolId={schoolId}
                            classId={selectedClass.id}
                            initialContent={stream?.title}
                            editingId={stream?.id}
                            onStreamCreated={handleStreamCreated}
                          />
                          <Button size="icon" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-2 mb-2">
                        <User className="w-4 h-4" />{" "}
                        {stream?._count?.students || 0} students
                      </div>
                      <div className="text-sm text-gray-500">
                        Updated:{" "}
                        {stream?.updatedAt
                          ? new Date(stream.updatedAt).toLocaleDateString()
                          : "Unknown"}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 mt-8">
            Select a Class to see the details
          </p>
        )}
      </div>
    </div>
  );
}
