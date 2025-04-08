import React from "react";
import useGetCommentQuery from "./useGetCommentQuery";
import Comment from "./Comment";
import List from "@/components/List";

type Props = {
  postId: string;
};

const CommentList = ({ postId }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage,isPending } = useGetCommentQuery({ postId });



  if(isPending){
    return <h2>loading</h2>
  }

  if (!data || data.pages.length === 0) {
    return <div>No comments found</div>;
  }

  


  return (
    <div className="mt-4">
        {data.pages.length ?
      <List
      items={data.pages.flatMap((page) => page.comments)}
      renderItem={(comment) => (
          <Comment key={comment._id} comment={comment} />
        )} 
        /> : <div>No comments found</div>
    }
      
      {hasNextPage && (
        <button
          className="text-blue-500 hover:underline mt-2"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading more..." : "Load more comments"}
        </button>
      )}
    </div>
  );
};

export default CommentList;
