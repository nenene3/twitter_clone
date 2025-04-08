import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
type Props = {
  postId: string;
};

const useGetCommentQuery = (props: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage,isPending } =
    useInfiniteQuery({
      queryKey: ["comments", props.postId],
      queryFn: async ({ pageParam = 1,signal }) => {
        const response = await axios.get(
          `/api/posts/${props.postId}/comments?page=${pageParam}`,
          { withCredentials: true ,signal}
        );
        //  await new Promise((res,req)=>{
        //   setTimeout(() => {
        //     res('')
        //   }, 40);
        //   req()
        // })
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

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage,isPending };
};

export default useGetCommentQuery;
