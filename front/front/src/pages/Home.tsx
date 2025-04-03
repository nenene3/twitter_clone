import React, { useEffect } from 'react'
import useGetPosts from '../features/posts/useGetPosts'

type Props = {}

const Home = (props: Props) => {
  const { data, isLoading, isError } = useGetPosts()
  console.log(data)
    // useEffect(()=>{
    //     const fetchPosts = async ()=>{
    //         const response = await fetch("/api/posts")
    //         const data = await response.json()
    //         console.log(data)
    //     }

    //     fetchPosts()
    // },[])
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error...</div>}
      {data?.map((post:any)=>(
        <div key={post._id}>
          <h1>{post.author.username}</h1>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}

export default Home