import { create } from "zustand";
import { type Song } from "@/types";
import { useChat } from "./useChat";

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

    const song = songs[startIndex];

    const socket = useChat.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity: `Playing ${song.title} by ${song.artist}`,
      });
    }

    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
    });
  },
  setCurrentSong: (song) => {
    if (!song) return;

    const socket = useChat.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity: `Playing ${song.title} by ${song.artist}`,
      });
    }

    const songIndex = get().queue.findIndex((s) => s._id === song._id);

    set({
      currentSong: song,
      currentIndex: songIndex === -1 ? songIndex : get().currentIndex,
    });
  },
  togglePlay: () => {
    const willStartPlaying = !get().isPlaying;
    const currentSong = get().currentSong;
    const socket = useChat.getState().socket;

    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity:
          willStartPlaying && currentSong
            ? `Playing ${currentSong.title} by ${currentSong.artist}`
            : "Idle",
      });
    }

    set({ isPlaying: willStartPlaying });
  },
  playNext: () =>
    set((state) => {
      const nextIndex = (state.currentIndex + 1) % state.queue.length;

      const socket = useChat.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: `Playing ${state.queue[nextIndex].title} by ${state.queue[nextIndex].artist}`,
        });
      }

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

      const socket = useChat.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: `Playing ${state.queue[prevIndex].title} by ${state.queue[prevIndex].artist}`,
        });
      }

      return {
        currentIndex: prevIndex,
        currentSong: state.queue[prevIndex],
        isPlaying: true,
      };
    }),
}));
