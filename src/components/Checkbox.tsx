import { twMerge } from "tailwind-merge";
import useRegisterRHF from "../hooks/useRegisterRHF";
import { UseFormRegisterReturn } from "react-hook-form";

type CheckboxProps = {
  id?: string;
  label?: string;
  classNameContainer?: string;
  classNameInput?: string;
  classNameLabel?: string;
  onChange?: React.Dispatch<React.SetStateAction<boolean>>;
  ref?: React.LegacyRef<HTMLInputElement>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  disabled?: boolean;
  showError?: boolean;
  register?: UseFormRegisterReturn;
  defaultChecked?: boolean;
  children?: React.ReactNode;
};

export default function Checkbox({
  classNameContainer,
  classNameInput,
  classNameLabel,
  disabled = false,
  id,
  label,
  onBlur,
  onChange,
  ref,
  register,
  showError = true,
  defaultChecked = false,
  children,
}: CheckboxProps) {
  const { errorsRHF, onBlurRHF, onCahngeRHF, refRHF, nameRHF } =
    useRegisterRHF(register);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
    onCahngeRHF?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onBlur?.(e);
    onBlurRHF?.(e);
  };

  return (
    <div className={classNameContainer}>
      <div className={twMerge("flex items-center")}>
        <input
          id={id}
          name={nameRHF}
          type="checkbox"
          className={twMerge(
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
            disabled && "bg-gray-100",
            classNameInput
          )}
          value=""
          onChange={handleChange}
          onBlur={handleBlur}
          ref={refRHF ?? ref}
          disabled={disabled}
          readOnly={disabled}
          defaultChecked={defaultChecked}
        />
        <label
          htmlFor={id}
          className={twMerge(
            "ml-2 text-sm font-medium text-gray-900 dark:text-gray-300",
            disabled && "text-gray-400 dark:text-gray-500",
            classNameLabel
          )}
        >
          {label}
          {children}
        </label>
      </div>
      {showError && errorsRHF[nameRHF] && (
        <p className="mt-px text-sm text-red-600 dark:text-red-500 font-medium">
          {`${errorsRHF[nameRHF]?.message}`}
        </p>
      )}
    </div>
  );
}
