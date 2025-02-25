"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import TextInput from "@/components/FormInputs/TextInput";
import TextArea from "@/components/FormInputs/TextAreaInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import toast from "react-hot-toast";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import FormHeader from "../students/FormHeader";
import FormFooter from "../students/FormFooter";
import { ParentProps } from "@/app/types/types";
import { createParent } from "@/actions/parents";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type ParentFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
  schoolId: string;
  schoolLogo: string;
  schoolName: string;
};

export default function ParentForm({
  editingId,
  initialData,
  schoolId,
  schoolLogo,
  schoolName,
}: ParentFormProps) {
  const relationships = [
    {
      label: "Father",
      value: "Father",
    },
    {
      label: "Mother",
      value: "Mother",
    },
    {
      label: "Guardian",
      value: "Guardian",
    },
    {
      label: "Others",
      value: "Others",
    },
  ];
  const titles = [
    {
      label: "Mr",
      value: "Mr",
    },
    {
      label: "Mrs",
      value: "Mrs",
    },
  ];
  const contactMethods = [
    {
      label: "Phone",
      value: "Phone",
    },
    {
      label: "Email",
      value: "Email",
    },
    {
      value: "WhatsApp",
      label: "WhatsApp",
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

  const [selectedRelationship, setSelectedRelationship] = useState<any>(
    relationships[1]
  );
  const [selectedMethod, setSelectedMethod] = useState<any>(
    contactMethods[0] || null
  );
  const [selectedGender, setSelectedGender] = useState<any>(genders[0] || null);
  const [selectedTitle, setSelectedTitle] = useState<any>(titles[0] || null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ParentProps>({
    defaultValues: {
      firstName: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/images/student.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveStudent(data: ParentProps) {
    try {
      setLoading(true);
      data.imageUrl = imageUrl;
      data.title = selectedTitle.value;
      data.gender = selectedGender.value;
      data.relationship = selectedRelationship.value;
      data.contactMethod = selectedMethod.value;
      data.schoolId = schoolId;
      data.schoolLogo = schoolLogo;
      data.schoolName = schoolName;
      console.log(data);
      if (data.dob) {
        const parsedDate = new Date(data.dob);
        if (!isNaN(parsedDate.getTime())) {
          data.dob = parsedDate.toISOString().split("T")[0];
        }
      }
      if (editingId) {
        // await updateCategoryById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
        // reset();
        // router.push("/dashboard/categories");
        // setImageUrl("/placeholder.svg");
      } else {
        const response = await createParent(data);
        setLoading(false);
        toast.success("Successfully Created!");
        reset();
        // setImageUrl("/placeholder.svg");
        router.push("/dashboard/users/parents");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveStudent)}>
      <FormHeader
        href="/parents"
        parent="users"
        title="Parent"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Title"
                options={titles}
                option={selectedTitle}
                setOption={setSelectedTitle}
              />
              <TextInput
                register={register}
                errors={errors}
                label="First Name"
                name="firstName"
              />
              <TextInput
                register={register}
                errors={errors}
                label=" Last Name"
                name="lastName"
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Relationship"
                options={relationships}
                option={selectedRelationship}
                setOption={setSelectedRelationship}
              />
              <TextInput
                register={register}
                errors={errors}
                label="National ID / Passport"
                name="NIN"
              />
              <FormSelectInput
                label="Gender"
                options={genders}
                option={selectedGender}
                setOption={setSelectedGender}
                isSearchable={false}
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                label="Phone"
                name="phone"
                type="phone"
              />
              <TextInput
                label="Nationality"
                register={register}
                name="nationality"
                errors={errors}
                placeholder="Nigeria"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput
                label="Email"
                register={register}
                name="email"
                errors={errors}
                placeholder="Email"
                type="email"
              />
              <TextInput
                label="Whatsapp Number"
                register={register}
                name="whatsappNo"
                errors={errors}
                type="phone"
                placeholder="WhatsApp Number"
              />
              <PasswordInput
                label="Password"
                errors={errors}
                register={register}
                name="password"
                toolTipText="Paassword will be used by parent on the student portal"
              />
            </div>
            <div className="grid md:grid-cols-2  gap-3">
              <div className="">
                <div className="grid gap-3">
                  <FormSelectInput
                    label="Preferred contact Method"
                    options={contactMethods}
                    option={selectedMethod}
                    setOption={setSelectedMethod}
                  />

                  <TextInput
                    register={register}
                    errors={errors}
                    label="Occupation"
                    name="occupation"
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
                  title="Parent Profile Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="parentProfileImage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormFooter
        href="/parents"
        editingId={editingId}
        loading={loading}
        title="Parent"
        parent="users"
      />
    </form>
  );
}
