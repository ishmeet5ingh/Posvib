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
    likes?.includes(currentUserData.$id)
  );
  const [likeCount, setLikeCount] = useState(likes?.length);
  const dispatch = useDispatch();
  

  useEffect(() => {
    setIsLiked(likes?.includes(currentUserData.$id));
    setLikeCount(likes?.length || 0);
  }, [likes, currentUserData.$id]);

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
  console.log("isLiked", isLiked)

  const handleLike = () => {
  
   const newIsLiked = !isLiked;
    const newLikeCount = newIsLiked ? likeCount + 1 : likeCount - 1;

    setIsLiked(newIsLiked);
    setLikeCount(newLikeCount);

    appwriteService
      .likePost(postId, currentUserData?.$id)
      .then((updatedDocument) => {
              dispatch(updateLike({ id: postId, likesArray: updatedDocument.likes }));
              dispatch(updateUserPostLike({userId: currentUserData?.$id, postId, likesArray: updatedDocument?.likes}))

        // Ensure the UI reflects the latest likes from the server
        setLikeCount(updatedDocument.likes.length);
        setIsLiked(updatedDocument.likes.includes(currentUserData.$id));
      })
      .catch((error) => {
        console.error("Error updating like status:", error.message);
        setIsLiked(!newIsLiked);
        setLikeCount(likeCount);
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
        <p className="text-white">{likeCount}</p>
      </div>
    </div>
  );
}

export default LikeFeature;
