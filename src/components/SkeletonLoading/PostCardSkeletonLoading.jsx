import React from 'react';

function PostCardSkeletonLoading() {
  return (
    <div className="border relative border-x-0 border-b-0 border-teal-800 flex p-5 sm:p-5  flex-col animate-pulse">
      {/* Header section with avatar and placeholders */}
      <div className="flex gap-2 mb-4">
        <div className="w-11 h-10 rounded-full bg-gray-700"></div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex gap-2 w-3/4">
              <div className="w-24 h-4 rounded-md bg-gray-700"></div>
              <div className="w-12 h-4 rounded-md bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content placeholder */}
      <div className="w-full">
        <div className="w-4/5 h-6 rounded-md bg-gray-700 mb-2"></div>
        <div className="w-full h-64 rounded-md bg-gray-700"></div>
      </div>

      {/* Footer placeholder */}
      <div className="pl-2 mt-2 flex gap-2 items-center">
        <div className="w-8 h-8 rounded-md bg-gray-700"></div>
      </div>
    </div>
  );
}

export default PostCardSkeletonLoading;
