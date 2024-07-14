import { Link } from "expo-router";
import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { List, Text } from "react-native-paper";

const DuasList: FC<{ duaList: DuaType[] | duaListItem[] }> = ({ duaList }) => {
  return (
    <List.Section>
      {duaList.map((dua, i) => (
        <Link
          key={dua.DuaID + dua.ShortDescription}
          href={{ pathname: "/dua/" + dua.DuaID }}
          // href={{ pathname: "/dua/[duaID]", params: { duaId: dua.DuaID } }}
          asChild
        >
          <TouchableOpacity>
            <List.Item
              style={{
                paddingHorizontal: 10,
              }}
              title={dua.ShortDescription}
              left={(props) => (
                <View
                  {...props}
                  style={{
                    borderRadius: 100,
                    backgroundColor: "primary",
                    width: 50,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text variant="titleMedium">{i + 1}</Text>
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
