import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/config";
import likeIcon from "../../../public/like.png";
import likedIcon from "../../../public/liked.png";
import { useDispatch, useSelector } from "react-redux";
import { updateReduxLike } from "../../store/configSlice";
import conf from "../../conf/conf";
import { updateReduxUserPostLike } from "../../store/userSlice";
import {FaComment, FaHeart} from 'react-icons/fa'


function LikeFeature({ likes, postId, currentUser }) {
  const [isLiked, setIsLiked] = useState(
    likes?.includes(currentUser?.$id)
  );

  const [likeCount, setLikeCount] = useState(likes?.length)
  const dispatch = useDispatch();

  
  const posts = useSelector(state => state.config.posts)

  
  useEffect(() => {
      const unsubscribe = appwriteService.client.subscribe(
          `databases.${conf.appwriteDatabaseId}.collections.${conf.appwritePostsCollectionId}.documents.${postId}`,
          response => {
            console.log(response)
              if (response.events.includes("databases.*.collections.*.documents.*.update")) {
                  const updatedLikes = response.payload.likes;
                  setLikeCount(updatedLikes?.length);
                  setIsLiked(updatedLikes.includes(currentUser?.$id));
                  console.log("updatedLikes", updatedLikes)
                  dispatch(updateReduxLike({ userId: response.payload.userId, postId: response.payload.$id }));
                  dispatch(updateReduxUserPostLike({ userId: response.payload.userId, postId: response.payload.$id}))
              }
          }
      );

      return () => {
        unsubscribe();
      };
  },[postId, currentUser?.$id, dispatch]);


  const handleLike = async () => {
    try {
      setIsLiked(prevLike => !prevLike);
      setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);

      await appwriteService.toggleAppwritePostLike(postId, currentUser?.$id);
      
      // dispatch(updateReduxLike({ userId: currentUser?.$id, postId }));
      // dispatch(updateReduxUserPostLike({ userId: currentUser?.$id, postId }));
    } catch (error) {
      console.error("Error updating like status:", error.message);
      
      // Rollback optimistic update on error
      setIsLiked(prevLike => !prevLike);
      setLikeCount(prevCount => isLiked ? prevCount + 1 : prevCount - 1);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-[2px] items-center">
        <img
          className="cursor-pointer "
          src={isLiked ? likedIcon : likeIcon}
          alt="like"
          width={24}
          height={24}
          onClick={handleLike}
        />
        <div className=" bg-black">
        </div>
        
        <p className="text-white">{likeCount}</p>
      </div>
    </div>
  );
}

export default LikeFeature;
