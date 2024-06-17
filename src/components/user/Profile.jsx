import React from "react";
import appwriteService from "../../appwrite/config";
import { Link } from "react-router-dom";

const Profile = ({ user }) => {

  return (
    <div className="bg-black p-10 text-white min-h-screen pb-20 sm:pb-0">
      {/* User Information */}
      <div className="flex items-start  mb-8">
        <img
          src={user?.imageUrl}
          alt={`${user?.name}'s profile`}
          className="w-20 h-20 sm:w-28 sm:h-28 rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-gray-400">@{user?.username}</p>
        </div>
      </div>

      {/* Posts Grid */}
      <h3 className="text-xl font-semibold mb-4">Posts</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {user?.posts?.map((post) => (
          <Link to={`/post/${post.$id}`} key={post.$id} className="bg-gray-800 p-2 rounded-lg">
            {/* Post Image */}
            {post.featuredImage && (
              <img
                src={appwriteService.getFilePreview(post?.featuredImage)}
                alt="Post featured"
                className="w-full rounded-lg mb-2"
              />
            )}
          
            <p className={``}>{post.content}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profile;
