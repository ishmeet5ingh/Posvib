import React, { useState } from "react";
import { useElapsedTime } from "../../hooks";
import { Link } from "react-router-dom";

function CommentOrReply({ comment ,reply, children }) {
  const elapsedTime = useElapsedTime(comment?.$createdAt || reply?.$createdAt);

  const CommentOrReply = comment || reply

  console.log("reply?.creatorUrl", reply?.creatorUrl)
  console.log("reply", reply)

  return (
    <div className="pl-5 p-2 flex gap-1">
      <Link to={`/user/${CommentOrReply?.creator?.$id}`}>
        <img
          className={`rounded-full ${reply ? "w-6 h-6" : "w-8 h-8 "} mr-1`}
          src={comment?.creator?.imageUrl || reply?.creatorUrl}
          alt={comment?.creator?.username || reply?.creatorUsername}
        />
      </Link>
      <div className="w-full">
        <div className="text-xs flex gap-2  h-fit">
          <Link
            to={`/user/${CommentOrReply?.creator?.$id}`}
            className="text-xs text-gray-200"
          >
            {comment?.creator?.username || reply?.creatorUsername}
          </Link>
          <p className="text-gray-400">{elapsedTime}</p>
        </div>
        <div className="">
          <p className={`text-gray-200 ${reply ? "text-xs" : "text-sm"}`}>{comment?.comment || reply?.reply}</p>
        </div>
        <div>
        {children}
        </div>
      </div>
    </div>
  );
}

export default CommentOrReply;
