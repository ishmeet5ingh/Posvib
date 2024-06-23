import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import likeIcon from "../../public/like.svg";
import likedIcon from "../../public/liked.svg";
import { useDispatch, useSelector } from "react-redux";
import { updateLike } from "../store/configSlice";
import conf from "../conf/conf";
import { updateUserPostLike } from "../store/userSlice";

function LikeFeature({ likes, postId, currentUserData }) {
  const [isLiked, setIsLiked] = useState(
    likes?.includes(currentUserData?.$id)
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
                  setIsLiked(updatedLikes.includes(currentUserData?.$id));
                  console.log("updatedLikes", updatedLikes)
                  dispatch(updateLike({ userId: response.payload.userId, postId: response.payload.$id }));
                  dispatch(updateUserPostLike({ userId: response.payload.userId, postId: response.payload.$id}))
              }
          }
      );

      return () => {
        unsubscribe();
      };
  }, []);
  const handleLike = async () => {
    try {
      setIsLiked(prevLike => !prevLike);
      setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);

      await appwriteService.likePost(postId, currentUserData?.$id);
      
      // dispatch(updateLike({ userId: currentUserData?.$id, postId }));
      // dispatch(updateUserPostLike({ userId: currentUserData?.$id, postId }));
    } catch (error) {
      console.error("Error updating like status:", error.message);
      
      // Rollback optimistic update on error
      setIsLiked(prevLike => !prevLike);
      setLikeCount(prevCount => isLiked ? prevCount + 1 : prevCount - 1);
    }
  };

  return (
    <div className="flex justify-between px-4 sm:px-5 items-center">
      <div className="flex gap-1 mr-5 items-center">
        <img
          className="cursor-pointer"
          src={isLiked ? likedIcon : likeIcon}
          alt="like"
          width={25}
          height={25}
          onClick={handleLike}
        />
        <p className="text-white">{likeCount}</p>
      </div>
    </div>
  );
}

export default LikeFeature;
