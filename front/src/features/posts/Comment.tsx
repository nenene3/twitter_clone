import { IUser } from '@/types/Post';
import React from 'react'

interface IComment {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;

  author: IUser;
}

type Props = {
  comment: IComment;
}

const Comment = ({ comment }: Props) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition" onClick={(e)=>{e.stopPropagation()}}>
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
            {comment.author.avatar ? (
              <img src={comment.author.avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                {comment.author.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-bold hover:underline text-gray-900 dark:text-gray-100">{comment.author.username}</span>
            <span className="text-gray-500 dark:text-gray-400 mx-1">·</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">Time ago</span>
          </div>
          <div className="mt-1 text-gray-800 dark:text-gray-200">
            <p>{comment.content}</p>
          </div>
          <div className="flex gap-4 mt-2 text-gray-500 dark:text-gray-400">
            <button className="hover:text-blue-500 flex items-center gap-1">
              <span className="text-sm">Reply</span>
            </button>
            <button className="hover:text-red-500 flex items-center gap-1">
              <span className="text-sm">Like</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment