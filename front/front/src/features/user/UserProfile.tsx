import React from 'react'
import useGetProfilePostQuery from './useGetProfilePostQuery'
import { useParams } from 'react-router'
import { IPost } from '@/types/Post'
import Post from '../posts/Post'
import List from '@/components/List'


const UserProfile = () => {
    const {userId} = useParams()
    
    const {data,isError,isLoading} = useGetProfilePostQuery({userId:userId || 0})

    if(isLoading){
        return <h1>loading </h1>
    }
    if(isError){
        return <h1>error </h1>
    }
  return (
    <div className=' container mx-auto'>
        <List items={data} renderItem={(post:IPost)=><Post key={post._id} post={post}/>}/>
    </div>
  )


}

export default UserProfile