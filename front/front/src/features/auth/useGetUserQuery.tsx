import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetUserQuery = () => {
  const userQuery = useQuery({
    queryFn: async () => {
      const res = await axios.get("/api/auth/currentuser");
      return res.data;
    },
    queryKey: ["auth"],
  });
  return userQuery;
};

export default useGetUserQuery;
