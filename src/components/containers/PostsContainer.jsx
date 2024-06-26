import React, { useState, useEffect, useCallback, useRef } from "react";
import { Logo, PostForm, UserSideBar } from "..";
import { addPosts, setPage } from "../../store/configSlice";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";

function PostsContainer({ children }) {
  // State variables for loading and pagination
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false); // Ref to keep track of loading state

  // Redux hooks to dispatch actions and access state
  const dispatch = useDispatch();
  const page = useSelector((state) => state.config.page);
  const posts = useSelector((state) => state.config.posts);

  // Function to load more posts from the server
  const loadMorePosts = useCallback(() => {
    if (loadingRef.current || !hasMore) return; // Prevent multiple calls
    setLoading(true);
    loadingRef.current = true;

    appwriteService.getPosts(page)
      .then((newPosts) => {
        if (newPosts.length > 0) {
          dispatch(addPosts(newPosts));
          dispatch(setPage(page + 1)); // Increment page only if new posts are returned
        } else {
          setHasMore(false); // No more posts to load
        }
      })
      .catch((error) => {
        console.error("Error loading posts:", error);
      })
      .finally(() => {
        setLoading(false);
        loadingRef.current = false; // Reset loading state
      });
  }, [page, hasMore, dispatch]);

  // Effect to handle scrolling and load more posts when reaching the bottom
  useEffect(() => {
    const cont = document.getElementById("container");

    const handleScroll = () => {
      if (window.innerHeight + cont.scrollTop + 1 >= cont.scrollHeight && !loadingRef.current) {
        loadMorePosts();
      }
    };

    cont.addEventListener("scroll", handleScroll);

    return () => {
      cont.removeEventListener("scroll", handleScroll);
    };
  }, [loadMorePosts]);

  // JSX structure of the component
  return (
    <div className="overflow-y-scroll h-full mb-auto hide-scrollbar text-white w-full flex">
      {/* Main container for posts and sidebar */}
      <div
        id="container"
        className="xs:border-r border-teal-800 h-screen overflow-y-scroll custom-scrollbar scroll-smooth flex flex-col min-h-screen w-full xs:w-[400px] sm:w-[350px] md:w-[450px] lg:w-[500px]"
      >
        {/* Content wrapper */}
        <div className="mt-4 sm:mt-14 mb-28">
          {/* Logo for mobile view */}
          <div className="pl-5 block sm:hidden">
            <Logo />
          </div>
          {/* Form to create new posts */}
          <PostForm />
          {/* Posts header */}
          {children === undefined ? null : (
            <div className="text-white text-center sticky top-0 z-30 border-b border-teal-800 bg-black-rgba backdrop-blur-[3px] py-4">
              <h3>Posts</h3>
            </div>
          )}
          {/* Posts content */}
          {children}
          {/* Loading spinner or end message */}
          <div className="text-white flex justify-center py-5">
            {loading && <div className="spinner w-10 h-10"></div>}
            {!hasMore && !loading && <p>No more posts</p>}
          </div>
        </div>
      </div>
      {/* User sidebar */}
      <UserSideBar />
    </div>
  );
}

export default PostsContainer;
