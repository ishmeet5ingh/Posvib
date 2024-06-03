import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { PostCard, PostCardSkeletonLoading } from "../components";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import { setPosts, deleteAllPost } from "../store/configSlice";
import { Circles } from "react-loader-spinner";
import LoadingSpinner from "../components/animation/loader";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  let posts = useSelector((state) => state.config.posts);
  console.log(posts);

  useEffect(() => {
    if (!authStatus) {
      dispatch(deleteAllPost());
    }
  }, [authStatus]);

 
  return (
    <>
      {posts !== null ? (
        posts.map((post, index) => (
          <div key={post?.$id} className="w-full">
            <PostCard {...post} idx={index} />
          </div>
        ))
      ) : authStatus ? (
        [1, 2, 3, 4]?.map((_, index) => (
          <div key={index} className="w-full">
            <PostCardSkeletonLoading />
          </div>
        ))
      ) : (
        <div className="px-10 pt-14 min-h-screen text-center">
          <h1 className="text-2xl font-bold text-white">Login to read posts</h1>
        </div>
      )}
    </>
  );
  // }
}

export default Home;
