import React, { useState, useRef, useEffect } from "react";
import { useElapsedTime } from "../../hooks";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

function CommentOrReply({ comment, reply, children }) {
  const currentUser = useSelector((state) => state.users.currentUser);

  const isAuthor = currentUser?.$id === comment?.creatorUsername;

  const [showOptions, setShowOptions] = useState(false);
  const elapsedTime = useElapsedTime(comment?.$createdAt || reply?.$createdAt);
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

  const delComment = async () => {};

  return (
    <div ref={commentRef} className="relative">
      <div
        className={`pl-5  p-2 flex transition-all duration-100 gap-1 ${
          showOptions ? "blur-sm" : "blur-none "
        }`}
      >
        <Link
          to={`/user/${comment?.creatorUsername || reply?.creatorUsername}`}
        >
          <img
            className={`rounded-full ${reply ? "w-6 h-6" : "w-8 h-8 "} mr-1`}
            src={comment?.creatorAvatarUrl || reply?.creatorUrl}
            alt={comment?.creatorUsername || reply?.creatorUsername}
          />
        </Link>
        <div className="w-full">
          <div className="text-xs flex gap-2  h-fit">
            <Link
              to={`/user/${comment?.creatorUsername || reply?.creatorUsername}`}
              className="text-xs text-gray-200"
            >
              {comment?.creatorUsername || reply?.creatorUsername}
            </Link>
            <p className="text-gray-400">{elapsedTime}</p>
          </div>
          <div
            onClick={() => setShowOptions((prevState) => !prevState)}
            className="cursor-pointer"
          >
            <p className={`text-gray-200 ${reply ? "text-xs" : "text-sm"}`}>
              {comment?.comment || reply?.reply}
            </p>
          </div>
          <div>{children}</div>
        </div>
      </div>
      {/* showOptions */}
      <div
        className={`flex  bg-gray-700 text-white absolute top-1 left-2 duration-100 transition-opacity  ${
          showOptions ? "opacity-100" : "opacity-0"
        }`}
      >
        {isAuthor ? (
          <div>
            <button className="p-2 border border-gray-500">
              <FaEdit />
            </button>
            <button className="p-2 border border-gray-500">
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
    </div>
  );
}

export default CommentOrReply;
