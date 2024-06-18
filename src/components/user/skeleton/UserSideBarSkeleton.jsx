import React from 'react';

function UserSideBarSkeleton() {
  return (
    <div className="flex items-center mb-4">
      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full mr-2 shimmer shimmer-bg"></div>
      <div className="flex-1">
        <div className="h-4 md:h-5 rounded w-24 mb-1 shimmer shimmer-bg"></div>
        <div className="h-3 rounded w-16 shimmer shimmer-bg"></div>
      </div>
    </div>
  );
}

export default UserSideBarSkeleton;
