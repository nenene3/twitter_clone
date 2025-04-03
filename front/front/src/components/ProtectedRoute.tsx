import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Navigate, Outlet } from 'react-router'
import useGetUserQuery from '../features/auth/useGetUserQuery'
type Props = {}

const ProtectedRoute = (props: Props) => {
  

  const {data:user,isLoading,isFetching,isError} = useGetUserQuery()
  if(isLoading){
    return <div>Loading...</div>
  }
  if(isError){
    return <div>Error...</div>
  }
  if(isFetching){
    return <div>Fetching...</div>
  }
  return (
    <div>
        {user ? <Outlet /> : <Navigate to="/login" />}
    </div>
  )
}

export default ProtectedRoute