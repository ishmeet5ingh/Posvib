import React from "react";
import { useElapsedTime } from '../../hooks'
import { Link } from "react-router-dom";


function Comment({comment}) {

  const elapsedTime = useElapsedTime(comment?.$createdAt)
  return (
    <div className="pl-5 p-2 flex gap-2">
      <Link to={`/user/${comment?.creator?.$id}`}>
        <img
          className="w-8 h-8  rounded-full"
          src={comment?.creator?.imageUrl}
          alt={comment?.creator?.username}
        />
      </Link>
      <div>
        <div className="text-xs flex gap-2  h-fit">
          <Link
            to={`/user/${comment?.creator?.$id}`}
            className="text-xs text-gray-200"
          >
            {comment?.creator?.username}
          </Link>
          <p className='text-gray-400'>{elapsedTime}</p>
        </div>
        <div>
          <p className="text-sm text-gray-200">{comment?.comment}</p>
        </div>
        <div>
          <button className="text-xs text-gray-400 underline">reply</button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Comment;
