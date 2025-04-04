import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthProvider';
import { useNavigate } from 'react-router';
import useCreatePostMutation from './useCreatePostMutation';
export default function PostForm() {
  const {isError, isSuccess, error, data, mutate,handleSubmit:handleCreatePost} = useCreatePostMutation()
  const [formData, setState] = useState({
    title: '',
    content: ''
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    handleCreatePost(formData)
  };

  const {user} = useAuth()
  const navigate = useNavigate()
  function handleReturn(){
    navigate(-1)
  }

  return (
    <div className="flex flex-col rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full mr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700" 
          onClick={handleReturn}
        >
          <ArrowLeft size={20} />
        </Button>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">New Post</h2>
      </div>
      
      {/* Post Form */}
      <div className="flex p-4">
        <div className="mr-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={user?.username} 
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <span className="text-sm font-bold dark:text-white">{user?.username?.charAt(0)}</span>
            )}
          </div>
        </div>
        
        <form className="flex-1 flex flex-col" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="title"
            placeholder="Title (optional)" 
            className="w-full px-2 py-1 mb-2 text-lg focus:outline-none text-gray-800 dark:text-gray-200 bg-transparent"
            onChange={handleChange}
            value={formData.title}
          />
          <textarea 
            name="content" 
            placeholder="What's happening?" 
            className="w-full px-2 py-1 mb-4 text-lg focus:outline-none resize-none min-h-24 text-gray-800 dark:text-gray-200 bg-transparent"
            onChange={handleChange}
            value={formData.content}
          />
          
          {/* Twitter divider */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-3"></div>
          
          {/* Footer */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-3 text-blue-500 dark:text-blue-400">
              {/* Optional icons for media, polls, etc. */}
            </div>
            <Button 
              type="submit" 
              className="rounded-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 py-2 font-bold text-white"
            >
              Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}