import React, { useEffect } from "react";
import {PostCard, PostCardSkeletonLoading, PostsContainer} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllPost } from "../store/configSlice";

function Home() {
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.config.posts);

  useEffect(() => {
    if (!authStatus) {
      dispatch(deleteAllPost());
    }
  }, [authStatus]);

  return (
    <>
      {!authStatus && posts === null ? (
        <div className="sm:pl-28 min-h-screen flex justify-center sm:justify-start pt-28 sm:text-start">
          <h1 className="text-2xl font-bold text-white">Login to read posts</h1>
        </div>
      ) : (
        <PostsContainer>
          {authStatus &&
            posts === null &&
            [1, 2, 3, 4, 5]?.map((_, index) => (
              <div key={index} className="w-full">
                <PostCardSkeletonLoading />
              </div>
            ))}
            <div >
          {posts !== null &&
            posts.map((post, index) => (
              <div key={post?.$id} className="w-full">
                <PostCard {...post} idx={index} />
              </div>
            ))}
            </div>
        </PostsContainer>
      )}
    </>
  );
  // }
}

export default Home;
