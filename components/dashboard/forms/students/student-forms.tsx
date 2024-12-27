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
import { Class, ParentProps, StudentProps } from "@/app/types/types";
import toast from "react-hot-toast";
import { createStudent } from "@/actions/students";
import RadioInput from "@/components/FormInputs/RadioInput";
import { Label } from "recharts";
import { generateRollNo } from "@/lib/generateRollNo";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type SingleStudentFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
  classes: Class[];
  parents: ParentProps[];
  nextSeq: number;
  schoolId: string;
  schoolName: string;
  schoolLogo: string;
};

export default function SingleStudentForm({
  editingId,
  initialData,
  classes,
  parents,
  nextSeq,
  schoolId,
  schoolName,
  schoolLogo,
}: SingleStudentFormProps) {
  const classesOptions = classes.map((parent) => {
    return {
      label: parent.title,
      value: parent.id,
    };
  });
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
  const [selectedParent, setSelectedParent] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedStream, setSelectedStream] = useState<any>(
    classesOptions[0] || null
  );
  const [selectedGender, setSelectedGender] = useState<any>(genders[0] || null);
  const [selectedReligion, setSelectedReligion] = useState<any>(
    religion[0] || null
  );
  const parentsOptions = parents.map((item) => {
    return {
      label: `${item.firstName} ${item.lastName}`,
      value: item.id,
    };
  });
  const studentTypes = [
    {
      label: "Private Student",
      id: "PS",
    },
    {
      label: "Sponsored Student",
      id: "SS",
    },
  ];

  const classId = selectedClass?.value || classesOptions[0]?.value || "";
  const streams = classes.find((item) => item.id === classId)?.streams || [];
  const streamsOptions = streams.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentProps>({
    defaultValues: {
      firstName: "",
      nationality: "Nigeria",
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
      data.parentId = selectedParent?.value || "";
      data.parentName = selectedParent?.label || "";
      data.classId = selectedClass?.value || "";
      data.classTitle = selectedClass?.label || "";
      data.streamId = selectedStream?.value || "";
      data.streamTitle = selectedStream?.label || "";
      data.parentName = selectedParent?.label || "";
      data.gender = selectedGender?.value || "";
      data.religion = selectedReligion?.value || "";
      data.fullName = `${data.firstName} ${data.lastName}`;
      data.schoolId = schoolId;
      data.schoolName = schoolName;
      data.schoolLogo = schoolLogo;
      console.log(data);

      if (editingId) {
        // await updateCategoryById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
        // reset();
        // router.push("/dashboard/categories");
        // setImageUrl("/placeholder.svg");
      } else {
        const studentType = data.studentType as "PS" | "SS";
        const rollNo = generateRollNo("BU", studentType, nextSeq);
        data.rollNo = rollNo;
        const response = await createStudent(data);
        console.log(response);

        setLoading(false);
        toast.success("Student Successfully Created!");
        reset();
        router.push("/dashboard/students");
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
                options={parentsOptions}
                option={selectedParent}
                setOption={setSelectedParent}
                toolTipText="Add New Parent"
                href="/dashboard/users/parents/new"
              />
              <FormSelectInput
                label="Class"
                options={classesOptions}
                option={selectedClass}
                setOption={setSelectedClass}
                toolTipText="Add New Class"
                href="/dashboard/academics/classes"
              />
              <FormSelectInput
                label="Stream/Section"
                options={streamsOptions}
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
                type="phone"
              />
              <TextInput
                label="Nationality"
                register={register}
                name="nationality"
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
              {/* <TextInput
                register={register}
                errors={errors}
                label="Roll No."
                name="rollNo"
              /> */}
              <TextInput
                register={register}
                errors={errors}
                label="Admission Number."
                name="regNo"
              />
            </div>
            <div className="grid md:grid-cols-2  gap-3">
              <div className="">
                <div className="grid gap-3">
                  <RadioInput
                    register={register}
                    label="Student Type"
                    name="studentType"
                    errors={errors}
                    radioOptions={studentTypes}
                    defaultValue={studentTypes[0].id}
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Admission Date."
                    name="admissionDate"
                    type="date"
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
        parent="users"
      />
    </form>
  );
}
