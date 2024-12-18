import { logout } from "@/actions/auth";
import { UserSessionStore } from "@/app/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserSession = create<UserSessionStore>()(
  persist(
    (set) => ({
      user: null,

      setUser: async (userData) => {
        try {
          //update local store
          set({ user: userData });
        } catch (error) {
          console.error("Session creation error:", error);
        }
      },
      clearSession: async () => {
        const result = await logout();
        if (result.success) {
          set({ user: null });
        } else {
          throw new Error("Logout failed");
        }
      },
    }),
    {
      name: "user-session",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
