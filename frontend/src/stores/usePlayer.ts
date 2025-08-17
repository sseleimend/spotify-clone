import { create } from "zustand";
import { type Song } from "@/types";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;

  initQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayer = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: 0,

  initQueue: (songs) =>
    set({
      queue: songs,
      currentSong: get().currentSong ?? songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    }),
  playAlbum: (songs, startIndex = 0) => {
    if (songs.length === 0) return;
    set({
      queue: songs,
      currentSong: songs[startIndex],
      currentIndex: startIndex,
      isPlaying: true,
    });
  },
  setCurrentSong: (song) => {
    if (!song) return;

    const songIndex = get().queue.findIndex((s) => s._id === song._id);

    set({
      currentSong: song,
      currentIndex: songIndex === -1 ? songIndex : get().currentIndex,
    });
  },
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  playNext: () =>
    set((state) => {
      const nextIndex = (state.currentIndex + 1) % state.queue.length;
      return {
        currentIndex: nextIndex,
        currentSong: state.queue[nextIndex],
        isPlaying: true,
      };
    }),
  playPrevious: () =>
    set((state) => {
      const prevIndex =
        (state.currentIndex - 1 + state.queue.length) % state.queue.length;
      return {
        currentIndex: prevIndex,
        currentSong: state.queue[prevIndex],
        isPlaying: true,
      };
    }),
}));
