import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import like from "../../public/like.svg"
import liked from '../../public/liked.svg'
import { useDispatch, useSelector } from 'react-redux'




function LikeFeature({likes, postId, currentUserData}) {
    const [isLiked, setIsLiked] = useState(likes?.find(likedUser => likedUser?.$id === currentUserData?.$id))

    console.log("isliked" ,isLiked)
    const dispatch = useDispatch()

    let [likeCount, setLikeCount] = useState(likes?.length)
    
    const handleLike = async () => {
        setIsLiked(prevLiked => !prevLiked);
        // Update the like count immediately
        setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1)
        try {
            const updatedDocument = await appwriteService.likePost(postId, currentUserData?.$id, dispatch);
            
            console.log("updatedocument",updatedDocument)
            // console.log("likes", updatedDocument.likes)
            // setLikeCount(updatedDocument.likes.length)
        } catch (error) {
            console.error('Error updating like status:', error.message);
            setIsLiked(prevLiked => !prevLiked);
            setLikeCount(prevCount => isLiked ? prevCount + 1 : prevCount - 1);
        }
    };
    
    console.log("likes" ,likes?.length)
    
    console.table([likes, postId, currentUserData?.$id])

  return (
         <div className="flex justify-between items-center">
          <div className="flex gap-1 mr-5 items-center">
            <img 
            className="cursor-pointer"
            src={isLiked ? liked : like} 
            alt="like"
            width={25}
            height={25}
            onClick={handleLike}
            />
            <p className=" text-white">{likeCount}</p>
          </div>
        </div>
  )
}

export default LikeFeature