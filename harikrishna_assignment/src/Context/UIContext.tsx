import { createContext, type Dispatch, type SetStateAction } from "react";

export type Role = "viewer" | "admin";
export type ThemeMode = "dark" | "light";

export const UIContext = createContext<{
  role: Role;
  setRole: Dispatch<SetStateAction<Role>>;
  themeMode: ThemeMode;
  setThemeMode: Dispatch<SetStateAction<ThemeMode>>;
  toggleTheme: () => void;
} | null>(null);
