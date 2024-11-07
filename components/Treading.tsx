import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  posts: { id: number }[];
};
const Treading = ({ posts }: Props) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item: { id: number }) => item.$id}
      renderItem={({ item }) => (
        <Text className="text-3xl  text-white">{item.id}</Text>
      )}
      horizontal
    />
  );
};

export default Treading;
