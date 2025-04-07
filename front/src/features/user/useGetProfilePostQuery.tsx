import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetProfilePostQuery = ({ userId }: { userId: string | number }) => {
  const { data, isError, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["posts", userId],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get(`/api/posts/user/${userId}?page=${pageParam}`, { withCredentials: true });
      return res.data;
    },
    enabled: !!userId, 
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.hasnext) {
        return pages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  return { data, isError, isLoading, fetchNextPage, hasNextPage };
};

export default useGetProfilePostQuery;
