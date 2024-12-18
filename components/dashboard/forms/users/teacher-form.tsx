"use client";

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
import TextArea from "@/components/FormInputs/TextAreaInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import toast from "react-hot-toast";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import FormHeader from "../students/FormHeader";
import FormFooter from "../students/FormFooter";
import { ParentProps, TeacherCreateProps } from "@/app/types/types";
import { createParent } from "@/actions/parents";
import { createTeacher } from "@/actions/teachers";
import MultipleFormSelectInput from "@/components/FormInputs/MultipleFormSelectInput";
import { convertToValidDateFormat, generateId } from "@/lib/utils";
// import { createCategory, updateCategoryById } from "@/actions/categories";

// export type SelectOptionProps = {
//   label: string;
//   value: string;
// };
export type DataOption = {
  label: string;
  value: string;
};
type TeacherFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
  classes: DataOption[];
  departments: DataOption[];
  subjects: DataOption[];
};

export default function TeacherForm({
  editingId,
  initialData,
  classes,
  departments,
  subjects,
}: TeacherFormProps) {
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

  const qualifications = [
    {
      label: "Bachelors",
      value: "Bachelors",
    },
    {
      label: "Diploma",
      value: "Diploma",
    },
    {
      label: "Certificate",
      value: "Certificate",
    },
  ];

  const [selectedMethod, setSelectedMethod] = useState<any>(
    contactMethods[0] || null
  );
  const [selectedGender, setSelectedGender] = useState<any>(genders[0] || null);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(
    departments[0]
  );
  const [selectedSubjects, setSelectedSubjects] = useState<any>([subjects[0]]);
  const [selectedClasses, setSelectedClasses] = useState<any>([classes[0]]);
  const [mainSubject, setMainSubject] = useState<any>(subjects[0]);
  const [qualification, setQualification] = useState<any>(qualifications[0]);
  const [selectedTitle, setSelectedTitle] = useState<any>(titles[0] || null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherCreateProps>({
    defaultValues: {
      firstName: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/images/student.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveTeacher(data: TeacherCreateProps) {
    try {
      setLoading(true);
      data.imageUrl = imageUrl;
      data.title = selectedTitle.value;
      data.gender = selectedGender.value;
      data.contactMethod = selectedMethod.value;
      data.experience = Number(data.experience);
      data.departmentId = selectedDepartment.value;
      data.departmentName = selectedDepartment.label;
      data.qualification = qualification.label;
      data.mainSubject = mainSubject.label;
      data.mainSubjectId = mainSubject.value;
      data.subjects = selectedSubjects.map((item: any) => item.label);
      data.classes = selectedClasses.map((item: any) => item.label);
      data.classIds = selectedClasses.map((item: any) => item.value);
      data.employeeId = generateId();
      console.log(data);

      if (editingId) {
        // await updateCategoryById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
        // reset();
        // router.push("/dashboard/categories");
        // setImageUrl("/placeholder.svg");
      } else {
        const response = await createTeacher(data);
        setLoading(false);
        toast.success("Successfully Created!");
        reset();
        router.push("/dashboard/users/teachers");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveTeacher)}>
      <FormHeader
        href="/teachers"
        parent="users"
        title="Teacher"
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
              <TextInput
                register={register}
                errors={errors}
                label="Phone"
                name="phone"
                type="phone"
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Preferred contact Method"
                options={contactMethods}
                option={selectedMethod}
                setOption={setSelectedMethod}
              />
              <TextInput
                label="Nationality"
                register={register}
                name="nationality"
                errors={errors}
                placeholder="Nigeria"
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
                name="dateOfBirth"
                type="date"
              />
              <TextInput
                register={register}
                errors={errors}
                label="National ID / Passport No"
                name="NIN"
              />
              <PasswordInput
                label="Password"
                errors={errors}
                register={register}
                name="password"
                toolTipText="Paassword will be used by teacher on the teachers portal"
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Date of Joining"
                name="dateOfJoining"
                type="date"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Designation"
                name="designation"
                placeholder="Eg. Head Teacher"
              />

              <FormSelectInput
                label="Departments"
                options={departments}
                option={selectedDepartment}
                setOption={setSelectedDepartment}
                isSearchable={false}
                href="/dashboard/academics/darpartments/new"
                toolTipText="Create new Dapartment"
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Qualification"
                options={qualifications}
                option={qualification}
                setOption={setQualification}
                isSearchable={false}
              />
              <MultipleFormSelectInput
                label="Subjects"
                options={subjects}
                option={selectedSubjects}
                setOption={setSelectedSubjects}
                isSearchable={false}
                href="/dashboard/academics/subjects"
                toolTipText="Add new Subject"
              />
              {/* multi select */}
              <FormSelectInput
                label="Main Subject"
                options={subjects}
                option={mainSubject}
                setOption={setMainSubject}
                isSearchable={false}
                href="/dashboard/academics/subjects"
                toolTipText="Add new Subject"
              />
            </div>

            <div className="grid md:grid-cols-2  gap-3">
              <div className="space-y-3">
                {/* multi select */}
                <MultipleFormSelectInput
                  label="Classes"
                  options={classes}
                  option={selectedClasses}
                  setOption={setSelectedClasses}
                  isSearchable={false}
                  href="/dashboard/academics/classes"
                  toolTipText="Add new Class"
                />
                <div className="grid gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Years Of Experience"
                    name="experience"
                    type="number"
                    placeholder="eg. 5"
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
                  title="Teacher Profile Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="teacherProfileImage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormFooter
        href="/teachers"
        editingId={editingId}
        loading={loading}
        title="Teacher"
        parent="users"
      />
    </form>
  );
}
