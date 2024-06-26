import React from 'react';

function UserSideBarSkeleton() {
  return (
    <div className="flex items-center justify-between mb-6 px-3 w-full animate-pulse flex-col gap-2">
    {/* Placeholder for avatar */}
    <div className='flex'>
    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full  mr-1 md:mr-2 shimmer-bg"></div>
    {/* Placeholder for user information */}
    <div className="flex-1">
      <div className="shimmer-bg h-3 md:h-4 rounded w-16 mb-1"></div>
      <div className="shimmer-bg h-3 md:h-4 rounded w-20"></div>
    </div>
    </div>
    {/* Placeholder for follow button */}
    <div className="shimmer-bg w-full h-5 md:h-6 bg-gray-800 rounded-lg ml-3"></div>
  </div>
  );
}

export default UserSideBarSkeleton;
