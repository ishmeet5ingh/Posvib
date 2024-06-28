import React, { useEffect, useState } from 'react'
import appwriteReplyService from '../../appwrite/reply'
import appwriteCommentService from '../../appwrite/comment'
import { useForm } from 'react-hook-form'
import {FaPaperPlane} from 'react-icons/fa'
import { createReduxReply } from '../../store/configSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addReduxUserCommentReply } from '../../store/userSlice'


function ReplyForm({currentUser, replies, commentCreator, commentId, postId}) {

    
    const {handleSubmit, register, reset} = useForm({
        defaultValues: {
          reply: replies?.reply || "",    
        },
      })

    const dispatch = useDispatch()

    const submitReply = async (data) => {
        try {
          console.log("data", data);
      
          // Create the comment
          const createdReply = await appwriteReplyService.createAppwriteReply({
            ...data,
            userId: currentUser?.$id,
            commentId: commentId,
            creatorUrl: currentUser?.imageUrl,
            creatorUsername: currentUser?.username
          });
      
          if (createdReply) {

            console.log("createdReply", createdReply)
            // Dispatch actions to update Redux store
            dispatch(createReduxReply({ reply: createdReply, commentId, postId}));
            dispatch(addReduxUserCommentReply({ reply: createdReply, commentId, postId, userId: currentUser?.$id }));
      
            // Update comments in Appwrite
            const updatedReply = await appwriteCommentService.createAppwriteReplyInsideComments(commentId, createdReply?.$id);
            console.log("updatedreply", updatedReply);
          }
      
          // Reset the form
          reset();
        } catch (error) {
          console.log(error);
        }
      };
      

  return (
    <form
    onSubmit={handleSubmit(submitReply)}
    className="flex items-center space-x-3 bg-gray-800 px-2 rounded-md shadow-sm shadow-slate-900 "
  >
    <img
      src={currentUser?.imageUrl}
      alt={currentUser?.name || "User Avatar"}
      className="w-6 h-6 rounded-full"
    />
    <div className="flex-grow">
      <input
        type="text"
        placeholder={`reply for @${commentCreator}...`}
        className="w-full text-xs bg-gray-800 text-gray-300 pb-1 focus:ring-0 focus:border-transparent focus:outline-none"
        {...register("reply", { required: true })}
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

export default ReplyForm