import React, { useState, useRef, useEffect } from "react";
import { LikeFeature, CommentFeature, CommentForm, Comments } from "..";
import { CSSTransition } from "react-transition-group";

function PostCardFooter({ likes, comments, postId, currentUser }) {
  const [isComments, setIsComments] = useState(false);
  const commentSectionRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (commentSectionRef.current && !commentSectionRef.current.contains(event.target)) {
        setIsComments(false);
        console.log("event.target", event.target)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [commentSectionRef]);

  return (
    <div ref={commentSectionRef} className={`${isComments && "bg-gray-800 rounded-md"}`}>
      <div className="flex gap-3 mt-2 pb-2 px-3 ">
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
        <div className="bg-gray-800 rounded-md " >
          <CommentForm currentUser={currentUser} postId={postId} />
          <Comments comments={comments} currentUser={currentUser} postId={postId}/>
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
