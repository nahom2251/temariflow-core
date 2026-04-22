import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AppRole =
  | "super_admin"
  | "school_owner"
  | "principal"
  | "teacher"
  | "student"
  | "parent"
  | "accountant"
  | "librarian";

export const ROLE_LABELS: Record<AppRole, string> = {
  super_admin: "Super Admin",
  school_owner: "School Owner",
  principal: "Principal",
  teacher: "Teacher",
  student: "Student",
  parent: "Parent",
  accountant: "Accountant",
  librarian: "Librarian",
};

interface RoleStore {
  role: AppRole;
  setRole: (r: AppRole) => void;
}

export const useRoleStore = create<RoleStore>()(
  persist(
    (set) => ({
      role: "school_owner",
      setRole: (role) => set({ role }),
    }),
    { name: "temariflow-role" }
  )
);
