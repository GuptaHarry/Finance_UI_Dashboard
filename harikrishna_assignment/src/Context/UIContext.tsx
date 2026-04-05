import { createContext, type Dispatch,type SetStateAction } from "react";

export type Role = "viewer" | "admin";

export const UIContext = createContext<{
  role: Role;
  setRole: Dispatch<SetStateAction<Role>>;
} | null>(null);
