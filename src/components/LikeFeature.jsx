import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import likeIcon from "../../public/like.svg";
import likedIcon from "../../public/liked.svg";
import { useDispatch, useSelector } from "react-redux";
import { updateLike } from "../store/configSlice";
import conf from "../conf/conf";

function LikeFeature({ likes, postId, currentUserData }) {
  const [isLiked, setIsLiked] = useState(
    likes?.some((likedUser) => likedUser === currentUserData?.$id) || false
  );
  const [likeCount, setLikeCount] = useState(likes?.length);
  const dispatch = useDispatch();

  // const post = useSelector(state => state.config.posts)
  // const like = post.find(post => post.$id === postId)
  // useEffect(() => {
  //     const unsubscribe = appwriteService.client.subscribe(
  //         `databases.${conf.appwriteDatabaseId}.collections.${conf.appwritePostsCollectionId}.documents`,
  //         response => {
  //           console.log(response)
  //             if (response.events.includes("databases.*.collections.*.documents.*.update")) {
  //                 const updatedLikes = response.payload.likes;
  //                 setLikeCount(updatedLikes.length);
  //                 setIsLiked(updatedLikes.includes(currentUserData?.$id));
  //                 console.log("updatedLikes", updatedLikes)
  //                 dispatch(updateLike({ id: postId, likesArray: updatedLikes }));
  //             }
  //         }
  //     );

  //     return () => {
  //       unsubscribe();
  //     };
  // }, []);

  const handleLike = () => {
    // Optimistically update UI
    // const newIsLiked = !isLiked;
    // const newLikeCount = newIsLiked ? likeCount + 1 : likeCount - 1;


    appwriteService
      .likePost(postId, currentUserData?.$id)
      .then((updatedDocument) => {
        // Update global state with the new likes array from server
        dispatch(
          updateLike({ id: postId, likesArray: updatedDocument.likes })
        );
        setIsLiked((prevLike) => !prevLike);
        console.log("isLiked", isLiked)
      // setLikeCount(newLikeCount);
      })
      .catch((error) => {
        // Revert optimistic update if API call fails
        console.error("Error updating like status:", error.message);
        // setIsLiked(!newIsLiked);
        // setLikeCount(newIsLiked ? likeCount - 1 : likeCount + 1);
      });
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
        <p className="text-white">{likes?.length}</p>
      </div>
    </div>
  );
}

export default LikeFeature;
