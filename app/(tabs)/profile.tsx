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

import EmptyState from "@/components/EmptyState";
import { useAppWrite } from "@/lib/useAppWrite";
import { getAllPosts, getLatestPosts, getUserPosts } from "@/lib/appwrite";
import { videoType } from "@/shared/type";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";

const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useGlobalContext();
  const { data: posts, refresh } = useAppWrite(() =>
    getUserPosts(user?.id ?? "")
  );

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
          <View className="my-6 px-4 space-x-4 ">
            <View className="justify-center items-center">
              <Text className="font-pmedium text-2xl text-white ">
                {user?.userName}
              </Text>
              <View className="flex-1 flex-row gap-x-10 justify-between mt-4">
                <View className="justify-center items-center">
                  <Text className="text-2xl font-psemibold  text-white">
                    {posts.length}
                  </Text>
                  <Text className="text-sm font-psemibold  text-gray-50">
                    Posts
                  </Text>
                </View>
                <View className="justify-center items-center">
                  <Text className="text-2xl font-psemibold  text-white">
                    12k
                  </Text>
                  <Text className="text-sm font-psemibold  text-gray-50">
                    Views
                  </Text>
                </View>
              </View>
            </View>

            {/* search */}
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

export default Profile;
