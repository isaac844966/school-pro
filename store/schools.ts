import { School } from "@/app/types/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SchoolState = {
  school: School | null;
  setSchool: (school: School | null) => void;
};
export const useSchoolStore = create<SchoolState>()(
  persist(
    (set) => ({
      school: null,
      setSchool: (school) => set({ school }),
    }),
    {
      name: "school-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        school: state.school,
      }),
    }
  )
);
