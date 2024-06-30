import React, { useEffect } from "react";
import { CommentOrReply, Replies } from "..";

function Comments({ comments, currentUser, postId }) {

  return (
    <div className="overflow-y-scroll max-h-60 custom-scrollbar scroll-smooth">
      {comments?.map((comment) => (
        <div key={comment?.$id}>
          <CommentOrReply comment={comment}>
            <Replies
              currentUser={currentUser}
              replies={comment?.replies}
              commentCreator={comment?.creator?.username}
              commentId={comment?.$id}
              postId={postId}
            />
          </CommentOrReply>
        </div>
      ))}
    </div>
  );
}

export default Comments;
