import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const value = useMemo(
    () => ({
      darkMode,
      toggleDarkMode: () => setDarkMode((prev) => !prev),
    }),
    [darkMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}