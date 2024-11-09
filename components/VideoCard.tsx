import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { videoType } from "@/shared/type";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({ video }: { video: videoType }) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: video.creator.avatar }}
              className="w-full h-full rounded-lg "
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {video.title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {video.creator.userName}
            </Text>
          </View>
        </View>

        <View className="pt-2 ">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video.video + ".mp4" }}
          style={{
            width: 100,
            height: 15,
            borderRadius: 1,
            marginTop: 0.74,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status: any) => {
            if (status.isLoaded && status.didJustFinish) {
              setPlay(false);
            } else if (!status.isLoaded) {
              console.log("Video not loaded");
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: video.thumbnail }}
            className="w-full h-full rounded-lg"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}

      {/* <Text className="text-white text-2xl">{video.title}</Text> */}
    </View>
  );
};

export default VideoCard;
