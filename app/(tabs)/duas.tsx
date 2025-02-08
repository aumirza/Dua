import { useEffect } from "react";
import { useNavigation } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Categories } from "@/components/Categories";
import { AllDuasTab } from "@/components/AllDuas";

const Tab = createMaterialTopTabNavigator();

export default function DuasScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Duas", headerShown: true });
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="All" component={AllDuasTab} />
    </Tab.Navigator>
  );
}
