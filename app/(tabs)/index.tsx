import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, Surface } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useStore } from "@/store/store";
import { fetchDuaOfTheDay } from "@/services/ApiService";

export default function HomeScreen() {
  const { memorized, bookmarks } = useStore();
  const [duaOfDay, setDuaOfDay] = useState<IDua>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchDuaOfTheDay()
      .then(setDuaOfDay)
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">Welcome to Dua App</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Your daily companion for prayers and remembrance
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <Surface style={styles.statCard}>
          <Text variant="headlineMedium">{memorized.length}</Text>
          <Text variant="labelMedium">Memorized</Text>
        </Surface>
        <Surface style={styles.statCard}>
          <Text variant="headlineMedium">{bookmarks.length}</Text>
          <Text variant="labelMedium">Saved</Text>
        </Surface>
      </View>

      <Card style={styles.featuredCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Dua of the Day
          </Text>
          {loading ? (
            <Text variant="bodyMedium" style={styles.arabicText}>
              Loading...
            </Text>
          ) : (
            <>
              <Text variant="bodyMedium" style={styles.arabicText}>
                {duaOfDay?.Script}
              </Text>
              <Text variant="bodyMedium" style={styles.translationText}>
                {duaOfDay?.Translation}
              </Text>
            </>
          )}
        </Card.Content>
      </Card>

      <View style={styles.quickActions}>
        <Link href="/duas" asChild>
          <Button mode="contained" style={styles.actionButton}>
            Browse All Duas
          </Button>
        </Link>
        <Link href="/bookmarks" asChild>
          <Button mode="outlined" style={styles.actionButton}>
            Saved Duas
          </Button>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  subtitle: {
    marginTop: 8,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    borderRadius: 12,
    elevation: 1,
  },
  featuredCard: {
    marginBottom: 24,
  },
  cardTitle: {
    marginBottom: 12,
  },
  arabicText: {
    fontSize: 22,
    textAlign: "center",
    marginVertical: 16,
    lineHeight: 36,
  },
  translationText: {
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 8,
  },
  quickActions: {
    gap: 12,
  },
  actionButton: {
    borderRadius: 8,
  },
});
