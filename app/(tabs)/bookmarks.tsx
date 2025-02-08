import { RefreshControl, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DuasList from "@/components/DuasList";
import { useBookmarks } from "@/hooks/useBookMarks";

const Tab = createMaterialTopTabNavigator();

const AllBookMarks = () => {
  const { bookmarks, loading, syncBookmarks } = useBookmarks();

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={syncBookmarks} />
      }
    >
      <DuasList duaList={bookmarks} />
    </ScrollView>
  );
};

const Memorised = () => {
  return (
    <View>
      <Text>Memorised</Text>
    </View>
  );
};

const bookmarks = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      style={{ paddingTop: insets.top }}
      initialRouteName="Bookmarks"
      screenOptions={{ lazy: true }}
    >
      <Tab.Screen name="Saved" component={AllBookMarks} />
      <Tab.Screen name="Memorised" component={Memorised} />
    </Tab.Navigator>
  );
};

export default bookmarks;
