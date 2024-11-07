import { Image, Text, View } from "react-native";
import { images } from "@/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

type Props = {
  title: string;
  subtitle: string;
};

const EmptyState = ({ title, subtitle }: Props) => {
  return (
    <View className="justify-center items-center px-3">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      <Text className="text-2xl font-psemibold text-white">{title}</Text>

      <CustomButton
        title="Create a Video"
        handlePress={() => router.push("/create")}
        containerStyle="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
