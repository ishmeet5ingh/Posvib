import React, { useState } from "react";
import { LikeFeature, CommentFeature, CommentForm, Comments } from "..";
import { CSSTransition } from "react-transition-group";

function PostCardFooter({ likes, comments, postId, currentUser }) {
  const [isComments, setIsComments] = useState(false);

  return (
    <div className={`${isComments && "bg-gray-800 rounded-md"}`}>
      <div className="flex l gap-3 mt-2 pb-2 px-3 ">
        <LikeFeature likes={likes} postId={postId} currentUser={currentUser} />
        <CommentFeature
          comments={comments}
          postId={postId}
          currentUser={currentUser}
          setIsComments={setIsComments}
          isComments={isComments}
        />
      </div>

      <CSSTransition
        in={isComments}
        timeout={200}
        classNames="comment-section"
        unmountOnExit
      >
        <div className="bg-gray-800 rounded-md ">
          <CommentForm currentUser={currentUser} postId={postId} />
          <Comments comments={comments} />
        </div>
      </CSSTransition>

      {!isComments && (
        <div
          onClick={() => setIsComments(true)}
          className="text-gray-400 cursor-pointer px-3 text-sm"
        >
          {comments?.length > 0 && (
            <p>
              {comments.length === 1
                ? "View 1 comment"
                : `View all ${comments.length} comments`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default PostCardFooter;
