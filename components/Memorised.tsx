import { useStore } from "@/store/store";
import React from "react";
import { RefreshControl, View } from "react-native";
import { ScrollView } from "react-native";
import DuasList from "./DuasList";
import { Text } from "react-native-paper";

export function Memorised() {
  const { hydrated, memorized, removeMemorized } = useStore();

  const handleUnmarkMemorized = (selectedIds: number[]) => {
    selectedIds.forEach((id) => removeMemorized(Number(id)));
  };

  return (
    <View style={{ flex: 1 }}>
      {!memorized.length && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text variant="headlineSmall">No Duas memorised yet</Text>
        </View>
      )}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={!hydrated}
            onRefresh={() => console.log("refreshing")}
          />
        }
      >
        <DuasList
          duaList={memorized}
          selectionAction={{
            icon: "delete",
            color: "red",
            onAction: handleUnmarkMemorized,
          }}
        />
      </ScrollView>
    </View>
  );
}
