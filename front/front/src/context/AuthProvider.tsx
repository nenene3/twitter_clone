import React, { createContext, useContext, useEffect, useState } from "react";
import useGetUserQuery from "@/features/auth/useGetUserQuery";
import { User } from "@/types/User";



interface AuthContextType {
  user: User | null;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isPending: false,
  isSuccess: false,
  isError: false,
  isAuthenticated: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data:user, isPending, isSuccess, isError } = useGetUserQuery();
  

  

  const isAuthenticated = isSuccess && !!user;

  return (
    <AuthContext.Provider
      value={{ user: user || null, isPending, isSuccess, isError, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
