import {
  FlatList,
  Image,
  ListRenderItemInfo,
  RefreshControl,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Treading from "@/components/Treading";
import EmptyState from "@/components/EmptyState";
import { useAppWrite } from "@/lib/useAppWrite";
import { getAllPosts } from "@/lib/appwrite";
import { videoType } from "@/shared/type";
import VideoCard from "@/components/VideoCard";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, isLoading, search, refresh } = useAppWrite(getAllPosts);

  const onRefresh = async () => {
    // recall video if new video append
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }: ListRenderItemInfo<videoType>) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-x-4">
            <View className="justify-between items-start flex-row">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold  text-white">
                  Oslim
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* search */}
            <SearchInput value={search} handleChangeText={() => 2 + 2} />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100">Latest Videos</Text>
              <Treading
                posts={[
                  {
                    id: 1,
                  },
                  {
                    id: 2,
                  },
                  {
                    id: 3,
                  },
                ]}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
