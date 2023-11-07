import { twMerge } from "tailwind-merge";
import useRegisterRHF from "../hooks/useRegisterRHF";

type InputFieldProps = {
  id: string;
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
  disabled?: boolean;
  register?: boolean;
  showError?: boolean;
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
  ref,
  disabled = false,
  register = false,
  showError = true,
}: InputFieldProps) {
  const { errorsRHF, onBlurRHF, onCahngeRHF, refRHF } = useRegisterRHF({
    id,
    ref,
    register,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    onCahngeRHF?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onBlur?.(e);
    onBlurRHF?.(e);
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
        type={type}
        id={id}
        className={twMerge(
          "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-default",
          errorsRHF[id] &&
            "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500",
          classNameInput
        )}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        name={id}
        ref={refRHF}
        disabled={disabled}
        readOnly={disabled}
      />
      {showError && errorsRHF[id] && (
        <p className="mt-px text-sm text-red-600 dark:text-red-500 font-medium">
          {`${errorsRHF[id]?.message}`}
        </p>
      )}
    </div>
  );
}
