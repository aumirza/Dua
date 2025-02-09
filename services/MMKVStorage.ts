import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

const DUA_CACHE_PREFIX = "dua_";
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days

export const MMKVStorage = {
  cacheDua: (dua: IDua) => {
    const key = `${DUA_CACHE_PREFIX}${dua.DuaID}`;
    storage.set(
      key,
      JSON.stringify({
        data: dua,
        timestamp: Date.now(),
      })
    );
  },

  getCachedDua: (duaId: number): IDua | null => {
    const key = `${DUA_CACHE_PREFIX}${duaId}`;
    const cached = storage.getString(key);

    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_EXPIRY) {
      storage.delete(key);
      return null;
    }

    return data;
  },
};
