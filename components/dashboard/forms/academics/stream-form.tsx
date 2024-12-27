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
import { StreamCreateProps, Stream } from "@/app/types/types";
import { createStream } from "@/actions/classes";

export default function StreamForm({
  classId,
  initialContent,
  editingId,
  onStreamCreated,
  schoolId,
}: {
  classId: string;
  initialContent?: string;
  editingId?: string;
  onStreamCreated?: (newStream: Stream) => void;
  schoolId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StreamCreateProps>({
    defaultValues: {
      title: initialContent || "",
      classId: classId,
    },
  });

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function saveStream(data: StreamCreateProps) {
    try {
      setLoading(true);
      if (editingId) {
        // const updatedStream = await updateStream(editingId, data);
        setLoading(false);
        toast.success("Updated Successfully!");
        if (onStreamCreated) {
          // onStreamCreated(updatedStream);
        }
      } else {
        data.schoolId = schoolId;
        const newStream = await createStream({
          ...data,
          classId: classId, // Explicitly pass classId
        });
        setLoading(false);
        toast.success("Successfully Created!");
        reset();
        setIsOpen(false);
        if (onStreamCreated) {
          onStreamCreated(newStream);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Failed to save stream. Please try again.");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
