import React, { useState, useRef, useEffect } from "react";
import { useElapsedTime } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteReduxComment, deleteReduxReply } from "../../store/configSlice";
import commentService from "../../appwrite/comment";
import configService from "../../appwrite/config";
import replyService from "../../appwrite/reply";
import { resetSubmitState, setSubmitState } from "../../store/submitStateSlice";
import LikeFeature from "./LikeFeature";
import conf from "../../conf/conf";
import authService from "../../appwrite/auth";

function CommentOrReply({ comment, reply, children, postId, commentId }) {
  const currentUser = useSelector((state) => state.users.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitState = useSelector((state) => state.submitState.submitState);

  const isAuthor =
    currentUser?.$id === (comment?.creator?.username || reply?.creatorUsername);

  const [showOptions, setShowOptions] = useState(false);
  const elapsedTime = useElapsedTime(comment?.$createdAt || reply?.$createdAt);
  const [isEditable, setIsEditable] = useState(false);
  const [data, setData] = useState(comment?.comment || reply?.reply);
  const commentRef = useRef(null);

  

  useEffect(() => {
    function handleClickOutside(event) {
      if (commentRef.current && !commentRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [commentRef]);

  // delete comment
  const delComment = async () => {
    dispatch(setSubmitState({ submitState: "deleting...", id: commentId }));
    setShowOptions(false);
    await Promise.all([
      await commentService.deleteAppwriteComment(commentId),
      await configService.deleteAppwriteCommentInsidePost(postId, commentId),
      await replyService.deleteAppwriteRepliesByCommentId(commentId),
    ]);
    dispatch(deleteReduxComment({ postId, commentId }));
    dispatch(resetSubmitState());
  };

  const editable = () => {
    setIsEditable(true);
    setShowOptions((prevState) => !prevState);
  };

  // delete reply
  const delReply = async () => {
    dispatch(setSubmitState({ submitState: "deleting...", id: reply?.$id }));
    setShowOptions(false);
    await Promise.all([
      await replyService.deleteAppwriteReply(reply?.$id),
      await commentService.deleteAppwriteReplyInsideComments(
        commentId,
        reply?.$id
      ),
    ]);
    dispatch(deleteReduxReply({ postId, commentId, replyId: reply?.$id }));
    dispatch(resetSubmitState());
  };

  const updateCommentOrReply = (e) => {
    e.preventDefault();
  };

  return (
    <div
      ref={commentRef}
      className={`relative ${
        submitState.id === (comment?.$id || reply?.$id) && "shimmer-bg-gray"
      } `}
    >
      <div
        className={`pl-5  p-2 flex transition-all duration-100 gap-1 ${
          showOptions ? "blur-sm" : "blur-none "
        }`}
      >
        <Link
          to={`/user/${comment?.creator?.username || reply?.creatorUsername}`}
        >
          <img
            className={`rounded-full ${reply ? "w-6 h-6" : "w-8 h-8 "} mr-1`}
            src={(comment?.creator?.profilePicId ? authService.getFilePreview(comment?.creator?.profilePicId) : comment?.creator?.imageUrl ) || (reply?.profilePicId ? authService.getFilePreview(reply?.profilePicId) : reply?.creatorAvatarUrl )}
            // src={user.profilePicId ? authService.getFilePreview(user.profilePicId) : user.imageUrl}

            alt={comment?.creator?.username || reply?.creatorUsername}
          />
        </Link>
        <div className=" w-full">
        <div className="flex justify-between">
        <div className="w-full">
          <div className="text-xs flex gap-2 h-fit">
            <Link
              to={`/user/${comment?.creator?.username || reply?.creatorUsername}`}
              className="text-xs text-gray-200"
            >
              {comment?.creator?.username|| reply?.creatorUsername}
            </Link>
            <p className="text-gray-400">{elapsedTime}</p>
          </div>

          {!isEditable ? (
            <div
              onClick={() => setShowOptions(true)}
              className="cursor-pointer"
            >
              <p className={`text-gray-200 ${reply ? "text-xs" : "text-sm"}`}>
                {comment?.comment || reply?.reply}
              </p>
            </div>
          ) : (
            <form onSubmit={updateCommentOrReply}>
              <input
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className={`bg-gray-800 ${reply ? "text-xs" : "text-sm"}`}
              />
              <button type="submit" className="cursor-pointer"></button>
              submit
            </form>
          )}
        </div>
          <div className=" w-20 flex justify-end pr-2">
          <LikeFeature
            likes={comment?.likes || reply?.likes}
            postId={postId}
            commentId={commentId}
            replyId={reply?.$id}
            currentUser={currentUser}
            collectionId={comment ? conf.appwriteCommentsCollectionId : conf.appwriteRepliesCollectionId}
          />
        </div>
        </div>
          <div>{children}</div>
          <p className="text-gray-400 text-xs font-bold">
            {submitState?.id === reply?.$id && submitState.state}
          </p>
        </div>
        
      </div>
      
      {showOptions && (
        <div
          className={`flex  bg-gray-700 text-white absolute top-1 left-2 duration-100 transition-opacity  ${
            showOptions ? "opacity-100" : "opacity-0"
          }`}
        >
          {isAuthor ? (
            <div>
              <button onClick={editable} className="p-2 border border-gray-500">
                <FaEdit />
              </button>
              <button
                onClick={() => {
                  {
                    comment ? delComment() : delReply();
                  }
                }}
                className="p-2 border border-gray-500"
              >
                <FaTrashAlt />
              </button>
            </div>
          ) : (
            <div>
              <p className="p-2 border text-xs border-gray-500">
                {comment ? "Not your comment" : "Not your reply"}
              </p>
            </div>
          )}
          <button
            onClick={() => setShowOptions((prevState) => !prevState)}
            className="p-2 border border-gray-500"
          >
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  );
}

export default CommentOrReply;
