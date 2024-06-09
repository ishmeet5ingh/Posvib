import React, {useState, useEffect} from "react";
import { PostForm } from "..";

function PostsContainer({children}) {
  return (
      <div className="sm:border-r border-teal-800 h-screen overflow-y-scroll hide-scrollbar flex flex-col min-h-screen  w-full sm:w-96 md:w-[500px] ">
        <div className=" mt-16 mb-28 ">
          <PostForm/>
          {children === undefined ? null : (
          <div className="text-white text-center sticky top-0 z-50 border-b border-teal-800 bg-black-rgba backdrop-blur-[3px]  py-4">
            <h3 >Posts</h3>
          </div>
          )}
          {children}
        </div>
      </div>
  );
}

export default PostsContainer;
