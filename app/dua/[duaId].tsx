import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Text, Button, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { useStore } from "@/store/store";
import { fetchDuaById } from "@/services/ApiService";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { toTitleCase } from "@/utils/case";

export default function DuaPage() {
  const [dua, setDua] = useState<IDua>();
  const [fetching, setFetching] = useState(false);
  const theme = useTheme();

  const { duaId } = useLocalSearchParams();
  const navigation = useNavigation();

  const {
    isBookmarked,
    addBookmark,
    removeBookmark,
    isMemorized,
    addMemorized,
    removeMemorized,
  } = useStore();

  const isCurrentDuaBookmarked = isBookmarked(Number(duaId));
  const isCurrentDuaMemorized = isMemorized(Number(duaId));

  const handleMemorised = () => {
    if (!dua) return;

    if (isCurrentDuaMemorized) {
      removeMemorized(Number(duaId));
    } else {
      addMemorized(dua);
    }
  };

  useEffect(() => {
    if (!dua) return;

    const handleBookmark = () => {
      if (isCurrentDuaBookmarked) {
        removeBookmark(Number(duaId));
      } else {
        addBookmark(dua);
      }
    };

    navigation.setOptions({
      title: toTitleCase(dua.ShortDescription) ?? "Dua",
      headerRight: () => (
        <View style={{ flexDirection: "row", gap: 15 }}>
          <TabBarIcon
            color={theme.colors.primary}
            name={isCurrentDuaBookmarked ? "bookmark" : "bookmark-outline"}
            onPress={handleBookmark}
            disabled={!dua}
          />
        </View>
      ),
    });
  }, [dua, duaId, isCurrentDuaBookmarked]);

  useEffect(() => {
    setFetching(true);
    fetchDuaById(Number(duaId))
      .then((data) => {
        setDua(data);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [duaId]);

  return (
    <SafeAreaView>
      {fetching ? (
        <ActivityIndicator animating={fetching} />
      ) : (
        <View
          style={{
            padding: 20,
            gap: 30,
          }}
        >
          <Text variant="titleMedium">
            {toTitleCase(dua?.ShortDescription ?? "")}
          </Text>
          <Text variant="headlineMedium">{dua?.Script}</Text>
          <View style={{ gap: 5 }}>
            <Text variant="titleSmall">Transliteration</Text>
            <Text variant="bodyMedium">{dua?.Transliteration}</Text>
          </View>
          <View style={{ gap: 5 }}>
            <Text variant="titleSmall">Translation</Text>
            <Text variant="bodyMedium">{dua?.Translation}</Text>
          </View>
          <View style={{ gap: 10 }}>
            <Button
              mode={isCurrentDuaMemorized ? "contained" : "outlined"}
              icon="check-circle"
              onPress={handleMemorised}
            >
              {isCurrentDuaMemorized ? "Memorized" : "Mark as Memorized"}
            </Button>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
