"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "@/components/FormInputs/TextInput";
import ImageInput from "@/components/FormInputs/ImageInput";

import { Send } from "lucide-react";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { createSchool } from "@/actions/schools";
import toast from "react-hot-toast";
import { SchoolProps } from "@/app/types/types";

// export type SelectOptionProps = {
//   label: string;
//   value: string;
// };

export default function SchoolOnboardingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchoolProps>({
    defaultValues: {
      name: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = "/images/logo.webp";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveSchool(data: SchoolProps) {
    try {
      setLoading(true);
      data.logo = imageUrl;
      const { id, name, logo } = await createSchool(data);
      toast.success(`Succesfully Created! ${name} school`);
      reset();
      router.push(`/school-admin/${id}?name=${name}&logo=${logo}`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Failed to create school!");
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveSchool)}>
      <div className="text-center">
        <h2 className="scroll-m-20  pb-2 tsxt-2xl font-semibold tracking-tight lg:text-3xl">
          Welcome to School Base,
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Complete your school's profile to get started with SchoolBase.
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
                endpoint="schoolLogo"
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
