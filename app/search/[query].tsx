import { FlatList, ListRenderItemInfo, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { useAppWrite } from "@/lib/useAppWrite";
import { videoType } from "@/shared/type";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";
import { searchPosts } from "@/lib/appwrite";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refresh } = useAppWrite(() =>
    searchPosts(query as string)
  );

  useEffect(() => {
    refresh();
  }, [query]);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }: ListRenderItemInfo<videoType>) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold  text-white">{query}</Text>

            <View className="mt-6 mb-8"></View>
            {/* search */}
            <SearchInput initialQuery={query as string} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos found"
            subtitle="No Videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
