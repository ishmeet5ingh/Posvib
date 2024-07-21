import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import authService from '../../appwrite/auth'


function ChatUser({selectedUser}) {
    const currentUser = useSelector(state => state.users.currentUser)
    return (
        <div 
        className={`flex items-center w-full gap-1 xmd:gap-2`}>
        {/* user avatar */}
          <img
            src={selectedUser.profilePicId ? authService.getFilePreview(selectedUser.profilePicId) : selectedUser.imageUrl}
            alt={`${selectedUser.name}'s profile`}
            className="w-9 h-9 md:w-10 md:h-10 mr-1 md:mr-2 rounded-full"
          />
          {/* user Information */}
          <div>
            <p className="text-sm">{selectedUser?.name}</p>
            <p className="text-gray-400 text-sm">@{selectedUser?.username}</p>
          </div>
        </div>
      )
}

export default ChatUser