import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { PostCard, PostForm, PostsContainer } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../store/configSlice";
import { createSelector } from "reselect";

function MyPosts() {
  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  const getPosts = createSelector(
    state => state.config.posts,
    posts => posts?.filter((doc) => doc.userId === userData?.$id)
  )

  let posts = useSelector(getPosts);

  return (
    <PostsContainer>
    <div>
      {posts !== null &&
        posts?.map((post) => (
          <div key={post.$id} className="w-full">
            <PostCard {...post} />
          </div>
        ))}
    </div>
    </PostsContainer>
  );
}

export default MyPosts;
