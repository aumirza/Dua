import { RefreshControl, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { BookmarksStorage } from "@/utils/BookmarksStorage";
import DuasList from "@/components/DuasList";

const Tab = createMaterialTopTabNavigator();

const AllBookMarks = () => {
  const [bookmarks, setBookmarks] = useState<DuaType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookmarks = () => {
    setLoading(true);
    BookmarksStorage.getBookmarks().then((bookmarks) => {
      setLoading(false);
      setBookmarks(bookmarks);
    });
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchBookmarks} />
      }
    >
      <DuasList duaList={bookmarks} />
    </ScrollView>
  );
};

const BookMarks = () => {
  return (
    <View>
      <Text>Bookmarks</Text>
    </View>
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
      <Tab.Screen name="Bookmarks" component={AllBookMarks} />
      <Tab.Screen name="Memorised" component={BookMarks} />
      <Tab.Screen name="Saved" component={Memorised} />
    </Tab.Navigator>
  );
};

export default bookmarks;
