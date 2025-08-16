import { create } from "zustand";
import api from "@/lib/axios";

interface Auth {
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  checkAdminStatus: () => Promise<void>;
  reset: () => void;
}

export const useAuth = create<Auth>((set) => ({
  isAdmin: false,
  isLoading: false,
  error: null,
  checkAdminStatus: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/admin/check");
      set({ isAdmin: response.data.admin });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
  reset: () => {
    set({ isAdmin: false, isLoading: false, error: null });
  },
}));

export default useAuth;
