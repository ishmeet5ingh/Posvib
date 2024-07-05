import React, { useEffect } from "react";
import { CommentOrReply, Replies } from "..";

function Comments({ comments, currentUser, postId}) {

  const sortedComments = [...comments].sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
  return (
    <div className="overflow-y-scroll max-h-60 custom-scrollbar scroll-smooth">
      {sortedComments?.map((comment) => (
        <div key={comment?.$id}>
          <CommentOrReply
            comment={comment}
            commentId={comment?.$id}
            postId={postId}
          >
            <Replies
              currentUser={currentUser}
              replies={comment?.replies}
              commentCreator={comment?.creatorUsername}
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
