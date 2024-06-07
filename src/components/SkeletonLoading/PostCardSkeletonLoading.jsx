import React from 'react';

function PostCardSkeletonLoading() {
  return (
    <div className="border relative border-x-0 border-b-0 border-teal-800 flex p-5 sm:p-5 lg:p-6 flex-col">
      <div className="flex gap-2">
        <div className="w-10 h-9 rounded-full bg-gray-700"></div>
        <div className="w-full">
          <div className="flex w-full justify-between">
            <div className="flex w-full gap-2 text-sm">
              <div className="w-24 h-4 rounded-md bg-gray-700"></div>
              <div className="w-12 h-4 rounded-md bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="pl-12 w-full">
        <div className="w-full h-6 rounded-md bg-gray-700 mb-2"></div>
        <div className="w-full h-52 rounded-md bg-gray-700"></div>
      </div>
    </div>
  );
}

export default PostCardSkeletonLoading;
