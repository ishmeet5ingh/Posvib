import React, { useState, useEffect, useCallback, useRef } from "react";
import { PostForm, UserSideBar } from "..";
import { addPosts, setPage } from "../../store/configSlice";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";

function PostsContainer({ children }) {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false); // Ref to keep track of loading state

  const dispatch = useDispatch();
  const page = useSelector(state => state.config.page);
  const posts = useSelector((state) => state.config.posts);

  const loadMorePosts = useCallback(() => {
    if (loadingRef.current || !hasMore) return; // Prevent multiple calls
    setLoading(true);
    loadingRef.current = true;

    appwriteService.getPosts(page)
      .then(newPosts => {
        if (newPosts.length > 0) {
          dispatch(addPosts(newPosts));
          dispatch(setPage(page + 1)); // Increment page only if new posts are returned
        } else {
          setHasMore(false); // No more posts to load
        }
      })
      .catch(error => {
        console.error("Error loading posts:", error);
      })
      .finally(() => {
        setLoading(false);
        loadingRef.current = false; // Reset loading state
      });
  }, [page, hasMore, dispatch]);

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

  return (
    <div className="overflow-y-scroll hide-scrollbar text-white w-full flex ">
    <div
      id="container"
      className=" xs:border-r border-teal-800 h-screen overflow-y-scroll hide-scrollbar flex flex-col min-h-screen w-full xs:w-[420px] sm:w-[350px] md:w-[450px] lg:w-[500px]"
    >
      <div className="mt-16 mb-28">
        <PostForm />
        {children === undefined ? null : (
          <div className="text-white text-center sticky top-0 z-50 border-b border-teal-800 bg-black-rgba backdrop-blur-[3px] py-4">
            <h3>Posts</h3>
          </div>
        )}
        {children}
        <div className="text-white flex justify-center py-5">
          {loading && <div className="spinner"></div>}
          {!hasMore && <p>No more posts</p>}
        </div>
      </div>
    </div>
      <UserSideBar/>
    </div>
  );
}

export default PostsContainer;
