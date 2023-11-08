import {
  ChangeHandler,
  FieldErrors,
  FieldValues,
  useFormContext,
  UseFormWatch,
  UseFormRegisterReturn,
  RefCallBack,
} from "react-hook-form";

export default function useRegisterRHF(register?: UseFormRegisterReturn) {
  let onCahngeRHF: ChangeHandler | undefined;
  let onBlurRHF: ChangeHandler | undefined;
  let errorsRHF: FieldErrors<FieldValues> = {};
  let watchRHF: UseFormWatch<FieldValues> | undefined;
  let nameRHF: string = "";
  let refRHF: RefCallBack | undefined;
  let restRHF: {
    min?: string | number | undefined;
    max?: string | number | undefined;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    pattern?: string | undefined;
    required?: boolean | undefined;
    disabled?: boolean | undefined;
  } = {};

  if (register) {
    const { onChange, onBlur, ref, name, ...rest } = register;
    const {
      formState: { errors },
      watch,
    } = useFormContext();

    errorsRHF = errors;
    onCahngeRHF = onChange;
    onBlurRHF = onBlur;
    watchRHF = watch;
    refRHF = ref;
    nameRHF = name;
    restRHF = rest;
  }

  return {
    onCahngeRHF,
    onBlurRHF,
    errorsRHF,
    watchRHF,
    refRHF,
    nameRHF,
    restRHF,
  };
}
