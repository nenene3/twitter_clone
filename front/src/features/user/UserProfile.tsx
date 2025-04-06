import React from 'react'
import useGetProfilePostQuery from './useGetProfilePostQuery'
import { useParams } from 'react-router'
import { IPost } from '@/types/Post'
import Post from '../posts/Post'
import List from '@/components/List'
import CreatePost from '../posts/CreatePost'
import { useAuth } from '@/context/AuthProvider'
const UserProfile = () => {
    const {userId} = useParams()
    const {user} = useAuth()
    const {data:posts,isError,isLoading} = useGetProfilePostQuery({userId:userId ??  user!.id})

    if(isLoading){
        return <h1>loading </h1>
    }
    if(isError){
        return <h1>error </h1>
    }
  return (
    <div className=' container mx-auto'>
      <CreatePost />
      {posts?.length &&  <List items={posts} renderItem={(post:IPost)=><Post key={post._id} post={post}/>}/>}
    </div>
  )


}

export default UserProfile