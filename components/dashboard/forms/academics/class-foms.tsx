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
import { ClassCreateProps, Class } from "@/app/types/types";
import { createClass } from "@/actions/classes";

export default function ClassForm({
  userId,
  initialContent,
  editingId,
  onClassCreated,
}: {
  userId: string;
  initialContent?: string;
  editingId?: string;
  onClassCreated?: (newClass: Class) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClassCreateProps>({
    defaultValues: {
      title: initialContent || "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function saveClass(data: ClassCreateProps) {
    try {
      setLoading(true);
      if (editingId) {
        // const updatedClass = await updateClass(editingId, data);
        setLoading(false);
        toast.success("Updated Successfully!");
        if (onClassCreated) {
          // onClassCreated(updatedClass);
        }
      } else {
        const newClass = await createClass(data);
        setLoading(false);
        toast.success("Successfully Created!");
        reset();
        setIsOpen(false);
        if (onClassCreated) {
          onClassCreated(newClass);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Failed to save class. Please try again.");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {editingId ? (
          <Button variant="ghost" size="icon" title="Edit Class">
            <Pencil className="w-4 h-4" />
          </Button>
        ) : (
          <Button variant="outline" size="icon" title="Create Class">
            <FolderPlus className="w-4 h-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingId ? "Edit Class" : "Add New Class"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(saveClass)}>
          <div className="space-y-4">
            <TextInput
              register={register}
              errors={errors}
              label="Class Name"
              name="title"
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
