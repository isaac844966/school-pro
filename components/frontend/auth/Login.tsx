"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

// import CustomCarousel from "../CustomCarousel";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import Logo from "@/components/Logo";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import { Lock, LogIn, Mail } from "lucide-react";
import { loginUser } from "@/actions/auth";
import { useUserSession } from "@/store/auth";
import { School, User } from "@/app/types/types";
import { getSchoolById } from "@/actions/schools";
import { useSchoolStore } from "@/store/schools";
import toast from "react-hot-toast";

export type LoginInputProps = {
  email: string;
  password: string;
};
export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<LoginInputProps>();
  const { setUser } = useUserSession();
  const router = useRouter();
  const { setSchool } = useSchoolStore();

  async function onSubmit(data: LoginInputProps) {
    try {
      setIsLoading(true);
      console.log(data);
      const sessionData = await loginUser(data);
      const role = sessionData?.user.role;
      const school = await getSchoolById(sessionData?.user.schoolId);

      await setSchool(school as School);
      setUser(sessionData?.user as User);

      if (role === "SUPER_ADMIN") {
        router.push("/school-onboarding");
      } else {
        router.push("/dashboard");
      }
      toast.success("Logged in Successfully");
      setIsLoading(false);
    } catch (error) {
      toast.success("Failed to Login");
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 relative ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6 mt-10 md:mt-0">
          <div className="absolute left-1/3 top-5 md:left-5">
            <Logo />
          </div>
          <div className="grid gap-2 text-center mt-14 md:mt-0">
            <h1 className="text-3xl font-bold">Login to your Account</h1>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Email Address"
              register={register}
              name="email"
              type="email"
              errors={errors}
              placeholder="johndoe@gmail.com"
              icon={Mail}
            />

            <PasswordInput
              label="Password"
              register={register}
              name="password"
              type="password"
              errors={errors}
              placeholder="******"
              icon={Lock}
              forgotPasswordLink="/forgot-password"
            />

            <SubmitButton
              buttonIcon={LogIn}
              title="Sign In"
              loading={isLoading}
              loadingTitle="Signing In please wait..."
            />
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {/* <CustomCarousel /> */}
      </div>
    </div>
  );
}
