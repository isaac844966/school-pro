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
import { PeriodCreateProps } from "@/app/types/types";
import { createDepartment } from "@/actions/departments";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { createPeriod } from "@/actions/periods";
import { convertDateToIso, convertToValidDateFormat } from "@/lib/utils";

export default function CreatePeriodForm({
  editingId,
  schoolId,
}: {
  editingId?: string;
  schoolId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PeriodCreateProps>({
    defaultValues: {
      year: new Date().getFullYear(),
      term: 1,
    },
  });

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [isActive, setIsActive] = useState<boolean>(true);
  async function savePeriod(data: PeriodCreateProps) {
    try {
      setLoading(true);
      if (editingId) {
        // Handle editing logic here (not implemented )
        setLoading(false);
        toast.success("Updated Successfully!");
      } else {
        data.schoolId = schoolId;
        data.year = Number(data.year);
        data.term = Number(data.term);
        data.startDate = convertDateToIso(data.startDate);
        data.endDate = convertDateToIso(data.endDate);
        data.isActive = isActive;
        console.log(data);

        const newPeriod = await createPeriod(data);
        setLoading(false);
        toast.success("Successfully Created!");
        reset();
        setIsOpen(false);
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
          <Button variant="outline" size="icon" title="Add New Period">
            <FolderPlus className="w-4 h-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingId ? "Edit Period" : "Create New Period"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(savePeriod)}>
          <div className="space-y-4">
            <div className="grid grid-3 lg:grid-cols-2">
              <TextInput
                register={register}
                errors={errors}
                label="Year"
                name="year"
                type="number"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Term"
                name="term"
                type="number"
                min={1}
                max={3}
              />
            </div>
            <div className="grid grid-3 lg:grid-cols-2">
              <TextInput
                register={register}
                errors={errors}
                label="Start Date"
                name="startDate"
                type="date"
              />
              <TextInput
                register={register}
                errors={errors}
                label="End Date"
                name="endDate"
                type="date"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="isActive">Set as active period</Label>
            </div>
            <div className="space-y-3">
              <SubmitButton
                title={editingId ? "Update Period" : "Add Period"}
                loading={loading}
                className="w-full"
              />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
