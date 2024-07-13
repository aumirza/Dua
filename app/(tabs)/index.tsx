import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <Text>Index</Text>
    </SafeAreaView>
  );
}
