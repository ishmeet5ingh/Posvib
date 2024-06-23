import React from 'react';

function PostCardSkeletonLoading() {
  return (
    <div className="border relative border-x-0 border-b-0 border-teal-800 flex p-5 sm:p-5 flex-col shimmer">
      <div className="flex gap-2 mb-4">
        {/* User avatar */}
        <div className="w-11 h-10 rounded-full shimmer-bg"></div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex gap-2 w-3/4">
              {/* Name */}
              <div className=" w-24 h-4 rounded-md shimmer-bg"></div>
              {/* time duration */}
              <div className=" w-12 h-4 rounded-md shimmer-bg"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        {/* Post content */}
        <div className="w-4/5 h-6 rounded-md shimmer-bg mb-2"></div>
        {/* Post image */}
        <div className="w-full h-64 rounded-md shimmer-bg"></div>
      </div>

      <div className="pl-2 mt-2 flex gap-2 items-center">
        {/* Post like */}
        <div className="w-8 h-8 rounded-md shimmer-bg"></div>
      </div>
    </div>
  );
}

export default PostCardSkeletonLoading;
