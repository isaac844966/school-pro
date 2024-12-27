"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, FolderPlus, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Department } from "@/app/types/types";
import { createDepartment } from "@/actions/departments";

export default function DepartmentForm({
  userId,
  initialContent,
  editingId,
  onDepartmentCreated,
  schoolId
}: {
  userId: string;
  initialContent?: string;
  editingId?: string;
  onDepartmentCreated?: (newDepartment: Department) => void;
schoolId:string
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Department>({
    defaultValues: {
      name: initialContent || "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function saveDepartment(data: Department) {
    try {
      setLoading(true);
      if (editingId) {
        // Handle editing logic here (not implemented in this example)
        setLoading(false);
        toast.success("Updated Successfully!");
      } else {
        data.schoolId = schoolId
        const newDepartment = await createDepartment(data);
        setLoading(false);
        toast.success("Successfully Created!");
        reset();
        setIsOpen(false);
        if (onDepartmentCreated) {
          onDepartmentCreated(newDepartment);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Failed to save department. Please try again.");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {editingId ? (
          <Button variant="ghost" size="icon" title="Edit Department">
            <Pencil className="w-4 h-4" />
          </Button>
        ) : (
          <Button variant="outline" size="icon" title="Create Department">
            <FolderPlus className="w-4 h-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingId ? "Edit Department" : "Add New Department"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(saveDepartment)}>
          <div className="space-y-4">
            <TextInput
              register={register}
              errors={errors}
              label="Department Name"
              name="name"
              icon={Check}
            />
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
