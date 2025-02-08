import { View, Alert } from "react-native";
import { List, Switch, Button, useTheme, Text } from "react-native-paper";
import { useStore } from "@/store/store";

export default function SettingScreen() {
  const { clearStorage, theme, setTheme } = useStore();
  const paperTheme = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const promptClearStorage = async () => {
    if (!clearStorage) {
      Alert.alert("Error", "Storage management is not available");
      return;
    }

    Alert.alert(
      "Clear All Data",
      "Are you sure you want to clear all saved data?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            try {
              clearStorage();
              Alert.alert("Data Cleared", "All saved data has been cleared.");
            } catch (error) {
              Alert.alert("Error", "Failed to clear data");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: paperTheme.colors.background }}>
      <View style={{ padding: 16 }}>
        <Text variant="headlineMedium" style={{ color: paperTheme.colors.primary }}>
          Settings
        </Text>
      </View>

      <List.Section>
        <List.Subheader>Appearance</List.Subheader>
        <List.Item
          title="Dark Mode"
          left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
          right={() => (
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
            />
          )}
        />
      </List.Section>

      {__DEV__ && (
        <List.Section>
          <List.Subheader>Data Management</List.Subheader>
          <List.Item
            title="Clear All Data"
            description="This will reset all your saved data"
            left={(props) => <List.Icon {...props} icon="delete" />}
            right={() => (
              <Button
                mode="contained-tonal"
                onPress={promptClearStorage}
                textColor={paperTheme.colors.error}
              >
                Clear
              </Button>
            )}
          />
        </List.Section>
      )}
    </View>
  );
}
