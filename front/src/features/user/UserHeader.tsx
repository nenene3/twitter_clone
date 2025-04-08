import React from "react";
import { useAuth } from "@/context/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";

const UserHeader = () => {
  const { user } = useAuth();
  const { userId } = useParams();

  if (!user) return null;

  return (
    <div className="w-full border-b border-gray-700 ">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col space-y-4">
          {/* Cover Image  */}

          {/* <div className="h-32 w-full bg-gray-800 rounded-xl"></div> */}

          {/* Profile Info */}
          <div className="flex justify-between items-start px-4">
            <div className="flex flex-col space-y-2">
              <Avatar className="h-20 w-20 border-4 border-black">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback>
                  {user.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h2 className="text-xl font-bold">{user.username}</h2>
                <p className="text-gray-500">@{user.username}</p>
              </div>
            </div>

            {userId === user.id && (
              <Button variant="outline" className="rounded-full">
                Edit profile
              </Button>
            )}
          </div>

          {/* TODO: add later bio */}
          <div className="px-4">
            <p className="text-gray-300">
              bio 
            </p>
          </div>

          {/* Stats */}
          <div className="flex space-x-4 px-4 text-gray-500">
            <div className="flex items-center space-x-1">
              <span className="font-bold text-white">0</span>
              <span>Following</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-bold text-white">0</span>
              <span>Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
