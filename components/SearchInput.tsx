import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

type Props = {
  value: string;
  handleChangeText: (e: any) => void;
  keyboardType?: string;
  placeholder?: string;
};

const SearchInput = ({ value, handleChangeText, placeholder }: Props) => {
  return (
    <View className="border border-black-200 bg-black-100 rounded-2xl h-16 w-full px-4 focus:border-secondary  flex-row items-center space-x-4">
      <TextInput
        value={value}
        onChangeText={handleChangeText}
        className="flex-1 text-white text-base font-bold  mt-0.5 font-pregular"
        placeholder={"Search "}
        placeholderTextColor={"#7b7b8b"}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-6 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
