import React, { useEffect, useState } from 'react'
import appwriteReplyService from '../../appwrite/reply'
import appwriteCommentService from '../../appwrite/comment'
import { useForm } from 'react-hook-form'
import {FaPaperPlane} from 'react-icons/fa'
import { createReduxReply } from '../../store/configSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addReduxUserCommentReply } from '../../store/userSlice'
import { v4 as uuidv4 } from "uuid";
import { resetSubmitState, setSubmitState } from '../../store/submitStateSlice'
import replyService from '../../appwrite/reply'
import conf from '../../conf/conf'
import authService from '../../appwrite/auth'


function ReplyForm({currentUser, commentCreator, commentId, postId}) {

    const {handleSubmit, register, reset} = useForm()

    const dispatch = useDispatch()

    useEffect(()=> {
      const unsubscribe = replyService.client.subscribe(
        `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteRepliesCollectionId}.documents`,
        (response) => {
          if (response.events.includes("databases.*.collections.*.documents.*.create")) {
            dispatch(createReduxReply({ 
              reply: response.payload, 
              commentId: response.payload.commentId, 
              postId: response.payload.postId}));

              console.log("RESPONSE", response)
            dispatch(addReduxUserCommentReply({ 
              reply: response.payload, 
              commentId: response.payload.commentId, 
              postId: response.payload.postId, 
              userId: response.payload.userId }));
          }
        }
      )
      return ()=> {
        unsubscribe()
      }
    }, [
      replyService.client, 
      conf.appwriteDatabaseId, 
      conf.appwriteRepliesCollectionId, 
      dispatch,
      createReduxReply,
      addReduxUserCommentReply
    ])

    const submitReply = async (data) => {
        try {
          const tempId = uuidv4();
          dispatch(setSubmitState({submitState: "posting...", id: tempId}))
          const newReply = {
            $id: tempId,
            reply: data.reply,
            $createdAt: new Date().toString(),
            userId: currentUser?.$id,
            commentId: commentId,
            creatorAvatarUrl: currentUser?.imageUrl,
            creatorUsername: currentUser?.username,
            postId: postId,
            profilePicId: currentUser?.profilePicId
          }; 
          
          dispatch(createReduxReply({ reply: newReply, commentId, postId}));
          reset();

          const createdReply = await appwriteReplyService.createAppwriteReply(tempId, newReply);
          
          if (createdReply) { 
            // Update comments in Appwrite
            const updatedReply = await appwriteCommentService.createAppwriteReplyInsideComments(commentId, createdReply?.$id);
          }
          dispatch(resetSubmitState())
          
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
   src={!currentUser?.imageUrl ? avatarPlaceholder : currentUser?.profilePicId ? authService.getFilePreview(currentUser?.profilePicId) : currentUser?.imageUrl }
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