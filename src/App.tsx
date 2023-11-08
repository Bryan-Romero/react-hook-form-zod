import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./components/Button";
import InputField from "./components/InputField";
import ToggleDarkLightMode from "./components/ToggleDarkLightMode";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { TSignUpSchema, signUpSchema } from "./lib/types/typeSignUpSchema.d";
import SelectInput from "./components/SelectInput";
import Checkbox from "./components/Checkbox";

export default function App() {
  const methods = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    register,
  } = methods;

  const onSubmit: SubmitHandler<TSignUpSchema> = async (data) => {
    await new Promise((resolve) =>
      setTimeout(() => {
        console.log(data);
        resolve(null);
      }, 4000)
    );
    reset();
  };

  return (
    <div className="w-screen h-screen p-5 bg-white dark:bg-gray-900 antialiased">
      <div className="max-w-6xl mx-auto flex justify-end">
        <ToggleDarkLightMode />
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="max-w-4xl mx-auto flex flex-col">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <InputField
                placeholder="John"
                label="First name"
                type="text"
                disabled={isSubmitting}
                register={register("firstName")}
              />

              <InputField
                placeholder="Doe"
                label="Last name"
                type="text"
                disabled={isSubmitting}
                register={register("lastName")}
              />

              <InputField
                placeholder="Flowbite"
                label="Company"
                type="text"
                disabled={isSubmitting}
              />

              <InputField
                placeholder="123-45-678"
                label="Phone number"
                type="tel"
                disabled={isSubmitting}
              />

              <InputField
                placeholder="flowbite.com"
                label="Website URL"
                type="url"
                disabled={isSubmitting}
              />

              <InputField
                label="Unique visitors (per month)"
                type="number"
                disabled={isSubmitting}
              />

              <SelectInput
                label="Select an option"
                placeholder="Choose a country"
                options={["MX", "US", "COL", "ARG", "UK", "CHL", "BRA", "PER"]}
                // value="US"
                disabled={isSubmitting}
                register={register("country")}
              />
            </div>

            <InputField
              placeholder="john.doe@company.com"
              label="Email address"
              type="email"
              classNameContainer="mb-6"
              disabled={isSubmitting}
              register={register("email")}
            />

            <InputField
              placeholder="•••••••••"
              label="Password"
              type="password"
              classNameContainer="mb-6"
              disabled={isSubmitting}
              register={register("password")}
            />

            <InputField
              placeholder="•••••••••"
              label="Confirm password"
              type="password"
              classNameContainer="mb-6"
              disabled={isSubmitting}
              register={register("confirmPassword")}
            />

            <Checkbox
              id="terms"
              label="I agree with the terms and conditions"
              disabled={isSubmitting}
              register={register("terms")}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              showSpinner
            >
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
