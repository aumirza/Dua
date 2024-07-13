import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface DuaType {
  ArabicAudio: string;
  DescLanguageName: string;
  ErrorID: number;
  ErrorText: string;
  HowToRead: string;
  KeywordText: string;
  LongDescription: string;
  Script: string;
  ShortDescription: string;
  TransLanguageName: string;
  Translation: string;
  TranslationAudio: string;
  Transliteration: string;
  WhatIsItFor: string;
  WhenToRead: string;
  WhereToRead: string;
  WhoReadItHistory: string;
  WhyToRead: string;
}

const url =
  "https://secure.quranexplorer.com/DuaAppServices/Service1.svc/GetDuaDetailByDuaID/";

const Dua = () => {
  const [dua, setDua] = useState<DuaType>();

  const { duaId } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: dua?.ShortDescription ?? "Dua",
    });
  }, [dua]);

  useEffect(() => {
    const pathTofetch = url + duaId;
    console.log("pathTofetch", pathTofetch);
    fetch(pathTofetch)
      .then((res) => res.json())
      .then((data) => setDua(data));
  }, []);

  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
};

export default Dua;
