import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBookmarks } from "@/hooks/useBookMarks";

const url =
  "https://secure.quranexplorer.com/DuaAppServices/Service1.svc/GetDuaDetailByDuaID/";

const Dua = () => {
  const [dua, setDua] = useState<DuaType>();
  const [fetching, setFetching] = useState(false);

  const { duaId } = useLocalSearchParams();
  const navigation = useNavigation();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();

  const handleBookmark = () => {
    if (!duaId || !dua) return;

    if (isBookmarked(Number(duaId))) {
      removeBookmark(Number(duaId));
    } else {
      addBookmark({ ...dua, DuaID: Number(duaId) });
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: dua?.ShortDescription ?? "Dua",
      headerRight: () => (
        <TabBarIcon
          color="white"
          name={isBookmarked(Number(duaId)) ? "bookmark" : "bookmark-outline"}
          onPress={handleBookmark}
        />
      ),
    });
  }, [dua, duaId, isBookmarked]);

  useEffect(() => {
    const pathTofetch = url + duaId;
    console.log("pathTofetch", pathTofetch);
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
};

export default Dua;
