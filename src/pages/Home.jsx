import React, { useEffect } from "react";
import { Logo, PostCard, PostCardSkeletonLoading, PostsContainer } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllReduxPost, setReduxPosts } from "../store/configSlice";
import configService from "../appwrite/config";
import { Link } from "react-router-dom";


function Home() {
  const dispatch = useDispatch();

  const authStatus = useSelector((state) => state.auth.status);
  const posts = useSelector((state) => state.config.posts);

  useEffect(() => {
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
        <div className="min-h-screen"  >
        {<div className="sm:hidden pl-10 pt-8">
          <Logo/>
       </div> }
        <div 
        className="p-10 h-full  xmd:pr-44 flex flex-col items-start pt-14 sm:pt-28 sm:text-start gap-5">
       
          <p className="max-w-[500px] font-mono text-2xl tracking-wide text-white">Stay connected and share moments with the people who matter most on Posvib</p>
          <div className="flex gap-4">
          <Link to={`/login`} className="text-white py-2 px-4 rounded-md  text-xl bg-blue-800 hover:bg-blue-600 transition-all duration-200">Login</Link>
          <Link className="text-blue-100 bg-green-800 hover:bg-green-600 transition-all duration-200 py-2 px-4 rounded-md text-xl">Create Account </Link>
          </div>
        </div>
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
