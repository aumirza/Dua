import { useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import DuasList from "@/components/DuasList";
import { fetchDuas } from "@/services/ApiService";

export function AllDuasTab() {
  const [duasList, setDuasList] = useState<IDuaItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRefreshing(true);
    fetchDuas().then((duas) => {
      setDuasList(duas);
      setRefreshing(false);
    });
  }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => console.log("refresh")}
        />
      }
    >
      <DuasList duaList={duasList} />
    </ScrollView>
  );
}
