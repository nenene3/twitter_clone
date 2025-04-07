import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
type Props = {
  postId: string;
};

const useGetCommentQuery = (props: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comments", props.postId],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await axios.get(
          `/api/posts/${props.postId}/comments?page=${pageParam}`,
          { withCredentials: true }
        );
        console.log(response.data);
        return response.data;
      },
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.hasnext) {
          return pages.length + 1;
        }
        return undefined;
      },
      initialPageParam: 1,
      enabled: !!props.postId,
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage };
};

export default useGetCommentQuery;
