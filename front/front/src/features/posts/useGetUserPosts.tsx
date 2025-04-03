import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetUserPosts = () => {
  const userQuery = useQuery({
    queryKey: ["posts", "userPosts"],
    queryFn: async () => {
        const response = await axios.get('')
    },
  });
  return <div>useGetUserPosts</div>;
};

export default useGetUserPosts;
