import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Saved } from "@/components/Saved";
import { Memorised } from "@/components/Memorised";

const Tab = createMaterialTopTabNavigator();

export default function Bookmarks() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      style={{ paddingTop: insets.top }}
      initialRouteName="saved"
      screenOptions={{ lazy: true }}
    >
      <Tab.Screen name="saved" options={{ title: "Saved" }} component={Saved} />
      <Tab.Screen
        name="memorised"
        options={{ title: "Memorised" }}
        component={Memorised}
      />
    </Tab.Navigator>
  );
}
