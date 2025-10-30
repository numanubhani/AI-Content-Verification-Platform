"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type HistoryItem = {
  id: string;
  kind: "text" | "image" | "video";
  label: string;
  trust_score: number;
  createdAt: number;
};

type HistoryState = {
  items: HistoryItem[];
  add: (item: HistoryItem) => void;
  clear: () => void;
};

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      items: [],
      add: (item) => set((s) => ({ items: [item, ...s.items].slice(0, 200) })),
      clear: () => set({ items: [] }),
    }),
    { name: "history-store" }
  )
);


