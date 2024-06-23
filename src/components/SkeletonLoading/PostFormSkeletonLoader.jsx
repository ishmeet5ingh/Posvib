// SkeletonLoader.js
import React from 'react';

function PostFormSkeletonLoader() {
  return (
    <>
      {/* current User avatar */}
      <div className="shimmer-bg rounded-full h-9 w-10 md:h-10 md:w-11"></div>
      <form className="w-full flex px-3 flex-wrap gap-2 justify-center">
        {/* input box skeleton */}
        <div className="flex w-full flex-col">
          <div className="border-b border-gray-700 w-full h-12 ">
          </div>
        </div>
        <div className="flex relative h-12 justify-between w-full items-center">
          <div className="flex gap-2">
            {/* image upload */}
            <div className="shimmer-bg rounded h-7 w-9"></div>
          </div>
          {/* submit buttopn */}
          <div className="shimmer-bg rounded-full h-8 w-14"></div>
        </div>
      </form>
    </>
  );
}

export default PostFormSkeletonLoader;
