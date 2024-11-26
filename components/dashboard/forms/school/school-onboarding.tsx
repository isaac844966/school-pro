"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

// import { generateSlug } from "@/lib/generateSlug";
// import toast from "react-hot-toast";
// import { Category } from "@prisma/client";
// import { CategoryProps } from "@/types/types";

// import TextInput from "../FormInputs/TextInput";
// import TextArea from "../FormInputs/TextAreaInput";
// import ImageInput from "../FormInputs/ImageInput";
import TextInput from "@/components/FormInputs/TextInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import FormFooter from "../students/FormFooter";
import { Send } from "lucide-react";
import SubmitButton from "@/components/FormInputs/SubmitButton";

// import { createCategory, updateCategoryById } from "@/actions/categories";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type SingleStudentFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
};

export type StudentProps = {
  name: string;
  email: string;
  password: string;
  imageUrl: string;
};
export default function SchoolOnboardingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentProps>({
    defaultValues: {
      name: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = "/images/logo.webp";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveStudent(data: StudentProps) {
    try {
      setLoading(true);
      data.imageUrl = imageUrl;
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveStudent)}>
      <div className="text-center">
        <h2 className="scroll-m-20  pb-2 tsxt-2xl font-semibold tracking-tight lg:text-3xl">
          Welcome to School Base,
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Complete your school's profile to get started with SchoolPro.
        </p>
      </div>
      <div className="grid grid-cols-12 gap-6 py-2">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="School Name"
                name="name"
              />
            </div>
            <div className="grid">
              <ImageInput
                title="Customise your School Logo"
                className="object-contain"
                endpoint="schollLogo"
                setImageUrl={setImageUrl}
                imageUrl={imageUrl}
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
      <SubmitButton
        buttonIcon={Send}
        title="Register School"
        loading={loading}
        loadingTitle="Creating Please wait.."
      />
    </form>
  );
}
