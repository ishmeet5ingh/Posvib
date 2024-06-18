import React from "react";
import appwriteService from "../../appwrite/config";
import { Link } from "react-router-dom";
import LikeFeature from "../LikeFeature";


const Profile = ({ user }) => {
  return (
    <div className="bg-black xmd:w-[700px] md:border-r md:border-teal-500 text-white min-h-screen pb-20 sm:pb-5">
      {/* User Information */}
      <div className="flex pt-8 pb-5 px-5 md:px-8 items-start xml:border-r">
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
      <div className="w-full h-14 border-y border-teal-500 "></div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2">
        {user?.posts.map((post) => (
          <Link
            to={`/post/${post.$id}`}
            key={post.$id}
            style={{
              backgroundImage: post.featuredImage
                ? `url(${appwriteService.getFilePreview(post?.featuredImage)})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className={`relative group border border-gray-800 overflow-hidden `}
          >
            {/* Post Image */}
            {post.featuredImage  ? (
              <div>
              <img
                src={appwriteService.getFilePreview(post?.featuredImage)}
                alt="Post featured"
                className="w-full h-full opacity-0 "
              />
              </div>
              
            ) : <div className=" bg-[#1b1a1a] text-sm h-full w-full text-center flex justify-center items-center  text-white"><p className="px-4 py-12 text-start">{post.content}</p></div> }
            {/* Blurred background and LikeFeature on hover */}
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <LikeFeature likes={post.likes} postId={post.$id} currentUserData={user} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profile;