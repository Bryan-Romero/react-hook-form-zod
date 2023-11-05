import { useState, useEffect } from "react";

export default function useToggleDarkLightMode() {
  const [theme, setTheme] = useState(() => {
    if (localStorage.theme) {
      return localStorage.theme === "dark" ? "dark" : "light";
    } else {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
  });
  const [isDark, setIsDark] = useState(theme === "dark");
  const toggleDarkMode = () => {
    setTheme((prevState) => {
      return prevState === "dark" ? "light" : "dark";
    });
  };

  useEffect(() => {
    setIsDark(theme === "dark");

    const root = window.document.documentElement;
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);

    return () => {};
  }, [theme]);

  return { isDark, toggleDarkMode };
}
