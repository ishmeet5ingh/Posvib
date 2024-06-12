import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import like from "../../public/like.svg"
import liked from '../../public/liked.svg'
import { useDispatch, useSelector } from 'react-redux'
import { updateLike } from '../store/configSlice'
import conf from '../conf/conf'




function LikeFeature({likes, postId, currentUserData}) {
    const [isLiked, setIsLiked] = useState(likes?.some(likedUser => likedUser?.$id === currentUserData?.$id) || false)

    const dispatch = useDispatch()

    let [likeCount, setLikeCount] = useState(likes?.length)
    
    useEffect(() => {
      const unsubscribe = appwriteService.client.subscribe(
          `databases.${conf.appwriteDatabaseId}.collections.${conf.appwritePostsCollectionId}.documents.${postId}`,
          response => {
              if (response.events.includes("databases.*.collections.*.documents.*.update")) {
                  const updatedLikes = response.payload.likes;
                  setLikeCount(updatedLikes.length);
                  setIsLiked(updatedLikes.some(user => user.$id === currentUserData.$id));
                  store.dispatch(updateLike({ id: postId, likesArray: response.payload.likes }));
              }
          }
      );
      return () => unsubscribe();
    }, [postId, currentUserData.$id]);

    const handleLike = async () => {
        setIsLiked(prevLiked => !prevLiked);
        // Update the like count immediately
        setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1)
        try {
            const updatedDocument = await appwriteService.likePost(postId, currentUserData?.$id, dispatch);
            } catch (error) {
              console.error('Error updating like status:', error.message);
              setIsLiked(prevLiked => !prevLiked);
              setLikeCount(prevCount => isLiked ? prevCount + 1 : prevCount - 1);
              
              }
    };
  return (
         <div className="flex justify-between px-4 sm:px-5 items-center">
          <div className="flex gap-1 mr-5 items-center">
            <img 
            className="cursor-pointer"
            src={isLiked ? liked : like} 
            alt="like"
            width={25}
            height={25}
            onClick={handleLike}
            />
            <p className=" text-white">{likes.length}</p>
          </div>
        </div>
  )
}

export default LikeFeature