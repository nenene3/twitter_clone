import React from 'react'
import { IPost } from '../../types/Post'
import { Link } from 'react-router'
import { MessageCircle } from 'lucide-react'
type Props = {
    post: IPost
}

const Post = ({post}: Props) => {
    const {author} = post
    const date = new Date(post.createdAt)
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    
  return (
    <div className=' border-2 border-gray-300 rounded-md p-4'>
        <div className='flex justify-between'>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold hover:underline cursor-pointer">{author.username}</span>
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-500 text-sm">{formattedDate}</span>
                </div>
              </div>
            </div>
        </div>
        <div className='mt-4'>
            <h1 className='text-2xl font-bold'>{post.title}</h1>
            <p className='text-gray-500'>{post.content}</p>
        </div>
        <MessageCircle/>
    </div>
  )
}

export default Post