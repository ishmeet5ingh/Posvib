import React, { useEffect } from "react";
import { PostCard, PostCardSkeletonLoading, PostsContainer } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllReduxPost, setReduxPosts } from "../store/configSlice";
import configService from "../appwrite/config";

function Home() {
  const dispatch = useDispatch();

  // Redux state selectors
  const authStatus = useSelector((state) => state.auth.status);
  const posts = useSelector((state) => state.config.posts);

  useEffect(() => {
    console.log("hello")
    const fetchPosts = async () => {
      if (authStatus) {
        try {
          const postsData = await configService.getAppwritePosts(1);
          dispatch(setReduxPosts(postsData));
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      } else {
        dispatch(deleteAllReduxPost());
      }
    };

    fetchPosts();
  }, [authStatus, dispatch]);

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
          {posts !== null &&
            posts.map((post, index) => (
              <div key={post?.$id} className="w-full">
                <PostCard {...post} idx={index} />
              </div>
            ))}
        </PostsContainer>
      )}
    </>
  );
}

export default Home;
