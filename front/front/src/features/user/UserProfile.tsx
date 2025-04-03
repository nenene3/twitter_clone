import React from 'react'
import useGetProfilePostQuery from './useGetProfilePostQuery'
import { useParams } from 'react-router'


const UserProfile = () => {
    const all = useParams()
    console.log(all)
    const {data,isError,isLoading} = useGetProfilePostQuery({userId:all.userId || 0})

    if(isLoading){
        return <h1>loading </h1>
    }
    if(isError){
        return <h1>error </h1>
    }
  return (
    <div>
        {data?.map((e:any)=>{
            return (
                <h1>asdf {e.title}</h1>
            )
        })}

    </div>
  )


}

export default UserProfile