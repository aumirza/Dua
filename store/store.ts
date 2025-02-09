import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";

interface IStoreState {
  bookmarks: IDua[];
  hydrated: boolean;
  memorized: IDua[];
  theme: "light" | "dark" | "system";
  duaOfTheDay?: IDua;
  duaOfTheDayExpiry?: number;
}

interface IStoreActions {
  setHydrated: () => void;
  isBookmarked: (duaId: number) => boolean;
  addBookmark: (dua: IDua) => void;
  removeBookmark: (duaId: number) => void;
  clearBookmarks: () => void;
  isMemorized: (duaId: number) => boolean;
  addMemorized: (dua: IDua) => void;
  removeMemorized: (duaId: number) => void;
  clearMemorized: () => void;
  clearStorage?: () => void; // optional since it's only available in dev
  setTheme: (theme: "light" | "dark" | "system") => void;
  getTheme: () => "light" | "dark";
  setDuaOfTheDay: (dua: IDua) => void;
  getDuaOfTheDay: () => { dua: IDua | undefined; expired: boolean };
}

export const useStore = create<IStoreState & IStoreActions>()(
  persist(
    immer((set, get) => ({
      hydrated: false,
      bookmarks: [],
      memorized: [],
      theme: "system",
      duaOfTheDay: undefined,
      duaOfTheDayExpiry: undefined,

      isBookmarked: (duaId: number) =>
        get().bookmarks.some((dua) => dua.DuaID === duaId),

      addBookmark: (dua: IDua) => {
        set((state) => {
          state.bookmarks.push(dua);
        });
      },

      removeBookmark: (duaId: number) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((dua) => dua.DuaID !== duaId),
        }));
      },

      clearBookmarks: () => {
        set({ bookmarks: [] });
      },

      isMemorized: (duaId: number) =>
        Boolean(get().memorized.some((dua) => dua.DuaID === duaId)),

      addMemorized: (dua: IDua) =>
        set((state) => {
          state.memorized.push(dua);
        }),

      removeMemorized: (duaId: number) =>
        set((state) => {
          const index = state.memorized.findIndex((m) => m.DuaID === duaId);
          if (index !== -1) {
            state.memorized.splice(index, 1);
          }
        }),

      clearMemorized: () => set({ memorized: [] }),

      setHydrated() {
        set({ hydrated: true });
      },

      setTheme: (theme) => set({ theme }),

      getTheme: () => {
        const theme = get().theme;
        if (theme === "system") {
          return Appearance.getColorScheme() || "light";
        }
        return theme;
      },

      setDuaOfTheDay: (dua: IDua) => {
        const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
        set({ duaOfTheDay: dua, duaOfTheDayExpiry: expiry });
      },

      getDuaOfTheDay: () => {
        const { duaOfTheDay, duaOfTheDayExpiry } = get();
        const expired = !duaOfTheDayExpiry || Date.now() > duaOfTheDayExpiry;
        return { dua: duaOfTheDay, expired };
      },

      ...(__DEV__ && {
        clearStorage: () => {
          set({
            bookmarks: [],
            memorized: [],
            hydrated: false,
            theme: "system",
          });
        },
      }),
    })),
    {
      name: "dua-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
      onRehydrateStorage(state) {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
