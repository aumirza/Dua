import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Link, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { List, MD3Colors, Text } from "react-native-paper";

const duasIndex =
  "https://secure.quranexplorer.com/DuaAppServices/Service1.svc/GetDuaIndexes/157";

interface duaListItem {
  DuaID: number;
  ErrorID: number;
  ErrorText: string;
  IndexID: number;
  ParentID: number;
  ShortDescription: string;
  Title: string;
}

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

  useEffect(() => {
    fetch(duasIndex)
      .then((res) => res.json())
      // remove duplicates in ts
      .then((duas: duaListItem[]) =>
        duas.filter(
          (dua, index, self) =>
            index === self.findIndex((t) => t.DuaID === dua.DuaID)
        )
      )
      .then((duas) => setDuasList(duas));
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <List.Section>
        {duasList.map((dua, i) => (
          <Link
            key={dua.DuaID + dua.ShortDescription}
            href={{ pathname: "/dua/" + dua.DuaID }}
            // href={{ pathname: "/dua/[duaID]", params: { duaId: dua.DuaID } }}
            asChild
          >
            <TouchableOpacity>
              <List.Item
                style={{
                  paddingHorizontal: 10,
                  borderBottomColor: MD3Colors.neutralVariant10,
                }}
                title={dua.ShortDescription}
                left={(props) => (
                  <View
                    {...props}
                    style={{
                      borderRadius: 100,
                      backgroundColor: "primary",
                      width: 50,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text variant="titleMedium">{i + 1}</Text>
                  </View>
                )}
              />
            </TouchableOpacity>
          </Link>
        ))}
      </List.Section>
    </ScrollView>
  );
};
