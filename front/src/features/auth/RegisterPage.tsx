import React, { useState } from "react";
import useRegisterMutation from "./useRegisterMutation";

type Props = {};

const RegisterPage = (props: Props) => {
  const { handleRegister } = useRegisterMutation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  return (
    <div className="container mx-auto">
      <form
        onSubmit={(e) => {
            e.preventDefault()
          handleRegister(formData as {email:string,password:string,username:string});
        }}
      >
        <input type="text" placeholder="username" onChange={(e)=>{setFormData({...formData,username:e.target.value})}} />
        <input type="email" placeholder="email" onChange={(e)=>{setFormData({...formData,email:e.target.value})}} />
        <input type="password" placeholder="password" onChange={(e)=>{setFormData({...formData,password:e.target.value})}} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
