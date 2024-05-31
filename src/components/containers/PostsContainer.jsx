import React from "react";
import PostForm from "../Post-Form/PostForm";


function PostsContainer({children}) {
  return (
      <div className=" h-screen overflow-y-scroll hide-scrollbar flex flex-col min-h-screen border-r border-teal-800 w-full sm:w-96 md:w-[500px] ">
        <div className="border-b my-16  border-teal-800">
          <PostForm/>
          <div className="text-white text-center sticky top-0 z-50 bg-black-rgba backdrop-blur-[3px] border-y border-teal-800 py-4">
            <h3 >Posts</h3>
          </div>
          {children}
        </div>
      </div>
  );
}

export default PostsContainer;
