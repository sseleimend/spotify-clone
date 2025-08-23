import api from "@/lib/axios";
import { create } from "zustand";
import type { Album, Song, Stats } from "@/types";
import toast from "react-hot-toast";

interface MusicStore {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  fetchAlbums: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  madeForYouSongs: Song[];
  trendingSongs: Song[];
  featuredSongs: Song[];
  fetchStats: () => Promise<void>;
  stats: Stats;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
}

export const useMusic = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  currentAlbum: null,
  isLoading: false,
  error: null,
  madeForYouSongs: [],
  trendingSongs: [],
  featuredSongs: [],
  stats: {
    songs: 0,
    albums: 0,
    users: 0,
    artists: 0,
  },
  fetchStats: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/stats");
      set({ stats: response.data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
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
  fetchFeaturedSongs: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/songs/featured");
      set({ featuredSongs: response.data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchMadeForYouSongs: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/songs/made-for-you");
      set({ madeForYouSongs: response.data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchTrendingSongs: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/songs/trending");
      set({ trendingSongs: response.data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteSong: async (id: string) => {
    set({ isLoading: true });
    try {
      await api.delete(`/admin/songs/${id}`);
      set((state) => ({
        songs: state.songs.filter((song) => song._id !== id),
        trendingSongs: state.trendingSongs.filter((song) => song._id !== id),
        madeForYouSongs: state.madeForYouSongs.filter(
          (song) => song._id !== id
        ),
        featuredSongs: state.featuredSongs.filter((song) => song._id !== id),
      }));
      toast.success("Song deleted successfully");
    } catch (error) {
      set({ error: (error as Error).message });
      toast.error("Failed to delete song");
    } finally {
      set({ isLoading: false });
    }
  },
  deleteAlbum: async (id: string) => {
    set({ isLoading: true });
    try {
      await api.delete(`/admin/albums/${id}`);
      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id),
        songs: state.songs.filter((song) => song.albumId !== id),
      }));
      toast.success("Album deleted successfully");
    } catch (error) {
      set({ error: (error as Error).message });
      toast.error("Failed to delete album");
    } finally {
      set({ isLoading: false });
    }
  },
}));
