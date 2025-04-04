import React, { useState } from "react";
import UseLogInMutation from "./useLogInMutation";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../context/AuthProvider";
type Props = {};

const LoginPage = (props: Props) => {
  const { handleLogIn, mutation } = UseLogInMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user} = useAuth()
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogIn({ email, password });
        }}
      >
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
      <button onClick={()=>{
        console.log(user)
      }}>user</button>
    </div>
  );
};

export default LoginPage;
