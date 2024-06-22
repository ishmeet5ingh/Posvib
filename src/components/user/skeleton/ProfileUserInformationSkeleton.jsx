import React from 'react'

function ProfileUserInformationSkeleton() {
  return (
    <div>
      <div className=" w-full pt-5 md:pt-6 border-b border-teal-700">
        <div className=' rounded-lg mx-5 md:mx-8 h-6 shimmer-bg w-28'></div>
      </div>
      {/* User Information */}
      <div className="flex py-4 px-5 md:px-8 items-start shimmer">
        <div>
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-4 shimmer-bg"></div>
          <div className="shimmer-bg h-6 rounded-lg"></div>
        </div>
        <div className="w-full flex flex-col justify-evenly items-center">
          <div className="w-full flex justify-evenly py-6 sm:py-9">
            <div className="text-center flex flex-col items-center justify-center ">
              <p className='w-3 h-5 rounded-sm shimmer-bg'></p>
              <p>posts</p>
            </div>
            <div className="text-center flex flex-col items-center justify-center ">
              <p className='w-3 h-5 rounded-sm shimmer-bg'></p>
              <p>followers</p>
            </div>
            <div className="text-center flex flex-col items-center justify-center ">
              <p className='w-3 h-5 rounded-sm shimmer-bg'></p>
              <p>following</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileUserInformationSkeleton