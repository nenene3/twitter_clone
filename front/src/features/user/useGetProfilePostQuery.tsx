import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetProfilePostQuery = ({ userId }: { userId: string | number }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["posts", userId],
    queryFn: async () => {
      const res = await axios.get(`/api/posts/user/${userId}`, { withCredentials: true });
      return res.data;
    },
    enabled: !!userId, 
  });

  return { data, isError, isLoading };
};

export default useGetProfilePostQuery;
