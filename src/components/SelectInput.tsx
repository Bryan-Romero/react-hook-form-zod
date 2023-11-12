import { twMerge } from "tailwind-merge";
import useRegisterRHF from "../hooks/useRegisterRHF";
import { UseFormRegisterReturn } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type SelectInputProps = {
  id?: string;
  label?: string;
  placeholder?: string;
  options?: string[];
  classNameContainer?: string;
  classNameInput?: string;
  classNameLabel?: string;
  value?: string;
  onChange?: (value: string) => void;
  ref?: React.LegacyRef<HTMLSelectElement>;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement, Element>) => void;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  showError?: boolean;
};

export default function SelectInput({
  id,
  classNameContainer,
  classNameInput,
  classNameLabel,
  label,
  onBlur,
  onChange,
  options,
  placeholder,
  ref,
  value,
  disabled = false,
  showError = true,
  register,
}: SelectInputProps) {
  const [open, setOpen] = useState(false);
  const { errorsRHF, onBlurRHF, onCahngeRHF, refRHF, nameRHF } =
    useRegisterRHF(register);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    onChange?.(e.target.value);
    onCahngeRHF?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement, Element>) => {
    e.preventDefault();
    onBlur?.(e);
    onBlurRHF?.(e);
  };

  return (
    <div className={twMerge("relative", classNameContainer)}>
      {label && (
        <label
          htmlFor={id}
          className={twMerge(
            "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
            classNameLabel
          )}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={id}
          name={nameRHF}
          className={twMerge(
            "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-default appearance-none relative",
            errorsRHF[nameRHF] &&
              "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500",
            classNameInput
          )}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          onClick={() => setOpen(!open)}
          ref={refRHF ?? ref}
          disabled={disabled}
        >
          <option value="">{placeholder}</option>
          {options?.map((option) => (
            <option
              value={option}
              key={option}
            >
              {option}
            </option>
          ))}
        </select>

        <FontAwesomeIcon
          icon={faChevronDown}
          className={`absolute right-2.5 bottom-1/2 translate-y-1/2 text-gray-900 dark:text-white transition-transform duration-75 ${
            !open && "rotate-180"
          }`}
          size="lg"
        />
      </div>

      {showError && errorsRHF[nameRHF] && (
        <p className="mt-px text-sm text-red-600 dark:text-red-500 font-medium">
          {`${errorsRHF[nameRHF]?.message}`}
        </p>
      )}
    </div>
  );
}
