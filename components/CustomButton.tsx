import { Text, TouchableOpacity } from "react-native";
type Props = {
  title: string;
  handlePress: () => void;
  containerStyle?: string;
  textStyle?: string;
  isLoading?: boolean;
};

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  isLoading,
  textStyle,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[64px] justify-center items-center ${containerStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={` font-psemibold ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
