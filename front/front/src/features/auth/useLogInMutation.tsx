import { useMutation } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { useQueryClient } from '@tanstack/react-query'

const UseLogInMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    onSuccess: (data) => {
      // console.log(data);
    },
    onError: (error) => {
      // console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    

    mutationFn: async (data: any) => {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
        { withCredentials: true }
      );
      return res.data;
    },
  });

  const handleLogIn = (data: { email: string; password: string }) => {
    mutation.mutate(data);
  };

  return { handleLogIn, mutation };
};

export default UseLogInMutation;
