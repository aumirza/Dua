import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

const AllBookMarks = () => {
  return (
    <View>
      <Text>All Bookmarks</Text>
    </View>
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
  return (
    // <SafeAreaView>
    <Tab.Navigator initialRouteName="Bookmarks" screenOptions={{ lazy: true }}>
      <Tab.Screen name="Bookmarks" component={AllBookMarks} />
      <Tab.Screen name="Memorised" component={BookMarks} />
      <Tab.Screen name="Saved" component={Memorised} />
    </Tab.Navigator>
    // </SafeAreaView>
  );
};

export default bookmarks;
