import useGetUserQuery from "@/features/auth/useGetUserQuery";
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  data: any;
}

const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  isError: boolean;
}>({
  user: null,
  setUser: () => {},
  isLoading: false,
  isError: false,
});

export const useAuth = () => {
  try {
    return useContext(AuthContext);
  } catch (e) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const { data, isLoading, isFetching, isError } = useGetUserQuery();
  console.log(data);
  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (data) {
      setUser(data);
    } else {
      setUser(null);
    }
  }, [data,isLoading]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, isError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
