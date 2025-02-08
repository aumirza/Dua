import React from "react";
import { RefreshControl, ScrollView } from "react-native";

import DuasList from "@/components/DuasList";
import { useStore } from "@/store/store";

export function Saved() {
  const { bookmarks, hydrated } = useStore();

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={!hydrated}
          onRefresh={() => console.log("refreshing")}
        />
      }
    >
      <DuasList duaList={bookmarks} />
    </ScrollView>
  );
}
