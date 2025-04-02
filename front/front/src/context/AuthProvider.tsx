import React, { createContext, useContext, useEffect, useState } from 'react'

type Props = {}

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  data:any
}


const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export const useAuth = () => {
    try{
        return useContext(AuthContext);
    }catch(e){
        throw new Error("useAuth must be used within an AuthProvider");
    }
};




const AuthProvider = ({children}:{children:React.ReactNode}) => {

    useEffect(()=>{
        const fetchUser = async ()=>{
            const response = await fetch("/api/auth/user")
            const data = await response.json()
            console.log(data)
        }
        fetchUser()
    },[])

  const [user, setUser] = useState<User | null>(null);
  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider