import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { IPost } from "@/types/Post";
import { useQueryClient } from "@tanstack/react-query";

const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  const { isError, isSuccess, error, data, mutate } = useMutation({
    mutationFn: async (newPost: any) => {
      return axios.post("/api/posts", newPost, { withCredentials: true });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const handleSubmit = (newPost: any) => {
    mutate(newPost);
  };

  return { isError, isSuccess, error, data, mutate ,handleSubmit};
};

export default useCreatePostMutation;
