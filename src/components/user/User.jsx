import React from 'react'
import { Link } from 'react-router-dom'
import {useFollow}from '../../hooks'
import authService from '../../appwrite/auth'

function User({user, classname, flexCol, text, imageClasses}) {

    const {following, handleFollow, loading, currentUserData} = useFollow(user)
    
  return (
    <div className={`flex items-center justify-between mb-6 px-3 w-full ${flexCol}`}>
    <Link to={`/user/${user?.username}`} className={`flex ${classname} tems-center`}>
    {/* user avatar */}
      <img
        src={user.profilePicId ? authService.getFilePreview(user.profilePicId) : user.imageUrl}
        alt={`${user.name}'s profile`}
        className={`${imageClasses} rounded-full mr-1`}
      />
      {/* user Information */}
      <div >
        <p className={` ${text} `}>{user?.name}</p>
        <p className={`text-gray-400 ${text} `}>@{user?.username}</p>
      </div>
    </Link>
    {/* follow/unfollow button */}
    {user?.$id !== currentUserData?.$id && (
      <button
        onClick={handleFollow}
        className={`ml-3 py-1 px-2 ${text} ${classname} rounded-lg ${
          following ? "bg-gray-800" : "bg-blue-700"
        }`}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    )}
  </div>
  )
}

export default User