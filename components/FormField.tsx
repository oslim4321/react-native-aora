import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

type Props = {
  title: string;
  value: string;
  handleChangeText: (e: any) => void;
  otherStyle?: string;
  keyboardType?: string;
  placeholder?: string;
};

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyle,
  placeholder,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyle}`}>
      <Text className="text-base text-gray-100 font-pmedium capitalize">
        {title}
      </Text>
      <View className="border border-black-200 bg-black-100 rounded-2xl h-16 w-full px-4 focus:border-secondary  flex-row items-center">
        <TextInput
          value={value}
          onChangeText={handleChangeText}
          className="flex-1 text-white text-base font-bold"
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          secureTextEntry={title == "password" && !showPassword}
        />
        {title === "password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="flex items-center"
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
