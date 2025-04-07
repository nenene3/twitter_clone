import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import useCreateCommentMutation from "./useCreateCommentMutation";
type Props = {
  postId: string;
};

const CommentPost = ({ postId }: Props) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");

  const {handleCreatePost,mutate} = useCreateCommentMutation({postId})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Basic validation
    if (!content.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    if (content.length > 280) {
      setError("Comment too long (max 280 characters)");
      return;
    }

    if(!title){
      return
    }
    try {

      console.log('asdfasdfasdfasdf')
      handleCreatePost(title,content)

      console.log("Submitting comment:", { content,title });
      // Reset form after successful submission
      setContent("");
      setError("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError("Failed to submit comment");
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card
      className="p-4 bg-transparent transition-colors border-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/20"
      onClick={handleCardClick}
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center  flex-col gap-2">
          <Input
            type="text"
            name="title"
            placeholder="title"
            className="w-full bg-transparent border-0 focus-visible:ring-blue-400"
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
          />
          <Textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setError("");
            }}
            onClick={(e) => e.stopPropagation()}
            placeholder="Write your comment..."
            className="min-h-[100px] resize-none bg-transparent focus-visible:ring-blue-400 border-0 group-hover:bg-transparent"
          />
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="default"
            className="rounded-full px-6"
            onClick={(e) => e.stopPropagation()}
          >
            Reply
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CommentPost;
