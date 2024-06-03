import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { PostCard, PostForm, PostsContainer } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../store/configSlice";
import { createSelector } from "reselect";
import LoadingSpinner from "../components/animation/loader";


function MyPosts() {
  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  let posts = useSelector((state) => state.config.posts);



  console.log("posts", posts)

  if (posts === null && authStatus !== "false") {
    return (
      <>
            {authStatus && (
              <h1 className="text-white">
                <LoadingSpinner />
              </h1>
            )}
      </>
    );
  } else {
    return (
      <>
        {posts !== null &&
          posts?.map((post, index) => (
            <div key={post?.$id} 
            className="w-full">
            {post.userId === userData?.$id &&
              <PostCard {...post} idx={index} />
            }
            </div>
          ))}
      </>
    );
  }
}

export default MyPosts
