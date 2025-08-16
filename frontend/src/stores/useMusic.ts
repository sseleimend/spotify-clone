import api from "@/lib/axios";
import { create } from "zustand";
import type { Album, Song } from "@/types";

interface MusicStore {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  fetchAlbums: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
}

export const useMusic = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  currentAlbum: null,
  isLoading: false,
  error: null,
  fetchAlbums: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/albums");
      set({ albums: response.data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchSongs: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/songs");
      set({ songs: response.data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchAlbumById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/albums/${id}`);
      set({ currentAlbum: response.data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
