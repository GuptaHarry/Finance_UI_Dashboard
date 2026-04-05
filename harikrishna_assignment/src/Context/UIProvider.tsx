import { useState, useEffect, type ReactNode } from "react";
import { UIContext, type Role, type ThemeMode } from "./UIContext";

const STORAGE_KEYS = {
  ROLE: "finance_dashboard_role",
  THEME: "finance_dashboard_theme",
};

export function UIProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
      return (saved as Role) || "viewer";
    }
    return "viewer";
  });

  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return (saved as ThemeMode) || "dark";
    }
    return "dark";
  });

  // Persist role to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }, [role]);

  // Persist theme to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <UIContext.Provider value={{ role, setRole, themeMode, setThemeMode, toggleTheme }}>
      {children}
    </UIContext.Provider>
  );
}
