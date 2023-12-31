import { twMerge } from "tailwind-merge";
import useRegisterRHF from "../hooks/useRegisterRHF";
import { UseFormRegisterReturn } from "react-hook-form";

type InputFieldProps = {
  id?: string;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  classNameContainer?: string;
  classNameInput?: string;
  classNameLabel?: string;
  value?: string;
  onChange?: (value: string) => void;
  ref?: React.LegacyRef<HTMLInputElement>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  showError?: boolean;
  register?: UseFormRegisterReturn;
};

export default function InputField({
  id,
  placeholder,
  type,
  label,
  value,
  classNameContainer,
  classNameInput,
  classNameLabel,
  onChange,
  onBlur,
  onPaste,
  ref,
  disabled = false,
  showError = true,
  register,
}: InputFieldProps) {
  const { errorsRHF, onBlurRHF, onCahngeRHF, refRHF, nameRHF } =
    useRegisterRHF(register);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChange?.(e.target.value);
    onCahngeRHF?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.preventDefault();
    onBlur?.(e);
    onBlurRHF?.(e);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    onPaste?.(e);
  };

  return (
    <div className={classNameContainer}>
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
      <input
        id={id}
        name={nameRHF}
        className={twMerge(
          "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-default",
          errorsRHF[nameRHF] &&
            "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500",
          classNameInput
        )}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        onPaste={handlePaste}
        ref={refRHF ?? ref}
        disabled={disabled}
        readOnly={disabled}
      />
      {showError && errorsRHF[nameRHF] && (
        <p className="mt-px text-sm text-red-600 dark:text-red-500 font-medium">
          {`${errorsRHF[nameRHF]?.message}`}
        </p>
      )}
    </div>
  );
}
