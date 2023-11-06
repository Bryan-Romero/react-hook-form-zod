import { ChangeHandler, FieldErrors, FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { useFormContext } from "react-hook-form";

type InputFieldProps = {
  id: string;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  classNameContainer?: string;
  className?: string;
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
  className,
  onChange,
  onBlur,
  ref,
  disabled,
  register = false,
  showError = true,
}: InputFieldProps) {
  let changeHandler: ChangeHandler | undefined;
  let blurHandler: ChangeHandler | undefined;
  let fieldErrors: FieldErrors<FieldValues> = {};

  if (register) {
    const {
      register,
      formState: { errors },
    } = useFormContext();
    const {
      onChange: changeHandlerCon,
      onBlur: blurHandlerCon,
      ref: refCon,
    } = register(id);

    fieldErrors = errors;
    changeHandler = changeHandlerCon;
    blurHandler = blurHandlerCon;
    ref = refCon;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
    if (changeHandler) changeHandler(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (onBlur) onBlur(e);
    if (blurHandler) blurHandler(e);
  };

  return (
    <div className={classNameContainer}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={twMerge(
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-not-allowed",
          className
        )}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        name={id}
        ref={ref}
        disabled={disabled}
        readOnly={disabled}
      />
      {showError && fieldErrors[id] && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">
          {`${fieldErrors[id]?.message}`}
        </p>
      )}
    </div>
  );
}
