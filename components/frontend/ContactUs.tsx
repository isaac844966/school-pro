"use client";
import React, { useState } from "react";
import TextInput from "../FormInputs/TextInput";
import { useForm } from "react-hook-form";
import SubmitButton from "../FormInputs/SubmitButton";
import { Send } from "lucide-react";
import TextArea from "../FormInputs/TextAreaInput";
import FormSelectInput from "../FormInputs/FormSelectInput";
export type ContactProps = {
  fullName: string;
  email: string;
  school: string;
  country: string;
  schoolPage: string;
  phone: string;
  students: number;
  role: string;
  media: string;
  message: string;
};
const ContactUs: React.FC = () => {
  const media = [
    { label: "Google", value: "google" },
    { label: "Blog", value: "blog" },
    { label: "Friend", value: "friend" },

    { label: "Other", value: "other" },
  ];
  const [isLoading] = useState(false);
  const [seletedRole, setSelectedRole] = useState<any>(null);
  const [seletedMedia, setSelectedMedia] = useState<any>(media[0]);
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<ContactProps>();

  const roles = [
    { label: "Pricipal/Leadership/Mgt", value: "Pricipal" },
    { label: "School Administrator", value: "Administrator" },
    { label: "HeadTeacher", value: "Headteacher" },
    { label: "Teacher/Parent/Student", value: "teacher/parent/student" },
    { label: "Consultant/Reseller", value: "consultant/reseller" },
    { label: "Other", value: "other" },
  ];

  async function onSubmit(data: ContactProps) {
    console.log(data);
  }

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div>
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow">
            <h3 className="text-3xl text-center font-semibold ">
              Tell us about your institution and requirements
            </h3>
            <p className="text-muted-foreground text-sm text-center px-4 py-2 mb-4 max-w-xl mx-auto">
              Our team will reach out within 24 hours to schedulea personalized
              demo and discuss your specific needs.
            </p>
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                label="Your Full Name"
                register={register}
                name="name"
                errors={errors}
                placeholder="John Doe"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <TextInput
                  label="Email Address"
                  register={register}
                  name="email"
                  type="email"
                  errors={errors}
                  placeholder="johndoe@gmail.com"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  type="phone"
                  name="phone"
                  label="Phone Number"
                  toolTipText="Please enter your phone number with country code"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <TextInput
                  label="School Name"
                  register={register}
                  name="school"
                  errors={errors}
                  placeholder="Niffty steps"
                />
                <TextInput
                  label="Country"
                  register={register}
                  name="country"
                  errors={errors}
                  placeholder="Nigeria"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <TextInput
                  label="School Website/Social Media Page(fb,linkedin)"
                  register={register}
                  name="schoolPage"
                  errors={errors}
                  placeholder="https:www.schoolpage.com"
                />
                <TextInput
                  label="Number of Students"
                  register={register}
                  name="students"
                  errors={errors}
                  placeholder="300"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <FormSelectInput
                  label="Your Role"
                  options={roles}
                  option={seletedRole}
                  setOption={setSelectedRole}
                />
                <FormSelectInput
                  label="How did you hear about us"
                  options={media}
                  option={seletedMedia}
                  setOption={setSelectedMedia}
                />
              </div>
              <TextArea
                label="Please share with us the key points you want to solve"
                register={register}
                name="features"
                errors={errors}
              />

              <SubmitButton
                buttonIcon={Send}
                title="Submiit"
                loading={isLoading}
                loadingTitle="Sending please wait..."
              />
            </form>
          </div>
        </div>
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-800 text-white p-6 rounded-2xl">
            <h3 className="font-semibold text-xl mb-2">
              Speak to someone in sales
            </h3>
            <p className="text-sm mb-4 py-4">
              To create a more value-added solution, is essential to an analysis
              of the possibilities of improvement.
            </p>
            <button className="bg-white text-green-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition duration-300">
              Book Appointment
            </button>
          </div>
          <div className="bg-lime-400 p-6 rounded-2xl">
            <h3 className="font-semibold mb-2 text-xl">Contact to our team</h3>
            <p className="text-sm mb-4 py-4">
              To create a more value-added solution, is essential to an analysis
              of the possibilities of improvement.
            </p>
            <button className="bg-green-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition duration-300">
              Send a Mail
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
