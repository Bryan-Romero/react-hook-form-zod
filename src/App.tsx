import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./components/Button";
import InputField from "./components/InputField";
import ToggleDarkLightMode from "./components/ToggleDarkLightMode";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { TSignUpSchema, signUpSchema } from "./lib/types/typeSignUpSchema.d";
import SelectInput from "./components/SelectInput";
import Checkbox from "./components/Checkbox";
import { useState } from "react";
import TermsConditions from "./components/TermsConditions";
import InputPhoneNumber from "./components/InputPhoneNumber";

export default function App() {
  const methods = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    register,
    setValue,
    watch,
  } = methods;
  const [modal, setModal] = useState(false);

  const onSubmit: SubmitHandler<TSignUpSchema> = async (data) => {
    await new Promise((resolve) =>
      setTimeout(() => {
        console.log(data);
        resolve(null);
      }, 4000)
    );
    reset();
  };

  const handleAcceptTerms = () => {
    setValue("terms", true);
    setModal(false);
  };

  const handleDeclineTerms = () => {
    setValue("terms", false);
    setModal(false);
  };

  return (
    <div className="w-screen h-screen p-5 bg-white dark:bg-gray-900 antialiased">
      <div className="max-w-6xl mx-auto flex justify-end">
        <ToggleDarkLightMode />
      </div>
      <span className="icon-[material-symbols--10k]" />
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

              {/* <InputField
                placeholder="123-45-678"
                label="Phone number"
                type="tel"
                disabled={isSubmitting}
              /> */}

              <InputPhoneNumber
                label="Phone number"
                disabled={isSubmitting}
                placeholder="123-45-678"
                registerAreaCode={register("areaCode")}
                registerPhoneNumber={register("phoneNumber")}
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
              // label="I agree with the terms and conditions"
              disabled={isSubmitting}
              register={register("terms")}
              classNameContainer="mb-6"
            >
              I agree with the{" "}
              <button
                className="text-blue-600 hover:underline dark:text-blue-500 outline-none"
                type="button"
                onClick={() => setModal(true)}
              >
                terms and conditions
              </button>
              .
            </Checkbox>

            <Button
              type="submit"
              disabled={isSubmitting}
              showSpinner
            >
              Submit
            </Button>

            {modal && (
              <TermsConditions
                id="modal-terms"
                onClose={() => setModal(false)}
                onAccept={handleAcceptTerms}
                onDecline={handleDeclineTerms}
              />
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
