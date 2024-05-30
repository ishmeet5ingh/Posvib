import React from 'react'
import PostForm from '../components/Post-Form/PostForm'

function AddPost() {
  return (
    <div className='min-h-screen bg-black border-r border-teal-800 sm:w-96 md:w-[500px] py-16'>
    <div className='border-b border-teal-800'>
      <PostForm/>
    </div>
    </div>
  )
}

export default AddPost