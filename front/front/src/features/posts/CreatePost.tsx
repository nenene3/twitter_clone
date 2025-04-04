import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthProvider";
import useCreatePostMutation from "./useCreatePostMutation";


export default function PostForm() {
  const { user } = useAuth();
  const {handleSubmit:handleCreatePost} = useCreatePostMutation()
  const [formData, setState] = useState({
    title: "",
    content: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setState({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    handleCreatePost(formData)
    console.log("Form submitted:", formData);
  };

  const navigate = useNavigate();
  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col rounded-lg bg-white border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center p-3 border-b border-gray-200">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full mr-4 text-gray-700 hover:bg-gray-100"
          onClick={handleReturn}
        >
          <ArrowLeft size={20} />
        </Button>
        <h2 className="text-lg font-semibold">New Post</h2>
      </div>

      {/* Post Form */}
      <div className="flex p-4">
        <div className="mr-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user?.username}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <span className="text-sm font-bold">
                {user?.username?.charAt(0)}
              </span>
            )}
          </div>
        </div>

        <form className="flex-1 flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title (optional)"
            className="w-full px-2 py-1 mb-2 text-lg focus:outline-none text-gray-800"
            onChange={handleChange}
            value={formData.title}
          />
          <textarea
            name="content"
            placeholder="What's happening?"
            className="w-full px-2 py-1 mb-4 text-lg focus:outline-none resize-none min-h-24 text-gray-800"
            onChange={handleChange}
            value={formData.content}
          />

          {/* Twitter divider */}
          <div className="border-b border-gray-200 mb-3"></div>

          {/* Footer */}
          <div className="flex justify-between items-center">
            <div>{/* Optional icons for media, polls, etc. */}</div>
            <Button
              type="submit"
              className="rounded-full bg-blue-500 hover:bg-blue-600 px-4 py-2 font-bold"
            >
              Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
