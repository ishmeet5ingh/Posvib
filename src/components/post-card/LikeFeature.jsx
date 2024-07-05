import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/config";
import likeIcon from "/like.png";
import likedIcon from "/liked.png";
import { useDispatch, useSelector } from "react-redux";
import {
  updateReduxCommentLike,
  updateReduxPostLike,
  updateReduxReplyLike,
} from "../../store/configSlice";
import conf from "../../conf/conf";
import {
  updateReduxUserCommentLike,
  updateReduxUserPostLike,
  updateReduxUserReplyLike,
} from "../../store/userSlice";
import { FaComment, FaHeart } from "react-icons/fa";
import commentService from "../../appwrite/comment";
import replyService from "../../appwrite/reply";

function LikeFeature({
  likes,
  postId,
  commentId,
  replyId,
  currentUser,
  collectionId,
}) {
  const [isLiked, setIsLiked] = useState(likes?.includes(currentUser?.$id));

  const [likeCount, setLikeCount] = useState(likes?.length);
  const dispatch = useDispatch();

  const [id, setId] = useState("");

  useEffect(() => {
    setLikeCount(likes?.length);
  }, []);

  useEffect(() => {
    // Determine the correct document ID based on collection
    if (collectionId === conf.appwritePostsCollectionId) {
      setId(postId);
    } else if (collectionId === conf.appwriteCommentsCollectionId) {
      setId(commentId);
    } else if (collectionId === conf.appwriteRepliesCollectionId) {
      setId(replyId);
    }
  }, [postId, commentId, replyId, collectionId]);

  useEffect(() => {
    const unsubscribe = appwriteService.client.subscribe(
      `databases.${conf.appwriteDatabaseId}.collections.${collectionId}.documents.${id}`,
      (response) => {
        console.log(response);
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.update"
          )
        ) {
          const updatedLikes = response.payload.likes;
          setLikeCount(updatedLikes?.length);
          setIsLiked(updatedLikes.includes(currentUser?.$id));

          if (collectionId === conf.appwritePostsCollectionId) {
            dispatch(
              updateReduxPostLike({
                userId: response.payload.userId,
                postId: response.payload.$id,
              })
            );
            dispatch(
              updateReduxUserPostLike({
                userId: response.payload.userId,
                postId: response.payload.$id,
              })
            );
          } else if (collectionId === conf.appwriteCommentsCollectionId) {
            dispatch(
              updateReduxCommentLike({
                userId: response.payload?.userId,
                postId: response.payload?.postId,
                commentId: response.payload?.$id,
              })
            );

            dispatch(
              updateReduxUserCommentLike({
                userId: response.payload?.userId,
                postId: response.payload?.postId,
                commentId: response.payload?.$id,
              })
            );
          } else if (collectionId === conf.appwriteRepliesCollectionId) {
            dispatch(
              updateReduxReplyLike({
                userId: response.payload?.userId,
                postId: response.payload?.postId,
                commentId: response.payload?.commentId,
                replyId: response.payload?.$id,
              })
            );

            dispatch(
              updateReduxUserReplyLike({
                userId: response.payload?.userId,
                postId: response.payload?.postId,
                commentId: response.payload?.commentId,
                replyId: response.payload?.$id,
              })
            );
          }
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [id, collectionId, currentUser?.$id, dispatch]);

  const handleLike = async () => {
    try {
      setIsLiked((prevLike) => !prevLike);
      setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));

      if (collectionId === conf.appwritePostsCollectionId) {
        const post = await appwriteService.toggleAppwritePostLike(
          postId,
          currentUser?.$id
        );
      } else if (collectionId === conf.appwriteCommentsCollectionId) {
        const comment = await commentService.toggleAppwriteCommentLike(
          commentId,
          currentUser?.$id
        );
      } else if (collectionId === conf.appwriteRepliesCollectionId) {
        const reply = await replyService.toggleAppwriteReplyLike(
          replyId,
          currentUser?.$id
        );
      }
    } catch (error) {
      console.error("Error updating like status:", error.message);

      // Rollback optimistic update on error
      setIsLiked((prevLike) => !prevLike);
      setLikeCount((prevCount) => (isLiked ? prevCount + 1 : prevCount - 1));
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-[2px] items-center">
        <img
          className="cursor-pointer "
          src={isLiked ? likedIcon : likeIcon}
          alt="like"
          width={collectionId === conf.appwritePostsCollectionId ? 24 : 18}
          height={collectionId === conf.appwritePostsCollectionId ? 24 : 18}
          onClick={handleLike}
        />
        <div className=" bg-black"></div>

        <p
          className={`text-white ${
            collectionId !== conf.appwritePostsCollectionId && "text-sm"
          }`}
        >
          {likeCount}
        </p>
      </div>
    </div>
  );
}

export default LikeFeature;
