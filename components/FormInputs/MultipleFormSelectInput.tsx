"use client";
import AddNewButton from "@/components/FormInputs/AddNewButton";
import { Dispatch, SetStateAction } from "react";
import Select from "react-tailwindcss-select";
import { Option, Options } from "react-tailwindcss-select/dist/components/type";

type MultipleFormSelectInputProps = {
  options: Options;
  label: string;
  option: Option[]; // Changed to only accept Option[]
  setOption: Dispatch<SetStateAction<Option[]>>; // Fixed to match useState type
  href?: string;
  labelShown?: boolean;
  toolTipText?: string;
  isSearchable?: boolean;
  isMultiple?: boolean;
};

export default function MultipleFormSelectInput({
  options,
  label,
  option,
  setOption,
  href,
  toolTipText,
  labelShown = true,
  isSearchable = true,
  isMultiple = true,
}: MultipleFormSelectInputProps) {
  function handleChange(value: Option | Option[] | null) {
    if (value) {
      // Handle both single and multiple selections
      const newValue = Array.isArray(value) ? value : [value];
      setOption(newValue);
    }
  }

  return (
    <div className="">
      {labelShown && (
        <h2 className="pb-2 block text-sm font-medium leading-6 text-gray-900">
          Select {label}
        </h2>
      )}
      <div className="flex items-center space-x-2">
        <Select
          isSearchable={isSearchable}
          primaryColor="blue"
          value={option}
          onChange={handleChange}
          options={options}
          placeholder={label}
          isMultiple={isMultiple}
        />
        {href && toolTipText && (
          <AddNewButton toolTipText={toolTipText} href={href} />
        )}
      </div>
    </div>
  );
}
