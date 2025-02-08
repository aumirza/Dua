import { BookmarksContext } from "@/contexts/BookmarksContext";
import { useContext } from "react";

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
};
