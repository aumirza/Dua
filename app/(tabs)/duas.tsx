import DuasList from "@/components/DuasList";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

const duasIndex =
  "https://secure.quranexplorer.com/DuaAppServices/Service1.svc/GetDuaIndexes/157";

const Tab = createMaterialTopTabNavigator();

export default function DuasScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Duas", headerShown: true });
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Categories" component={DuaByCategory} />
      <Tab.Screen name="All" component={AllDuasTab} />
    </Tab.Navigator>
  );
}

const DuaByCategory = () => {
  return (
    <View>
      <Text>Dua By Category</Text>
    </View>
  );
};

const AllDuasTab = () => {
  const [duasList, setDuasList] = useState<duaListItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRefreshing(true);
    fetch(duasIndex)
      .then((res) => res.json())
      // remove duplicates in ts
      .then((duas: duaListItem[]) =>
        duas.filter(
          (dua, index, self) =>
            index === self.findIndex((t) => t.DuaID === dua.DuaID)
        )
      )
      .then((duas) => {
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
};
