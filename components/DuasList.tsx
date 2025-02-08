import { Link } from "expo-router";
import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { List, Text, useTheme } from "react-native-paper";

const DuasList: FC<{ duaList: DuaType[] | IDuaItem[] }> = ({ duaList }) => {
  const theme = useTheme();

  return (
    <List.Section>
      {duaList.map((dua, i) => (
        <Link
          key={dua.DuaID}
          href={{ pathname: "/dua/[duaId]", params: { duaId: dua.DuaID } }}
          asChild
        >
          <TouchableOpacity>
            <List.Item
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.outlineVariant,
              }}
              title={dua.ShortDescription}
              titleNumberOfLines={2}
              titleStyle={{
                fontSize: 16,
                marginLeft: 8,
              }}
              left={(props) => (
                <View
                  {...props}
                  style={{
                    borderRadius: 25,
                    backgroundColor: theme.colors.primaryContainer,
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    variant="titleMedium"
                    style={{ color: theme.colors.onPrimaryContainer }}
                  >
                    {i + 1}
                  </Text>
                </View>
              )}
            />
          </TouchableOpacity>
        </Link>
      ))}
    </List.Section>
  );
};

export default DuasList;
