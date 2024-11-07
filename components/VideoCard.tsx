import { Text, View } from "react-native";
import React from "react";
import { videoType } from "@/shared/type";

const VideoCard = ({ video }: { video: videoType }) => {
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg"></View>
        </View>
      </View>

      <Text className="text-white text-2xl">{video.title}</Text>
    </View>
  );
};

export default VideoCard;
