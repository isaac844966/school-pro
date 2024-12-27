"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "@/components/FormInputs/TextInput";
import { Lock, Mail, Phone, Send, User } from "lucide-react";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import toast from "react-hot-toast";
import { UserCreateProps } from "@/app/types/types";
import { createUser } from "@/actions/users";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import Image from "next/image";

export default function SchoolAdminForm({
  schoolId,
  schoolName,
  schoolLogo,
}: {
  schoolId: string;
  schoolName: string;
  schoolLogo: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserCreateProps>({
    defaultValues: {
      name: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function saveUser(data: UserCreateProps) {
    try {
      setLoading(true);
      data.schoolId = schoolId;
      data.schoolName = schoolName;
      data.schoolLogo = schoolLogo;
      data.role = "ADMIN";
      const res = await createUser(data);
      toast.success(` Successfully Created admin for ${schoolName}!`);
      reset();
      router.push("/dashboard");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Failed to create school admin!");
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveUser)}>
      <div className="text-center">
        <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight lg:text-3xl">
          Welcome to {schoolName} Schools
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Create the Admin for this school
        </p>
        <div className="flex justify-center mt-4">
          <Image
            src={schoolLogo}
            alt={schoolName}
            width={150}
            height={150}
            className="object-contain"
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 py-2">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="grid gap-3 ">
              <TextInput
                register={register}
                errors={errors}
                label="Admin Name"
                name="name"
                icon={User}
              />
            </div>
            <div className="grid gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Admin Email"
                name="email"
                icon={Mail}
              />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="grid gap-3 ">
              <TextInput
                register={register}
                errors={errors}
                label="Admin Phone"
                name="phone"
                icon={Phone}
              />
            </div>
            <div className="grid gap-3">
              <PasswordInput
                register={register}
                errors={errors}
                label="Admin Password"
                name="password"
                type="password"
                icon={Lock}
              />
            </div>
          </div>
        </div>
      </div>
      <SubmitButton
        buttonIcon={Send}
        title="Create School Admin"
        loading={loading}
        loadingTitle="Creating Please wait.."
      />
    </form>
  );
}
