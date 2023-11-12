import { twMerge } from "tailwind-merge";
import loadButton from "../assets/loadButton.svg";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  showSpinner?: boolean;
  onClick?: () => void;
  secundary?: boolean;
};

export default function Button({
  type,
  children,
  className,
  disabled = false,
  showSpinner = false,
  onClick,
  secundary = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={twMerge(
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:cursor-default disabled:bg-blue-300 disabled:dark:bg-blue-400 inline-flex items-center justify-center",
        secundary &&
          "text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600",
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {showSpinner && disabled && (
        <img
          src={loadButton}
          alt="loading..."
          className="inline w-4 h-4 mr-3 text-white animate-spin"
        />
      )}
      {children}
    </button>
  );
}
