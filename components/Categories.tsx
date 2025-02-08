import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { fetchDuasCategories } from "@/services/ApiService";
import { gradients } from "@/constants/theme";

export function Categories() {
  const [refreshing, setRefreshing] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    setRefreshing(true);
    fetchDuasCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch(console.log)
      .finally(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => console.log("refresh")}
        />
      }
    >
      {categories.map((category, index) => (
        <Card key={category.id} style={styles.card}>
          <LinearGradient
            colors={gradients[index % gradients.length]}
            style={styles.cardBackground}
          >
            <View style={styles.overlay}>
              <Card.Content>
                <Text variant="titleLarge" style={styles.title}>
                  {category.name}
                </Text>
                <Text variant="bodyMedium" style={styles.description}>
                  {category.description}
                </Text>
              </Card.Content>
            </View>
          </LinearGradient>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    overflow: "hidden",
  },
  cardBackground: {
    height: 200,
    width: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontWeight: "bold",
  },
  description: {
    color: "white",
    opacity: 0.9,
  },
});
