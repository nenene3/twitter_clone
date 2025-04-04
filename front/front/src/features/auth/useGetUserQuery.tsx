import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../../types/User";
const useGetUserQuery = () => {
  const userQuery = useQuery({
    queryFn: async (): Promise<User> => {
      const res = await axios.get("/api/auth/currentuser");
      console.log(res.data)
      return res.data;
    },
    queryKey: ["auth"],
    
  });
  
  return userQuery;
};

export default useGetUserQuery;
