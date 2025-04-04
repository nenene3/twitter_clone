import React from 'react'
import { IPost } from '../../types/Post'
import { Link } from 'react-router'
import { MessageCircle, Heart, Repeat, Share } from 'lucide-react'

type Props = {
  post: IPost
}

const Post = ({ post }: Props) => {
  const { author } = post
  const date = new Date(post.createdAt)
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition cursor-pointer">
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">{author.username.charAt(0)}</div>
        </div>
        <div className="flex-1">
          {/* Header with user info */}
          <div className="flex items-center">
            <span className="font-bold hover:underline text-gray-900 dark:text-gray-100">{author.username}</span>
            <span className="text-gray-500 dark:text-gray-400 mx-1">·</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">{formattedDate}</span>
          </div>
          
          {/* Content */}
          <div className="mt-1">
            <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100">{post.title}</h1>
            <p className="text-gray-800 dark:text-gray-200 mt-1">{post.content}</p>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-between mt-3 max-w-md text-gray-500 dark:text-gray-400">
            <div className="flex items-center group">
              <div className="p-2 rounded-full group-hover:bg-blue-100 group-hover:text-blue-500 dark:group-hover:bg-blue-900/40 dark:group-hover:text-blue-400">
                <MessageCircle size={18} />
              </div>
            </div>
            <div className="flex items-center group">
              <div className="p-2 rounded-full group-hover:bg-green-100 group-hover:text-green-500 dark:group-hover:bg-green-900/40 dark:group-hover:text-green-400">
                <Repeat size={18} />
              </div>
            </div>
            <div className="flex items-center group">
              <div className="p-2 rounded-full group-hover:bg-red-100 group-hover:text-red-500 dark:group-hover:bg-red-900/40 dark:group-hover:text-red-400">
                <Heart size={18} />
              </div>
            </div>
            <div className="flex items-center group">
              <div className="p-2 rounded-full group-hover:bg-blue-100 group-hover:text-blue-500 dark:group-hover:bg-blue-900/40 dark:group-hover:text-blue-400">
                <Share size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post