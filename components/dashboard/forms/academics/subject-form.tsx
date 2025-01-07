"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, BookOpen, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import {
  Subject,
  CreateSubjectData,
  SubjectCategory,
  SubjectType,
} from "@/app/types/types";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import { DepartmentOptions } from "../../subject-management";
import { createSubject } from "@/actions/subjects";

export default function SubjectForm({
  initialContent,
  editingId,
  departments,
  schoolId,
}: {
  initialContent?: Partial<Subject>;
  editingId?: string;
  departments: DepartmentOptions[];
  schoolId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateSubjectData>({
    defaultValues: {
      name: initialContent?.name || "",
      code: initialContent?.code || "",
      shortName: initialContent?.shortName || "",
      category: initialContent?.category || SubjectCategory.CORE,
      type: initialContent?.type || SubjectType.THEORY,
    },
  });

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);

  const categories = [
    { value: SubjectCategory.CORE, label: "Core" },
    { value: SubjectCategory.ADDITIONAL, label: "Additional" },
    { value: SubjectCategory.ELECTIVE, label: "Elective" },
    { value: SubjectCategory.VOCATIONAL, label: "Vocational" },
    { value: SubjectCategory.LANGUAGE, label: "Language" },
    { value: SubjectCategory.EXTRA_CURRICULAR, label: "Extra Curricular" },
  ];

  const types = [
    { value: SubjectType.THEORY, label: "Theory" },
    { value: SubjectType.PRACTICAL, label: "Practical" },
    { value: SubjectType.BOTH, label: "Both Theory and Practical" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedType, setSelectedType] = useState(types[0]);

  async function saveSubject(data: CreateSubjectData) {
    data.departmentId = selectedDepartment.value;
    data.departmentName = selectedDepartment.label;
    data.category = selectedCategory.value as SubjectCategory;
    data.type = selectedType.value as SubjectType;
    data.schoolId = schoolId;
    try {
      setLoading(true);
      if (editingId) {
        // Handle editing logic here (not implemented in this example)
        setLoading(false);
        toast.success("Updated Successfully!");
      } else {
        const newSubject = await createSubject(data);
        setLoading(false);
        if (newSubject) {
          toast.success("Successfully Created!");
          reset();
          setIsOpen(false);

          return newSubject;
        } else {
          toast.error("Failed to create subject. Please try again.");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Failed to save subject. Please try again.");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {editingId ? (
          <Button variant="ghost" size="icon" title="Edit Subject">
            <Pencil className="w-4 h-4" />
          </Button>
        ) : (
          <Button variant="outline" size="icon" title="Create Subject">
            <BookOpen className="w-4 h-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingId ? "Edit Subject" : "Add New Subject"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(saveSubject)}>
          <div className="space-y-4">
            <TextInput
              register={register}
              errors={errors}
              label="Subject Name"
              name="name"
              icon={Check}
            />
            <div className="grid md:grid-cols-2 gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Subject Code"
                name="code"
                icon={Check}
              />
              <TextInput
                register={register}
                errors={errors}
                label="Short Name"
                name="shortName"
                placeholder="Math"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <FormSelectInput
                label="Category"
                options={categories}
                option={selectedCategory}
                setOption={setSelectedCategory}
              />
              <FormSelectInput
                label="Types"
                options={types}
                option={selectedType}
                setOption={setSelectedType}
              />
            </div>
            <div className="grid">
              <FormSelectInput
                label="Department"
                options={departments}
                option={selectedDepartment}
                setOption={setSelectedDepartment}
              />
            </div>
            <SubmitButton
              title={editingId ? "Update" : "Add"}
              loading={loading}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
