import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { PaperProvider, adaptNavigationTheme } from "react-native-paper";
import {
  ThemeProvider,
  DarkTheme as navDarkTheme,
  DefaultTheme as navDefaulttTheme,
} from "@react-navigation/native";
import { PaperDarkTheme, PaperDefaultTheme } from "@/constants/theme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const { DarkTheme, LightTheme } = adaptNavigationTheme({
  reactNavigationLight: navDefaulttTheme,
  reactNavigationDark: navDarkTheme,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
    colorScheme === "dark" ? PaperDarkTheme : PaperDefaultTheme;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : LightTheme}>
      <PaperProvider theme={paperTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="+not-found" /> */}
          <Stack.Screen
            name="dua"
            options={{ title: "Dua | ", animation: "slide_from_left" }}
          />
        </Stack>
      </PaperProvider>
    </ThemeProvider>
  );
}
