import { getItem, setItem } from "./AsyncStorage";

const keyName = "bookmarks";

const isAlreadyBookmarked = async (duaId: number) => {
  const bookmarks: DuaType[] = (await getItem(keyName)) ?? [];
  return bookmarks.find((dua: DuaType) => dua.DuaID === duaId) ? true : false;
};

const addBookmark = async (dua: DuaType) => {
  const bookmarks = (await getItem(keyName)) ?? [];
  bookmarks.push(dua);
  setItem(keyName, bookmarks);
};

const removeBookmark = async (duaId: number) => {
  const bookmarks = (await getItem(keyName)) ?? [];
  const newBookmarks = bookmarks.filter((dua: DuaType) => dua.DuaID !== duaId);
  setItem(keyName, newBookmarks);
};

const getBookmarks = async () => {
  return (await getItem(keyName)) ?? [];
};

const clearBookmarks = async () => {
  setItem(keyName, []);
};

export const BookmarksStorage = {
  isAlreadyBookmarked,
  addBookmark,
  removeBookmark,
  getBookmarks,
  clearBookmarks,
};
