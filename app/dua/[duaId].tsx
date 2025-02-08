import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useStore } from "@/store/store";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const url =
  "https://secure.quranexplorer.com/DuaAppServices/Service1.svc/GetDuaDetailByDuaID/";

export default function DuaPage() {
  const [dua, setDua] = useState<IDua>();
  const [fetching, setFetching] = useState(false);

  const { duaId } = useLocalSearchParams();
  const navigation = useNavigation();

  const { isBookmarked, addBookmark, removeBookmark } = useStore();
  const isCurrentDuaBookmarked = isBookmarked(Number(duaId));

  useEffect(() => {
    if (!dua) return;

    const handleBookmark = () => {
      if (isCurrentDuaBookmarked) {
        removeBookmark(Number(duaId));
      } else {
        addBookmark({ ...dua, DuaID: Number(duaId) });
      }
    };

    navigation.setOptions({
      title: dua.ShortDescription ?? "Dua",
      headerRight: () => (
        <TabBarIcon
          color="white"
          name={isCurrentDuaBookmarked ? "bookmark" : "bookmark-outline"}
          onPress={handleBookmark}
          disabled={!dua}
        />
      ),
    });
  }, [dua, duaId, isCurrentDuaBookmarked]);

  useEffect(() => {
    const pathTofetch = url + duaId;
    // console.log("pathTofetch", pathTofetch);
    setFetching(true);
    fetch(pathTofetch)
      .then((res) => res.json())
      .then((data) => {
        setFetching(false);
        setDua(data);
      });
  }, []);

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
          <Text variant="titleMedium">{dua?.ShortDescription}</Text>
          <Text variant="headlineMedium">{dua?.Script}</Text>
          <View style={{ gap: 5 }}>
            <Text variant="titleSmall">Transliteration</Text>
            <Text variant="bodyMedium">{dua?.Transliteration}</Text>
          </View>
          <View style={{ gap: 5 }}>
            <Text variant="titleSmall">Translation</Text>
            <Text variant="bodyMedium">{dua?.Translation}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
