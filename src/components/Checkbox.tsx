import { twMerge } from "tailwind-merge";
import useRegisterRHF from "../hooks/useRegisterRHF";
import { UseFormRegisterReturn } from "react-hook-form";

type CheckboxProps<T> = {
  id?: string;
  label?: string;
  classNameContainer?: string;
  classNameInput?: string;
  classNameLabel?: string;
  value?: string | number;
  onChange?: (value: T) => void;
  ref?: React.LegacyRef<HTMLInputElement>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  disabled?: boolean;
  showError?: boolean;
  register?: UseFormRegisterReturn;
};

export default function Checkbox<T>({
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
  value,
}: CheckboxProps<T>) {
  const { errorsRHF, onBlurRHF, onCahngeRHF, refRHF, nameRHF } =
    useRegisterRHF(register);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (typeof value === "string") {
      onChange?.(newValue as T); // Convierte a tipo 'T'(string) si 'value' es de tipo 'string'
    } else if (typeof value === "number") {
      onChange?.(Number(newValue) as T); // Convierte a tipo 'T'(number) si 'value' es de tipo 'number'
    } else if (!value) {
      onChange?.(e.target.checked as T); // Convierte a tipo 'T'(boolean) si 'value' es undefined
    }

    onCahngeRHF?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onBlur?.(e);
    onBlurRHF?.(e);
  };

  return (
    <div>
      <div className={twMerge("flex items-center", classNameContainer)}>
        <input
          id={id}
          name={nameRHF}
          type="checkbox"
          className={twMerge(
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
            classNameInput
          )}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={refRHF ?? ref}
          disabled={disabled}
          readOnly={disabled}
          value={value}
        />
        {label && (
          <label
            htmlFor={id}
            className={twMerge(
              "ml-2 text-sm font-medium text-gray-900 dark:text-gray-300",
              classNameLabel
            )}
          >
            {label}
          </label>
        )}
      </div>
      {showError && errorsRHF[nameRHF] && (
        <p className="mt-px text-sm text-red-600 dark:text-red-500 font-medium">
          {`${errorsRHF[nameRHF]?.message}`}
        </p>
      )}
    </div>
  );
}
