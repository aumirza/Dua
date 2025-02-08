import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IStoreState {
  bookmarks: IDua[];
  hydrated: boolean;
}
interface IStoreActions {
  setHydrated: () => void;
  isBookmarked: (duaId: number) => boolean;
  addBookmark: (dua: IDua) => void;
  removeBookmark: (duaId: number) => void;
  clearBookmarks: () => void;
}

export const useStore = create<IStoreState & IStoreActions>()(
  persist(
    immer((set, get) => ({
      hydrated: false,
      bookmarks: [],
      syncBookmarks: async () => {
        const stored = await AsyncStorage.getItem("bookmarks");
        if (stored) {
          set({ bookmarks: JSON.parse(stored) });
        }
      },

      isBookmarked: (duaId: number) =>
        get().bookmarks.some((dua) => dua.DuaID === duaId),

      addBookmark: (dua: IDua) => {
        // setBookmarks((prev) => [...prev, dua]);

        set((state) => ({
          bookmarks: [...state.bookmarks, dua],
        }));
      },

      removeBookmark: (duaId: number) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((dua) => dua.DuaID !== duaId),
        }));
      },

      clearBookmarks: () => {
        set({ bookmarks: [] });
      },
      setHydrated() {
        set({ hydrated: true });
      },
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
