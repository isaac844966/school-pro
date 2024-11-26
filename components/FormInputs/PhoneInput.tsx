"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Select from "react-tailwindcss-select";
import { CircleHelp } from "lucide-react";

const countries = [
  {
    value: "NG",
    label: "Nigeria",
    phoneCode: "+234",
    currencyCode: "NGN",
    countryCode: "NG",
    flag: "🇳🇬",
  },
  {
    value: "AF",
    label: "Afghanistan",
    phoneCode: "+93",
    currencyCode: "AFN",
    countryCode: "AF",
    flag: "🇦🇫",
  },
  {
    value: "AL",
    label: "Albania",
    phoneCode: "+355",
    currencyCode: "ALL",
    countryCode: "AL",
    flag: "🇦🇱",
  },
  {
    value: "DZ",
    label: "Algeria",
    phoneCode: "+213",
    currencyCode: "DZD",
    countryCode: "DZ",
    flag: "🇩🇿",
  },
  {
    value: "AS",
    label: "American Samoa",
    phoneCode: "+1-684",
    currencyCode: "USD",
    countryCode: "AS",
    flag: "🇦🇸",
  },
  {
    value: "AD",
    label: "Andorra",
    phoneCode: "+376",
    currencyCode: "EUR",
    countryCode: "AD",
    flag: "🇦🇩",
  },
  {
    value: "AO",
    label: "Angola",
    phoneCode: "+244",
    currencyCode: "AOA",
    countryCode: "AO",
    flag: "🇦🇴",
  },
  {
    value: "AI",
    label: "Anguilla",
    phoneCode: "+1-264",
    currencyCode: "XCD",
    countryCode: "AI",
    flag: "🇦🇮",
  },
  {
    value: "AR",
    label: "Argentina",
    phoneCode: "+54",
    currencyCode: "ARS",
    countryCode: "AR",
    flag: "🇦🇷",
  },
  {
    value: "AM",
    label: "Armenia",
    phoneCode: "+374",
    currencyCode: "AMD",
    countryCode: "AM",
    flag: "🇦🇲",
  },
  {
    value: "AU",
    label: "Australia",
    phoneCode: "+61",
    currencyCode: "AUD",
    countryCode: "AU",
    flag: "🇦🇺",
  },
  {
    value: "AT",
    label: "Austria",
    phoneCode: "+43",
    currencyCode: "EUR",
    countryCode: "AT",
    flag: "🇦🇹",
  },
  {
    value: "AZ",
    label: "Azerbaijan",
    phoneCode: "+994",
    currencyCode: "AZN",
    countryCode: "AZ",
    flag: "🇦🇿",
  },
  {
    value: "BS",
    label: "Bahamas",
    phoneCode: "+1-242",
    currencyCode: "BSD",
    countryCode: "BS",
    flag: "🇧🇸",
  },
  {
    value: "BH",
    label: "Bahrain",
    phoneCode: "+973",
    currencyCode: "BHD",
    countryCode: "BH",
    flag: "🇧🇭",
  },
  {
    value: "BD",
    label: "Bangladesh",
    phoneCode: "+880",
    currencyCode: "BDT",
    countryCode: "BD",
    flag: "🇧🇩",
  },
  {
    value: "BB",
    label: "Barbados",
    phoneCode: "+1-246",
    currencyCode: "BBD",
    countryCode: "BB",
    flag: "🇧🇧",
  },
  {
    value: "BY",
    label: "Belarus",
    phoneCode: "+375",
    currencyCode: "BYN",
    countryCode: "BY",
    flag: "🇧🇾",
  },
  {
    value: "BE",
    label: "Belgium",
    phoneCode: "+32",
    currencyCode: "EUR",
    countryCode: "BE",
    flag: "🇧🇪",
  },
  {
    value: "BZ",
    label: "Belize",
    phoneCode: "+501",
    currencyCode: "BZD",
    countryCode: "BZ",
    flag: "🇧🇿",
  },
  {
    value: "BJ",
    label: "Benin",
    phoneCode: "+229",
    currencyCode: "XOF",
    countryCode: "BJ",
    flag: "🇧🇯",
  },
  {
    value: "BM",
    label: "Bermuda",
    phoneCode: "+1-441",
    currencyCode: "BMD",
    countryCode: "BM",
    flag: "🇧🇲",
  },
  {
    value: "BT",
    label: "Bhutan",
    phoneCode: "+975",
    currencyCode: "BTN",
    countryCode: "BT",
    flag: "🇧🇹",
  },
  {
    value: "BO",
    label: "Bolivia",
    phoneCode: "+591",
    currencyCode: "BOB",
    countryCode: "BO",
    flag: "🇧🇴",
  },
  {
    value: "BA",
    label: "Bosnia and Herzegovina",
    phoneCode: "+387",
    currencyCode: "BAM",
    countryCode: "BA",
    flag: "🇧🇦",
  },
  {
    value: "BW",
    label: "Botswana",
    phoneCode: "+267",
    currencyCode: "BWP",
    countryCode: "BW",
    flag: "🇧🇼",
  },
  {
    value: "BR",
    label: "Brazil",
    phoneCode: "+55",
    currencyCode: "BRL",
    countryCode: "BR",
    flag: "🇧🇷",
  },
  {
    value: "BN",
    label: "Brunei",
    phoneCode: "+673",
    currencyCode: "BND",
    countryCode: "BN",
    flag: "🇧🇳",
  },
  {
    value: "BG",
    label: "Bulgaria",
    phoneCode: "+359",
    currencyCode: "BGN",
    countryCode: "BG",
    flag: "🇧🇬",
  },
  {
    value: "BF",
    label: "Burkina Faso",
    phoneCode: "+226",
    currencyCode: "BFA",
    countryCode: "BF",
    flag: "🇧🇫",
  },
  {
    value: "BI",
    label: "Burundi",
    phoneCode: "+257",
    currencyCode: "BIF",
    countryCode: "BI",
    flag: "🇧🇮",
  },
  {
    value: "KH",
    label: "Cambodia",
    phoneCode: "+855",
    currencyCode: "KHR",
    countryCode: "KH",
    flag: "🇰🇭",
  },
  {
    value: "CM",
    label: "Cameroon",
    phoneCode: "+237",
    currencyCode: "CMR",
    countryCode: "CM",
    flag: "🇨🇲",
  },
  {
    value: "CA",
    label: "Canada",
    phoneCode: "+1",
    currencyCode: "CAD",
    countryCode: "CA",
    flag: "🇨🇦",
  },
  {
    value: "CV",
    label: "Cape Verde",
    phoneCode: "+238",
    currencyCode: "CVE",
    countryCode: "CV",
    flag: "🇨🇻",
  },
  {
    value: "KY",
    label: "Cayman Islands",
    phoneCode: "+1-345",
    currencyCode: "KYD",
    countryCode: "KY",
    flag: "🇰🇾",
  },
  {
    value: "CF",
    label: "Central African Republic",
    phoneCode: "+236",
    currencyCode: "CAF",
    countryCode: "CF",
    flag: "🇨🇫",
  },
  {
    value: "TD",
    label: "Chad",
    phoneCode: "+235",
    currencyCode: "TDC",
    countryCode: "TD",
    flag: "🇹🇩",
  },
  {
    value: "CL",
    label: "Chile",
    phoneCode: "+56",
    currencyCode: "CLP",
    countryCode: "CL",
    flag: "🇨🇱",
  },
  {
    value: "CN",
    label: "China",
    phoneCode: "+86",
    currencyCode: "CNY",
    countryCode: "CN",
    flag: "🇨🇳",
  },
  {
    value: "CO",
    label: "Colombia",
    phoneCode: "+57",
    currencyCode: "COP",
    countryCode: "CO",
    flag: "🇨🇴",
  },
  {
    value: "KM",
    label: "Comoros",
    phoneCode: "+269",
    currencyCode: "COM",
    countryCode: "KM",
    flag: "🇰🇲",
  },
  {
    value: "CG",
    label: "Congo",
    phoneCode: "+242",
    currencyCode: "COG",
    countryCode: "CG",
    flag: "🇨🇬",
  },
  {
    value: "CD",
    label: "Congo (Democratic Republic)",
    phoneCode: "+243",
    currencyCode: "COD",
    countryCode: "CD",
    flag: "🇨🇩",
  },
  {
    value: "CR",
    label: "Costa Rica",
    phoneCode: "+506",
    currencyCode: "CRC",
    countryCode: "CR",
    flag: "🇨🇷",
  },
  {
    value: "CI",
    label: "Ivory Coast",
    phoneCode: "+225",
    currencyCode: "CIV",
    countryCode: "CI",
    flag: "🇨🇮",
  },
  {
    value: "HR",
    label: "Croatia",
    phoneCode: "+385",
    currencyCode: "HRK",
    countryCode: "HR",
    flag: "🇭🇷",
  },
  {
    value: "CU",
    label: "Cuba",
    phoneCode: "+53",
    currencyCode: "CUP",
    countryCode: "CU",
    flag: "🇨🇺",
  },
  {
    value: "CY",
    label: "Cyprus",
    phoneCode: "+357",
    currencyCode: "CYP",
    countryCode: "CY",
    flag: "🇨🇾",
  },
  {
    value: "CZ",
    label: "Czech Republic",
    phoneCode: "+420",
    currencyCode: "CZK",
    countryCode: "CZ",
    flag: "🇨🇿",
  },
  {
    value: "DK",
    label: "Denmark",
    phoneCode: "+45",
    currencyCode: "DKK",
    countryCode: "DK",
    flag: "🇩🇰",
  },
  {
    value: "DJ",
    label: "Djibouti",
    phoneCode: "+253",
    currencyCode: "DJF",
    countryCode: "DJ",
    flag: "🇩🇯",
  },
  {
    value: "DM",
    label: "Dominica",
    phoneCode: "+1-767",
    currencyCode: "DMA",
    countryCode: "DM",
    flag: "🇩🇲",
  },
  {
    value: "DO",
    label: "Dominican Republic",
    phoneCode: "+1-809",
    currencyCode: "DOP",
    countryCode: "DO",
    flag: "🇩🇴",
  },
  {
    value: "EC",
    label: "Ecuador",
    phoneCode: "+593",
    currencyCode: "USD",
    countryCode: "EC",
    flag: "🇪🇨",
  },
  {
    value: "EG",
    label: "Egypt",
    phoneCode: "+20",
    currencyCode: "EGP",
    countryCode: "EG",
    flag: "🇪🇬",
  },
  {
    value: "SV",
    label: "El Salvador",
    phoneCode: "+503",
    currencyCode: "SVC",
    countryCode: "SV",
    flag: "🇸🇻",
  },
  {
    value: "GQ",
    label: "Equatorial Guinea",
    phoneCode: "+240",
    currencyCode: "GNF",
    countryCode: "GQ",
    flag: "🇬🇶",
  },
  {
    value: "ER",
    label: "Eritrea",
    phoneCode: "+291",
    currencyCode: "ERN",
    countryCode: "ER",
    flag: "🇪🇷",
  },
  {
    value: "EE",
    label: "Estonia",
    phoneCode: "+372",
    currencyCode: "EEK",
    countryCode: "EE",
    flag: "🇪🇪",
  },
  {
    value: "SZ",
    label: "Eswatini",
    phoneCode: "+268",
    currencyCode: "SZL",
    countryCode: "SZ",
    flag: "🇸🇿",
  },
  {
    value: "ET",
    label: "Ethiopia",
    phoneCode: "+251",
    currencyCode: "ETB",
    countryCode: "ET",
    flag: "🇪🇹",
  },
  {
    value: "FI",
    label: "Finland",
    phoneCode: "+358",
    currencyCode: "EUR",
    countryCode: "FI",
    flag: "🇫🇮",
  },
  {
    value: "FJ",
    label: "Fiji",
    phoneCode: "+679",
    currencyCode: "FJD",
    countryCode: "FJ",
    flag: "🇫🇯",
  },
  {
    value: "FM",
    label: "Micronesia",
    phoneCode: "+691",
    currencyCode: "USD",
    countryCode: "FM",
    flag: "🇫🇲",
  },
  {
    value: "FO",
    label: "Faroe Islands",
    phoneCode: "+298",
    currencyCode: "DKK",
    countryCode: "FO",
    flag: "🇫🇴",
  },
  {
    value: "FR",
    label: "France",
    phoneCode: "+33",
    currencyCode: "EUR",
    countryCode: "FR",
    flag: "🇫🇷",
  },
  {
    value: "GA",
    label: "Gabon",
    phoneCode: "+241",
    currencyCode: "GAB",
    countryCode: "GA",
    flag: "🇬🇦",
  },
  {
    value: "GM",
    label: "Gambia",
    phoneCode: "+220",
    currencyCode: "GMD",
    countryCode: "GM",
    flag: "🇬🇲",
  },
  {
    value: "GE",
    label: "Georgia",
    phoneCode: "+995",
    currencyCode: "GEL",
    countryCode: "GE",
    flag: "🇬🇪",
  },
  {
    value: "DE",
    label: "Germany",
    phoneCode: "+49",
    currencyCode: "EUR",
    countryCode: "DE",
    flag: "🇩🇪",
  },
  {
    value: "GH",
    label: "Ghana",
    phoneCode: "+233",
    currencyCode: "GHS",
    countryCode: "GH",
    flag: "🇬🇭",
  },
  {
    value: "GR",
    label: "Greece",
    phoneCode: "+30",
    currencyCode: "GRD",
    countryCode: "GR",
    flag: "🇬🇷",
  },
  {
    value: "GD",
    label: "Grenada",
    phoneCode: "+1-473",
    currencyCode: "XCD",
    countryCode: "GD",
    flag: "🇬🇩",
  },
  {
    value: "GT",
    label: "Guatemala",
    phoneCode: "+502",
    currencyCode: "GTQ",
    countryCode: "GT",
    flag: "🇬🇹",
  },
  {
    value: "GN",
    label: "Guinea",
    phoneCode: "+224",
    currencyCode: "GNF",
    countryCode: "GN",
    flag: "🇬🇳",
  },
  {
    value: "GW",
    label: "Guinea-Bissau",
    phoneCode: "+245",
    currencyCode: "GNB",
    countryCode: "GW",
    flag: "🇬🇼",
  },
  {
    value: "GY",
    label: "Guyana",
    phoneCode: "+592",
    currencyCode: "GYD",
    countryCode: "GY",
    flag: "🇬🇾",
  },
  {
    value: "HT",
    label: "Haiti",
    phoneCode: "+509",
    currencyCode: "HTG",
    countryCode: "HT",
    flag: "🇭🇹",
  },
  {
    value: "HN",
    label: "Honduras",
    phoneCode: "+504",
    currencyCode: "HNL",
    countryCode: "HN",
    flag: "🇭🇳",
  },
  {
    value: "HK",
    label: "Hong Kong",
    phoneCode: "+852",
    currencyCode: "HKD",
    countryCode: "HK",
    flag: "🇭🇰",
  },
  {
    value: "HU",
    label: "Hungary",
    phoneCode: "+36",
    currencyCode: "HUF",
    countryCode: "HU",
    flag: "🇭🇺",
  },
  {
    value: "IS",
    label: "Iceland",
    phoneCode: "+354",
    currencyCode: "ISK",
    countryCode: "IS",
    flag: "🇮🇸",
  },
  {
    value: "IN",
    label: "India",
    phoneCode: "+91",
    currencyCode: "INR",
    countryCode: "IN",
    flag: "🇮🇳",
  },
  {
    value: "ID",
    label: "Indonesia",
    phoneCode: "+62",
    currencyCode: "IDR",
    countryCode: "ID",
    flag: "🇮🇩",
  },
  {
    value: "IR",
    label: "Iran",
    phoneCode: "+98",
    currencyCode: "IRR",
    countryCode: "IR",
    flag: "🇮🇷",
  },
  {
    value: "IQ",
    label: "Iraq",
    phoneCode: "+964",
    currencyCode: "IQD",
    countryCode: "IQ",
    flag: "🇮🇶",
  },
  {
    value: "IE",
    label: "Ireland",
    phoneCode: "+353",
    currencyCode: "EUR",
    countryCode: "IE",
    flag: "🇮🇪",
  },
  {
    value: "IL",
    label: "Israel",
    phoneCode: "+972",
    currencyCode: "ILS",
    countryCode: "IL",
    flag: "🇮🇱",
  },
  {
    value: "IT",
    label: "Italy",
    phoneCode: "+39",
    currencyCode: "EUR",
    countryCode: "IT",
    flag: "🇮🇹",
  },
];

type TextInputProps = {
  register: any;
  errors: any;
  label: string;
  type?: string;
  name: string;
  toolTipText?: string;
  unit?: string;
  placeholder?: string;
  icon?: any;
  setPhoneCode: any;
};

export default function PhoneInput({
  register,
  errors,
  label,
  type = "text",
  name,
  toolTipText,
  unit,
  icon,
  placeholder,
  setPhoneCode,
}: TextInputProps) {
  const initialCountryCode = "NG";
  const initialCountry = countries.find(
    (item) => item.countryCode === initialCountryCode
  );
  const [selectedCountry, setSelectedCountry] = useState<any>(initialCountry);
  const [phoneNumber, setPhoneNumber] = useState("");
  const Icon = icon;
  const handleCountryChange = (country: any) => {
    setSelectedCountry(country.phoneCode);
    setPhoneCode(country);
    console.log(country);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanValue = value.replace(/\D/g, "");
    setPhoneNumber(cleanValue);
    const fullNumber = `${selectedCountry.phoneCode}${cleanValue}`;
    register(name).onChange({
      target: {
        name,
        value: fullNumber,
      },
    });
  };

  return (
    <div>
      <div className="flex items-center">
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        {toolTipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <CircleHelp className="w-4 h-4 text-slate-500" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{toolTipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="mt-2 flex items-center border border-gray-300 rounded-md shadow-sm">
        <div className="w-36">
          <Select
            value={selectedCountry}
            onChange={handleCountryChange}
            options={countries}
            formatOptionLabel={(option: any) => (
              <div className="flex items-center gap-2">
                <span>{option.flag}</span>
                <span>{option.phoneCode}</span>
              </div>
            )}
            classNames={{
              menuButton: () =>
                "flex text-sm text-gray-900 px-2 h-full border-none focus:outline-none",
              menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm",
              listItem: (value?: { isSelected?: boolean }) =>
                `block px-2 py-1 cursor-pointer ${
                  value?.isSelected
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`,
            }}
            isSearchable={true}
            primaryColor="blue"
          />
        </div>
        <div className="relative rounded-md flex-1 ">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Icon className="text-slate-300 w-4 h-4" />
            </div>
          )}
          <input
            id={name}
            type={type}
            {...register(`${name}`, { required: true })}
            className={cn(
              "block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-sm",
              (errors[`${name}`] && "focus:ring-red-500 pl-8") ||
                (icon && "pl-8")
            )}
            placeholder={placeholder || label}
          />
          {unit && (
            <p className="bg-white py-2 px-3 rounded-tr-md rounded-br-md absolute inset-y-0 right-1 my-[2px] flex items-center">
              {unit}
            </p>
          )}
        </div>
      </div>

      {errors[name] && (
        <span className="text-xs text-red-600">{label} is required</span>
      )}
    </div>
  );
}
