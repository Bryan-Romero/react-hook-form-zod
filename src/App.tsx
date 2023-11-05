import Button from "./components/Button";
import InputField from "./components/InputField";
import ToggleDarkLightMode from "./components/ToggleDarkLightMode";

export default function App() {
  return (
    <div className="w-screen h-screen p-5 bg-white dark:bg-gray-900 antialiased">
      <div className="max-w-6xl mx-auto flex justify-end">
        <ToggleDarkLightMode />
      </div>
      <form>
        <div className="max-w-4xl mx-auto flex flex-col">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <InputField
              placeholder="John"
              label="First name"
              type="text"
            />

            <InputField
              placeholder="Doe"
              label="Last name"
              type="text"
            />

            <InputField
              placeholder="Flowbite"
              label="Company"
              type="text"
            />

            <InputField
              placeholder="123-45-678"
              label="Phone number"
              type="tel"
            />

            <InputField
              placeholder="flowbite.com"
              label="Website URL"
              type="url"
            />

            <InputField
              placeholder="flowbite.com"
              label="Unique visitors (per month)"
              type="number"
            />
          </div>

          <InputField
            placeholder="john.doe@company.com"
            label="Email address"
            type="email"
            classNameContainer="mb-6"
          />

          <InputField
            placeholder="•••••••••"
            label="Password"
            type="password"
            classNameContainer="mb-6"
          />

          <InputField
            placeholder="•••••••••"
            label="Confirm password"
            type="password"
            classNameContainer="mb-6"
          />

          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
}
