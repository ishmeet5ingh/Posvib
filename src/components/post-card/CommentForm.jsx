import React, { useEffect, useState } from 'react'
import appwriteCommentService from '../../appwrite/comment'
import appwriteService from '../../appwrite/config'
import { useForm } from 'react-hook-form'
import {FaPaperPlane} from 'react-icons/fa'
import { createComment } from '../../store/configSlice'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserPostComment } from '../../store/userSlice'


function CommentForm({currentUser, comments, postId}) {

    const posts = useSelector(state => state.config.posts)
    const users = useSelector(state => state.users.users)

    console.log("posts", posts)
    console.log("users", users)
    
    const {handleSubmit, register, reset} = useForm({
        defaultValues: {
          comment: comments?.comment || "",    
        },
      })

    const dispatch = useDispatch()

    const submitComment = async (data) => {
        try {
          console.log("data", data);
      
          // Create the comment
          const createdComment = await appwriteCommentService.createComment({
            ...data,
            userId: currentUser?.$id,
            postId: postId,
          });
      
          if (createdComment) {
            // Dispatch actions to update Redux store
            dispatch(createComment({ comment: createdComment, postId }));
            dispatch(updateUserPostComment({ comment: createdComment, postId, userId: currentUser?.$id }));
      
            // Update comments in Appwrite
            const updatedComment = await appwriteService.updateComments(postId, createdComment?.$id);
            console.log("updatedComment", updatedComment);
          }
      
          // Reset the form
          reset();
        } catch (error) {
          console.log(error);
        }
      };
      

  return (
    <form
    onSubmit={handleSubmit(submitComment)}
    className="flex items-center space-x-3 bg-gray-800 px-2 pb-2 rounded-md shadow-md shadow-slate-900"
  >
    <img
      src={currentUser?.imageUrl}
      alt={currentUser?.name || "User Avatar"}
      className="w-9 h-9 rounded-full object-cover"
    />
    <div className="flex-grow">
      <input
        type="text"
        placeholder={`comment for @${currentUser?.username}...`}
        className="w-full text-sm bg-gray-800 text-gray-300 pb-1 focus:ring-0 focus:border-transparent focus:outline-none"
        {...register("comment", { required: true })}
      />
    </div>
    <button
      type="submit"
      className=" text-gray-300 p-2"
    >
    <FaPaperPlane/>
    </button>
  </form>
  )
}

export default CommentForm