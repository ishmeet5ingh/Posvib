import React, {useEffect, useState, useRef} from 'react'
import authService from '../../appwrite/auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setHide } from '../../store/hideSlice'
import { FaArrowLeft } from 'react-icons/fa'


function ChatHeader({
    name, 
    username, 
    imageUrl, 
    profilePicId
}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()


  useEffect(() => {
    return () => {
      dispatch(setHide(true));
    };
  }, [dispatch]);


  return (
    <div className='fixed bg-[#222121] sm:bg-transparent  sm:sticky top-0 px-2 py-2 w-full z-20 flex gap-2'>
    <button 
    className='  text-white ' 
    onClick={()=>navigate(-1)}><FaArrowLeft/></button>
    <Link
    to={`/user/${username}`} 
    className='flex gap-2 w-fit items-end'>
        <img 
        src={profilePicId ? authService.getFilePreview(profilePicId) : imageUrl}
        alt={`${name}`} 
        className='w-8 h-8 sm:w-9 sm:h-9 rounded-full'
        />
        <div className='flex flex-col  justify-end'>
            <p className='text-sm'>{name}</p>
            <p className='text-xs text-gray-400'>@{username}</p>
        </div>
    </Link>
        
    </div>
  )
}

export default ChatHeader