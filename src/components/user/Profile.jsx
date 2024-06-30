import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import LikeFeature from "../post-card/LikeFeature";
import ProfileUserInformationSkeleton from "./skeleton/ProfileUserInformationSkeleton";
import {useFollow} from "../../hooks";

const Profile = ({ user }) => {
  const {
    following,
    currentUserData,
    loading,
    followersCount,
    handleFollow,
  } = useFollow(user);

  return (
    <div className="md:border-r md:border-teal-500 text-white min-h-screen pb-20 sm:pb-5 md:w-11/12 xmd:w-10/12 xl:w-9/12">
      {!user ? (
        <ProfileUserInformationSkeleton />
      ) : (
        <>
          {/* User Profile Header */}
          <h2 className="xmd:text-2xl border-t w-full border-b border-teal-700 pt-4 px-5 md:px-8 text-xl font-medium">
            {user?.name}
          </h2>
          <div className="flex py-4 px-5 md:px-8 items-start">
            {/* User Avatar and Information */}
            <div>
              <img
                src={user?.imageUrl}
                alt={`${user?.name}'s profile`}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mr-8 mb-4"
              />
              <p className="text-gray-400">@{user?.username}</p>
            </div>
            {/* User Stats and Follow Button */}
            <div className="w-full flex flex-col justify-evenly items-center">
              <div className="w-full flex justify-evenly py-6 sm:py-9">
                <div className="text-center">
                  <p>{user?.posts?.length}</p>
                  <p>posts</p>
                </div>
                <Link to={`followers`} className="text-center">
                  <p>{followersCount}</p>
                  <p>followers</p>
                </Link>
                <Link to={`following`} className="text-center">
                  <p>{user?.following?.length}</p>
                  <p>following</p>
                </Link>
              </div>
              {/* Follow/Unfollow Button */}
              {user?.$id !== currentUserData?.$id && !loading ? (
                <button
                  onClick={handleFollow}
                  className={`w-2/5 py-1 xmd:w-2/4 rounded-lg ${
                    following ? "bg-gray-800" : "bg-blue-700"
                  }`}
                >
                  {following ? "Unfollow" : "Follow"}
                </button>
              ) : null}
            </div>
          </div>
        </>
      )}

      {/* User Posts */}
      <div className="w-full h-14 border-y border-teal-500"></div>
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
            className="relative group border border-gray-800 overflow-hidden"
          >
            {/* Post Image or Text */}
            {post.featuredImage ? (
              <div>
                <img
                  src={appwriteService.getFilePreview(post?.featuredImage)}
                  alt="Post featured"
                  className="w-full h-full opacity-0"
                />
              </div>
            ) : (
              <div className="bg-[#1b1a1a] text-sm h-full w-full text-center flex justify-center items-center text-white">
                <p className="px-4 py-12 text-start">{post.content}</p>
              </div>
            )}

            {/* Blurred background and LikeFeature on hover */}
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <LikeFeature
                likes={post.likes}
                postId={post.$id}
                currentUserData={user}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profile;
