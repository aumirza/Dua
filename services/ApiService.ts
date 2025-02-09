import categories from "@/data/categories.json";
import duas from "@/data/duas.json";
import { waitFor } from "@/utils/wait";
import { uuid } from "@/utils/uuid";
import { useStore } from "@/store/store";
import { MMKVStorage } from "./MMKVStorage";

const DUA_API_URL =
  "https://secure.quranexplorer.com/DuaAppServices/Service1.svc/GetDuaDetailByDuaID/";

export async function fetchDuas() {
  await waitFor(100);
  return duas.filter((d) => Boolean(d.DuaID)) as IDuaItem[];
}

export async function fetchDuasCategories() {
  await waitFor(100);
  const mappedCategories: ICategory[] = categories.map((c, index) => ({
    ...c,
    id: uuid(),
  }));
  return mappedCategories;
}

export async function fetchDuaById(duaId: number): Promise<IDua> {
  const cachedDua = MMKVStorage.getCachedDua(duaId);

  if (cachedDua) {
    return cachedDua;
  }

  const response = await fetch(DUA_API_URL + duaId);
  const data = await response.json();
  const dua = { ...data, DuaID: duaId };

  MMKVStorage.cacheDua(dua);
  return dua;
}

export async function fetchDuaOfTheDay() {
  const { getDuaOfTheDay, setDuaOfTheDay } = useStore.getState();
  const { dua, expired } = getDuaOfTheDay();

  if (dua && !expired) {
    return dua;
  }

  const validDuas = duas.filter((d) => Boolean(d.DuaID)) as IDuaItem[];
  const randomIndex = Math.floor(Math.random() * validDuas.length);
  const newDua = (await fetchDuaById(validDuas[randomIndex].DuaID)) as IDua;
  setDuaOfTheDay(newDua);
  return newDua;
}
