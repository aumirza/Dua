import categories from "@/data/categories.json";
import duas from "@/data/duas.json";
import { waitFor } from "@/utils/wait";
import { uuid } from "@/utils/uuid";

export async function fetchDuas() {
  await waitFor(1000);
  return duas.filter((d) => d.DuaID) as IDuaItem[];
}

export async function fetchDuasCategories() {
  await waitFor(1000);
  const mappedCategories: ICategory[] = categories.map((c, index) => ({
    ...c,
    id: uuid(),
  }));
  return mappedCategories;
}
