import React, { useEffect } from 'react'

type Props = {}

const Home = (props: Props) => {
    useEffect(()=>{
        const fetchPosts = async ()=>{
            const response = await fetch("/api/posts")
            const data = await response.json()
            console.log(data)
        }
        fetchPosts()
    },[])
  return (
    <div>Home</div>
  )
}

export default Home