import { Link } from "expo-router";
import React, { FC, useState, useEffect } from "react";
import { View, Pressable, StyleSheet, BackHandler } from "react-native";
import { List, Text, IconButton, useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { DuaListItem } from "./DuaListItem";

type DuasListProps = {
  duaList: IDuaBase[];
  selectionAction?: {
    icon: string;
    color?: string;
    onAction: (selectedIds: number[]) => void;
  };
};

export default function DuasList({ duaList, selectionAction }: DuasListProps) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  const handleLongPress = (id: number) => {
    if (!selectionMode) {
      setSelectionMode(true);
      setSelectedItems([id]);
    } else {
      handlePress(id);
    }
  };

  const handlePress = (id: number) => {
    if (selectionMode) {
      const newSelected = selectedItems.includes(id)
        ? selectedItems.filter((item) => item !== id)
        : [...selectedItems, id];

      setSelectedItems(newSelected);

      if (newSelected.length === 0) {
        setSelectionMode(false);
      }
    }
  };

  const exitSelectionMode = () => {
    setSelectionMode(false);
    setSelectedItems([]);
  };

  const handleItemPress = (id: number) => {
    if (selectionMode) {
      handlePress(id);
    }
  };

  const handleAction = () => {
    selectionAction?.onAction(selectedItems);
    exitSelectionMode();
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (selectionMode) {
          exitSelectionMode();
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [selectionMode]);

  return (
    <>
      {selectionMode && (
        <View style={styles.selectionHeader}>
          <Text variant="titleMedium">Selected: {selectedItems.length}</Text>
          <View style={styles.headerActions}>
            {selectionAction && (
              <IconButton
                icon={selectionAction.icon}
                iconColor={selectionAction.color}
                onPress={handleAction}
              />
            )}
            <IconButton icon="close" onPress={exitSelectionMode} />
          </View>
        </View>
      )}
      <List.Section style={styles.container}>
        {duaList.map((dua, i) =>
          selectionMode ? (
            <DuaListItem
              key={dua.DuaID}
              isSelected={selectedItems.includes(dua?.DuaID)}
              title={dua.ShortDescription}
              index={i + 1}
              onLongPress={() => handleLongPress(dua?.DuaID)}
              onPress={() => handleItemPress(dua?.DuaID)}
            />
          ) : (
            <Link key={dua.DuaID} href={`/dua/${dua.DuaID}`} asChild>
              <DuaListItem
                key={dua.DuaID}
                title={dua.ShortDescription}
                index={i + 1}
                onLongPress={() => handleLongPress(dua?.DuaID)}
                onPress={() => handleItemPress(dua?.DuaID)}
              />
            </Link>
          )
        )}
      </List.Section>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  selectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
});
