import React from 'react'
import useGetProfilePostQuery from './useGetProfilePostQuery'
import { useParams } from 'react-router'
import { IPost } from '@/types/Post'
import Post from '../posts/Post'
import List from '@/components/List'
import CreatePost from '../posts/CreatePost'
import { useAuth } from '@/context/AuthProvider'
import { Button } from '@/components/ui/button'
const UserProfile = () => {
    const {userId} = useParams()
    const {user} = useAuth()
    const {data,isError,isLoading,fetchNextPage,hasNextPage} = useGetProfilePostQuery({userId:userId ??  user!.id})

    if(isLoading){
        return <h1>loading </h1>
    }
    if(isError){
        return <h1>error </h1>
    }
    console.log(data)
  return (
    <div className=' container mx-auto'>
      <CreatePost />
      {data?.pages.length &&  <List items={data.pages.flatMap((page)=>page.posts)} renderItem={(post:IPost)=><Post key={post._id} post={post}/>}/>}
      {hasNextPage && <Button className='' onClick={()=>fetchNextPage()}>load more</Button>}
    </div>
  )


}

export default UserProfile