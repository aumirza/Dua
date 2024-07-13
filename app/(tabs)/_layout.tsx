import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { FontAwesome5 } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="duas"
        options={{
          title: "Duas",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name="praying-hands" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: "Saved",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "bookmark" : "bookmark-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
