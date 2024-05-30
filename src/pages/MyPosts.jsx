import React, { useState, useEffect } from "react";
import { PostCard, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../store/configSlice";

function MyPosts() {
  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authStatus) {
      appwriteService.getPosts([]).then((posts) => {
        if (posts) {
          dispatch(setPosts(posts.documents));
        }
      });
    }
  }, []);

  let posts = useSelector((state) =>
    state.config.posts?.filter((doc) => doc.userId === userData?.$id)
  );

  console.l;

  return (
    <>
      {posts !== null &&
        posts?.map((post) => (
          <div key={post.$id} className="w-full">
            <PostCard {...post} />
          </div>
        ))}
    </>
  );
}

export default MyPosts;
