import React, { useEffect, useState } from 'react'
import appwriteCommentService from '../../appwrite/comment'
import appwriteService from '../../appwrite/config'
import { useForm } from 'react-hook-form'
import {FaPaperPlane} from 'react-icons/fa'
import { createReduxComment } from '../../store/configSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addReduxUserPostComment } from '../../store/userSlice'
import { v4 as uuidv4 } from "uuid";
import { resetSubmitState, setSubmitState } from '../../store/submitStateSlice'
import commentService from '../../appwrite/comment'
import conf from '../../conf/conf'
import avatarPlaceholder from "/avatarPlaceholder.jpeg";
import authService from '../../appwrite/auth'


function CommentForm({currentUser, postId}) {
    
    const {handleSubmit, register, reset} = useForm()

    const dispatch = useDispatch()

    useEffect(()=> {
      const unsubscribe = commentService.client.subscribe(
        `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCommentsCollectionId}.documents`,
        (response) => {
          if (response.events.includes("databases.*.collections.*.documents.*.create")) {
            dispatch(createReduxComment({ 
              comment: response.payload, 
              postId: response.payload?.postId }));

            dispatch(addReduxUserPostComment({ 
              comment: response.payload, 
              postId: response.payload?.postId,
              userId: response.payload?.userId}));
          }
        }
      )
      return ()=> {
        unsubscribe()
      }
    }, [
      commentService.client, 
      conf.appwriteDatabaseId, 
      conf.appwriteCommentsCollectionId, 
      dispatch,
      createReduxComment,
      addReduxUserPostComment
    ])

    const submitComment = async (data) => {
        try {
          const tempId = uuidv4();
          dispatch(setSubmitState({submitState: "posting...", id: tempId}))
          const newComment = {
            $id: tempId,
            comment: data.comment,
            $createdAt: new Date().toString(),
            postId: postId,
            userId: currentUser?.$id,
            likes: [],
            creator: currentUser
          };  

          dispatch(createReduxComment({ comment: newComment, postId }));
          reset();
          const createdComment = await appwriteCommentService.createAppwriteComment(tempId, newComment);

          if (createdComment) {
           
      
            // Update comments in Appwrite
            const updatedComment = await appwriteService.createAppwriteCommentInsidePost(postId, createdComment?.$id);
          }
      
          dispatch(resetSubmitState())
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
      src={!currentUser?.imageUrl ? avatarPlaceholder : currentUser?.profilePicId ? authService.getFilePreview(currentUser?.profilePicId) : currentUser?.imageUrl }
      alt={currentUser?.name || "Useer Avatar"}
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