import React, { useEffect, useState } from "react";
import { ThemeContext } from "./context.js";

const THEME_KEY = "novacup-theme";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";

    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      // localStorage not available
    }

    // Default to light if no saved preference
    return "light";
  });

  useEffect(() => {
    const isDark = theme === "dark";
    try {
      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.style.colorScheme = isDark ? "dark" : "light";
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // localStorage not available
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
