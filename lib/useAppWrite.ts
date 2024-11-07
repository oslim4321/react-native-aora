import { useEffect, useState } from "react";
import { getAllPosts } from "./appwrite";

export const useAppWrite = (fn: any) => {
  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const fetchData = async () => {
    setisLoading(true);
    try {
      const data = await fn();
      setData(data as any);
    } catch (error) {
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refresh = () => fetchData();
  return {
    data,
    isLoading,
    search,
    setSearch,
    refresh,
  };
};
