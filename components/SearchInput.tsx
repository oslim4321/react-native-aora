import { View, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery }: { initialQuery?: string }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);
  console.log(pathname, "pathname");

  return (
    <View className="border border-black-200 bg-black-100 rounded-2xl h-16 w-full px-4 focus:border-secondary  flex-row items-center space-x-4">
      <TextInput
        value={query}
        onChangeText={(e) => setQuery(e)}
        className="flex-1 text-white text-base font-bold  mt-0.5 font-pregular"
        placeholder={"Search for a video topic "}
        placeholderTextColor={"#CDCDE0"}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("please input something to search");
          }
          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-6 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
