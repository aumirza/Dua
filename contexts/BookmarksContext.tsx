import { createContext, useState, useEffect, ReactNode } from "react";
import { getItem, setItem } from "@/utils/AsyncStorage";

const STORAGE_KEY = "bookmarks";

interface BookmarksContextType {
  bookmarks: DuaType[];
  loading: boolean;
  isBookmarked: (duaId: number) => boolean;
  addBookmark: (dua: DuaType) => void;
  removeBookmark: (duaId: number) => void;
  clearBookmarks: () => void;
  syncBookmarks: () => Promise<void>;
}

export const BookmarksContext = createContext<BookmarksContextType | null>(
  null
);

export const BookmarksProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<DuaType[]>([]);
  const [loading, setLoading] = useState(true);

  const syncBookmarks = async () => {
    setLoading(true);
    const stored = await getItem(STORAGE_KEY);
    setBookmarks(stored ?? []);
    setLoading(false);
  };

  // Load initial bookmarks
  useEffect(() => {
    syncBookmarks();
  }, []);

  // Persist bookmarks whenever they change
  useEffect(() => {
    if (!loading) {
      setItem(STORAGE_KEY, bookmarks);
    }
  }, [bookmarks]);

  const isBookmarked = (duaId: number) =>
    bookmarks.some((dua) => dua.DuaID === duaId);

  const addBookmark = (dua: DuaType) => {
    setBookmarks((prev) => [...prev, dua]);
  };

  const removeBookmark = (duaId: number) => {
    setBookmarks((prev) => prev.filter((dua) => dua.DuaID !== duaId));
  };

  const clearBookmarks = () => {
    setBookmarks([]);
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        loading,
        isBookmarked,
        addBookmark,
        removeBookmark,
        clearBookmarks,
        syncBookmarks, // Add to provider
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};
