import api from "@/lib/axios";
import { create } from "zustand";

interface ChatStore {
  users: any[];
  fetchUsers: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useChat = create<ChatStore>((set) => ({
  users: [],
  isLoading: false,
  error: null,
  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/users");
      set({ users: response.data });
    } catch (error) {
      console.error("Failed to fetch users:", error);
      set({ error: "Failed to fetch users" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
