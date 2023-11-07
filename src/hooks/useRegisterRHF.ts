import {
  ChangeHandler,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  useFormContext,
} from "react-hook-form";

export default function useRegisterRHF({
  id,
  register = false,
  ref: refRHF,
}: {
  id: string;
  register?: boolean;
  ref?: React.LegacyRef<HTMLInputElement>;
}) {
  let onCahngeRHF: ChangeHandler | undefined;
  let onBlurRHF: ChangeHandler | undefined;
  let errorsRHF: FieldErrors<FieldValues> = {};
  let registerRHF: UseFormRegister<FieldValues> | {} = {};

  if (register) {
    const {
      register,
      formState: { errors },
    } = useFormContext();
    const { onChange, onBlur, ref } = register(id);

    registerRHF = register;
    errorsRHF = errors;
    onCahngeRHF = onChange;
    onBlurRHF = onBlur;
    refRHF = ref;
  }

  return {
    registerRHF,
    onCahngeRHF,
    onBlurRHF,
    errorsRHF,
    refRHF,
  };
}
