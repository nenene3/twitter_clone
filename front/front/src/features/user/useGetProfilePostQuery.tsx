import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetProfilePostQuery = ({ userId }: { userId: string | number }) => {
    // console.log(userId)
  const {data,isError,isLoading} = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
        const res = await axios.get(`/api/post/user/${userId}`,{withCredentials:true})
        return res.data
    },
    enabled: !!userId,
  });

return {data,isError,isLoading}
  
};

export default useGetProfilePostQuery;
