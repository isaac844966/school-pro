"use client";
import AddNewButton from "@/components/FormInputs/AddNewButton";
import { useState } from "react";

import Select from "react-tailwindcss-select";
import { Option, Options } from "react-tailwindcss-select/dist/components/type";
type MultipleFormSelectInputProps = {
  options: Options;
  label: string;
  option: Option;
  setOption: any;
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
}: MultipleFormSelectInputProps) {
  // const [results, setResults] = useState([])
  function handleChange(item: any) {
    setOption(item)
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
          isMultiple
        />
        {href && toolTipText && (
          <AddNewButton toolTipText={toolTipText} href={href} />
        )}
      </div>
    </div>
  );
}
