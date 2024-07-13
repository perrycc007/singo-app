// store.ts
import create from "zustand";
import { SongData, Progress } from "./types";

interface State {
  userId: string | null;
  setUserId: (userId: string) => void;
  songs: SongData[];
  setSongs: (songs: SongData[]) => void;
  progress: Progress[];
  setProgress: (progress: Progress[]) => void;
}

export const useStore = create<State>((set) => ({
  userId: null,
  setUserId: (userId: string) => set({ userId }),
  songs: [],
  setSongs: (songs: SongData[]) => set({ songs }),
  progress: [],
  setProgress: (progress: Progress[]) => set({ progress }),
}));
