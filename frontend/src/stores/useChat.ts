import api from "@/lib/axios";
import type { Message, User } from "@/types";
import { create } from "zustand";
import { io, type Socket } from "socket.io-client";

interface ChatStore {
  users: User[];
  fetchUsers: () => Promise<void>;
  isLoading: boolean;
  socket: Socket;
  isConnected: boolean;
  onlineUsers: Set<string>;
  userActivities: Map<string, string>;
  messages: Message[];
  error: string | null;
  selectedUser: User | null;

  initSocket: (userId: string) => void;
  disconnectSocket: () => void;
  sendMessage: (senderId: string, receiverId: string, content: string) => void;
  fetchMessages: (userId: string) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
}

const baseURL = "http://localhost:5000";
const socket = io(baseURL, {
  autoConnect: false,
  withCredentials: true,
});

export const useChat = create<ChatStore>((set, get) => ({
  users: [],
  isLoading: false,
  socket: socket,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  messages: [],
  error: null,
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
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
  initSocket: (userId) => {
    if (!get().isConnected) {
      socket.auth = { userId };
      socket.connect();
      socket.emit("user_connected", userId);

      socket.on("users_online", (users: string[]) => {
        set({ onlineUsers: new Set(users) });
      });

      socket.on("activities", (activities: [string, string][]) => {
        set({ userActivities: new Map(activities) });
      });

      socket.on("user_connected", (userId: string) => {
        set((state) => ({
          onlineUsers: new Set(state.onlineUsers).add(userId),
        }));
      });

      socket.on("user_disconnected", (userId: string) => {
        set((state) => {
          const updatedUsers = new Set(state.onlineUsers);
          updatedUsers.delete(userId);
          return { onlineUsers: updatedUsers };
        });
      });

      socket.on("receive_message", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("message_sent", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("activity_updated", (userId: string, activity: string) => {
        set((state) => ({
          userActivities: new Map(state.userActivities).set(userId, activity),
        }));
      });

      set({ isConnected: true });
    }
  },
  disconnectSocket: () => {
    if (get().isConnected) {
      socket.disconnect();
      set({ isConnected: false });
    }
  },
  sendMessage: (senderId, receiverId, content) => {
    const socket = get().socket;
    if (socket) {
      socket.emit("send_message", { senderId, receiverId, content });
    }
  },
  fetchMessages: async (userId) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/users/messages/${userId}`);
      set({ messages: response.data });
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      set({ error: "Failed to fetch messages" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
