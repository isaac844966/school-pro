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

export type StreamProps = {
  name: string;
};

export default function StreamForm({
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
  } = useForm<StreamProps>({
    defaultValues: {
      name: initialContent || "",
    },
  });

  const [loading, setLoading] = useState(false);

  async function saveStream(data: StreamProps) {
    try {
      setLoading(true);
      if (editingId) {
        // await updateStreamById(editingId, data);
        setLoading(false);
        toast.success("Updated Successfully!");
      } else {
        // await createStream(data);
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
          <Button variant="ghost" size="icon" title="Edit Stream">
            <Pencil className="w-4 h-4" />
          </Button>
        ) : (
          <Button variant="outline" title="Add Section">
            <FolderPlus className="w-4 h-4 mr-2" />
            Add Section
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingId ? "Edit Stream" : "Add New Stream"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(saveStream)}>
          <div className="space-y-4">
            <TextInput
              register={register}
              errors={errors}
              label="Stream Name"
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
