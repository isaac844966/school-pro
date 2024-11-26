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

export type ClassProps = {
  name: string;
};

export default function ClassForm({
  userId,
  initialContent,
  editingId,
}: {
  userId: string;
  initialContent?: string;
  editingId?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassProps>({
    defaultValues: {
      name: initialContent || "",
    },
  });

  const [loading, setLoading] = useState(false);

  async function saveFolder(data: ClassProps) {
    try {
      setLoading(true);
      if (editingId) {
        // await updateFolderById(editingId, data);
        setLoading(false);
        toast.success("Updated Successfully!");
      } else {
        // await createFolder(data);
        setLoading(false);
        toast.success("Successfully Created!");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  return (
    <Dialog>
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
        <form onSubmit={handleSubmit(saveFolder)}>
          <div className="space-y-4">
            <TextInput
              register={register}
              errors={errors}
              label="Class Name"
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
