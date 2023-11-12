import { useState } from "react";
import useRegisterRHF from "../hooks/useRegisterRHF";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type InputPhoneNumberProps = {
  id?: string;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  classNameContainer?: string;
  classNameInput?: string;
  classNameLabel?: string;
  valuePhoneNumber?: string;
  valueAreaCode?: string;
  onChange?: (value: string) => void;
  ref?: React.LegacyRef<HTMLInputElement>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  showError?: boolean;
  registerPhoneNumber?: UseFormRegisterReturn;
  registerAreaCode?: UseFormRegisterReturn;
};

export default function InputPhoneNumber({
  classNameContainer,
  classNameInput,
  classNameLabel,
  disabled = false,
  id,
  label,
  onBlur,
  onChange,
  onPaste,
  placeholder,
  ref,
  showError = true,
  registerPhoneNumber,
  registerAreaCode,
  type,
  valuePhoneNumber,
  valueAreaCode,
}: InputPhoneNumberProps) {
  const [areaCode, setAreaCode] = useState(false);

  const {
    errorsRHF: errorsRHF_PN,
    onBlurRHF: onBlurRHF_PN,
    onCahngeRHF: onCahngeRHF_PN,
    refRHF: refRHF_PN,
    nameRHF: nameRHF_PN,
  } = useRegisterRHF(registerPhoneNumber);

  const {
    // errorsRHF: errorsRHF_AC,
    // onBlurRHF: onBlurRHF_AC,
    // onCahngeRHF: onCahngeRHF_AC,
    // refRHF: refRHF_AC,
    // nameRHF: nameRHF_AC,
  } = useRegisterRHF(registerAreaCode);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChange?.(e.target.value);
    onCahngeRHF_PN?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.preventDefault();
    onBlur?.(e);
    onBlurRHF_PN?.(e);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    onPaste?.(e);
  };

  return (
    <div className="">
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
      <div className="flex flex-row">
        <button
          id="states-button"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          type="button"
          onClick={() => setAreaCode((prevState) => !prevState)}
        >
          USA
        </button>
        {/* <div
        className={`z-10 ${
          !areaCode && "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="states-button"
        >
          <li>
            <button
              type="button"
              className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              United States
            </button>
          </li>
          <li>
            <button
              type="button"
              className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Germany
            </button>
          </li>
          <li>
            <button
              type="button"
              className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Italy
            </button>
          </li>
          <li>
            <button
              type="button"
              className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              China
            </button>
          </li>
        </ul>
      </div> */}
        <input
          id={id}
          name={nameRHF_PN}
          className={twMerge(
            "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-default",
            errorsRHF_PN[nameRHF_PN] &&
              "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500",
            classNameInput
          )}
          type={type}
          value={valuePhoneNumber}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          onPaste={handlePaste}
          ref={refRHF_PN ?? ref}
          disabled={disabled}
          readOnly={disabled}
        />
      </div>

      {showError && errorsRHF_PN[nameRHF_PN] && (
        <p className="mt-px text-sm text-red-600 dark:text-red-500 font-medium">
          {`${errorsRHF_PN[nameRHF_PN]?.message}`}
        </p>
      )}
    </div>
  );
}
