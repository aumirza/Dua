import { toTitleCase } from "@/utils/case";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { List, Text, useTheme } from "react-native-paper";
import { MD3Theme } from "react-native-paper/lib/typescript/types";

export function DuaListItem({
  isSelected,
  title,
  index,
  onPress,
  onLongPress,
}: {
  isSelected?: Boolean;
  title: string;
  index: number;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const theme = useTheme();
  const styles = makeStyle(theme);
  return (
    <Pressable
      onLongPress={onLongPress}
      onPress={onPress}
      style={styles.pressable}
    >
      <View style={styles.fullWidth}>
        <View style={[styles.listItem, isSelected && styles.selectedDua]}>
          <List.Item
            style={styles.item}
            title={toTitleCase(title)}
            titleNumberOfLines={2}
            titleStyle={styles.title}
            left={(props) => (
              <View {...props} style={styles.numberContainer}>
                <Text variant="titleMedium" style={styles.number}>
                  {index}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </Pressable>
  );
}

const makeStyle = (theme: MD3Theme) =>
  StyleSheet.create({
    numberContainer: {
      borderRadius: 25,
      backgroundColor: theme.colors.primary,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    number: {
      color: theme.colors.onPrimary,
    },
    selectedDua: {
      backgroundColor: theme.colors.secondaryContainer,
    },
    fullWidth: {
      width: "100%",
    },
    pressable: {
      width: "100%",
    },
    item: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outlineVariant,
    },
    title: {
      fontSize: 16,
      marginLeft: 8,
    },
    listItem: {
      width: "100%",
    },
  });
