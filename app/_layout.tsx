import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import {
  PaperProvider,
  adaptNavigationTheme,
  // ThemeProvider,
} from "react-native-paper";
import {
  ThemeProvider,
  DarkTheme as navDarkTheme,
  DefaultTheme as navDefaulttTheme,
} from "@react-navigation/native";
import { PaperDarkTheme, PaperDefaultTheme } from "@/constants/theme";
import { useStore } from "@/store/store";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const { DarkTheme: navigationDarkTheme, LightTheme: navigationLightTheme } =
  adaptNavigationTheme({
    reactNavigationLight: navDefaulttTheme,
    reactNavigationDark: navDarkTheme,
  });

export default function RootLayout() {
  const { getTheme } = useStore();
  const currentTheme = getTheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const paperTheme =
    currentTheme === "dark" ? PaperDarkTheme : PaperDefaultTheme;
  const navigationTheme =
    currentTheme === "dark" ? navigationDarkTheme : navigationLightTheme;

  return (
    <ThemeProvider value={navigationTheme}>
      <PaperProvider theme={paperTheme}>
        <Stack
        // screenOptions={{
        //   animation: "slide_from_right",
        //   animationDuration: 300,
        //   contentStyle: {
        //     backgroundColor: paperTheme.colors.background,
        //   },
        // }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="+not-found" /> */}
          <Stack.Screen
            name="dua/[duaId]"
            options={{
              title: "Dua",
              animation: "slide_from_right",
            }}
          />
        </Stack>
      </PaperProvider>
    </ThemeProvider>
  );
}
