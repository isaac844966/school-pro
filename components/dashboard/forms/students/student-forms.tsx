"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormHeader from "./FormHeader";

import FormFooter from "./FormFooter";
import TextInput from "@/components/FormInputs/TextInput";
import TextArea from "@/components/FormInputs/TextAreaInput";
import ImageInput from "@/components/FormInputs/ImageInput";

import PasswordInput from "@/components/FormInputs/PasswordInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";

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
export default function SingleStudentForm({
  editingId,
  initialData,
}: SingleStudentFormProps) {
  const parents = [
    {
      label: "John Doe",
      value: "234455",
    },
    {
      label: "Allen Smith",
      value: "2347755",
    },
  ];
  const classes = [
    {
      label: "SS1",
      value: "234455",
    },
    {
      label: "SS2",
      value: "2347755",
    },
  ];
  const religion = [
    {
      label: "Christain",
      value: "Christain",
    },
    {
      label: "Muslim",
      value: "Muslim",
    },
  ];
  const genders = [
    {
      label: "MALE",
      value: "MALE",
    },
    {
      label: "FEMALE",
      value: "FEMALE",
    },
  ];
  const streams = [
    {
      label: "SS1A",
      value: "234455",
    },
    {
      label: "SS1B",
      value: "234455",
    },
    {
      label: "SS2A",
      value: "2347755",
    },
    {
      label: "SS2B",
      value: "2347755",
    },
  ];
  const [selectedParent, setSelectedParent] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedStream, setSelectedStream] = useState<any>(null);
  const [selectedGender, setSelectedGender] = useState<any>(null);
  const [selectedReligion, setSelectedReligion] = useState<any>(null);
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
  const initialImage = initialData?.imageUrl || "/images/student.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveStudent(data: StudentProps) {
    try {
      setLoading(true);
      data.imageUrl = imageUrl;
      console.log(data);

      if (editingId) {
        // await updateCategoryById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
        // reset();
        // router.push("/dashboard/categories");
        // setImageUrl("/placeholder.svg");
      } else {
        // await createCategory(data);
        // setLoading(false);
        // toast.success("Successfully Created!");
        // reset();
        // setImageUrl("/placeholder.svg");
        // router.push("/dashboard/categories");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveStudent)}>
      <FormHeader
        href="/students"
        parent=""
        title="Student"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Student First Name"
                name="firstName"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Student Last Name"
                name="lastName"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Email"
                name="email"
                type="email"
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Parent"
                options={parents}
                option={selectedParent}
                setOption={setSelectedParent}
                toolTipText="Add New Parent"
                href="/dashboard/users/parents/new"
              />
              <FormSelectInput
                label="Class"
                options={classes}
                option={selectedClass}
                setOption={setSelectedClass}
                toolTipText="Add New Class"
                href="/dashboard/academics/classes"
              />
              <FormSelectInput
                label="Stream/Section"
                options={streams}
                option={selectedStream}
                setOption={setSelectedStream}
                toolTipText="Add New Stream/Section"
                href="/dashboard/academics/classes"
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Phone"
                name="phone"
                type="tel"
              />
              <TextInput
                label="Nationality"
                register={register}
                name="country"
                errors={errors}
                placeholder="Nigeria"
              />
              <PasswordInput
                register={register}
                errors={errors}
                label="Student Password"
                name="password"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput
                label="State"
                register={register}
                name="state"
                errors={errors}
                placeholder="State"
              />
              <TextInput
                label="Birth Certificate No."
                register={register}
                name="BCN"
                errors={errors}
                placeholder="Birth Certificate Number"
              />
              <FormSelectInput
                label="Religion"
                options={religion}
                option={selectedReligion}
                setOption={setSelectedReligion}
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Gender"
                options={genders}
                option={selectedGender}
                setOption={setSelectedGender}
                isSearchable={false}
              />
              <TextInput
                register={register}
                errors={errors}
                label="Date of Birth"
                name="dob"
                type="date"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Roll No."
                name="rollNo"
              />
            </div>
            <div className="grid md:grid-cols-2  gap-3">
              <div className="">
                <div className="grid gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Admission Number."
                    name="regNo"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Admission Date."
                    name="admissionDate"
                  />
                </div>
                <div className="grid gap-3">
                  <TextArea
                    register={register}
                    errors={errors}
                    label="Address"
                    name="address"
                  />
                </div>
              </div>

              <div className="grid">
                <ImageInput
                  title="Student Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="studentProfileImage"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormFooter
        href="/students"
        editingId={editingId}
        loading={loading}
        title="Student"
        parent=""
      />
    </form>
  );
}
