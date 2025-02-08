import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const PaperDefaultTheme = {
  ...MD3LightTheme,
};

export const PaperDarkTheme = {
  ...MD3DarkTheme,
};

// Use this for backward compatibility
export const gradients: Array<[string, string]> = [
  ["#2c3e50", "#3498db"], // Deep Ocean
  ["#2c3e50", "#34495e"], // Midnight Blue
  ["#414345", "#232526"], // Slate
  ["#373B44", "#4286f4"], // Steel Blue
  ["#4b6cb7", "#182848"], // Naval
  ["#283c86", "#45a247"], // Forest Blend
  ["#614385", "#516395"], // Mystic
  ["#1f4037", "#99f2c8"], // Moss
  ["#4b6cb7", "#2c3e50"], // Deep Space
  ["#3c3b3f", "#605c3c"], // Vintage
];
