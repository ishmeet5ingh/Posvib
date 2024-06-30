import React, { useState, useEffect } from "react";
import {ReplyForm, CommentOrReply} from "..";
import { useSelector } from "react-redux";

function Replies({replies, currentUser, commentCreator, commentId, postId}) {

    const posts = useSelector(state => state.config.posts)
    const users = useSelector(state => state.users.users)


    const [isReplies, setIsReplies] = useState(false)

    const [ReplyCount, setReplyCount] = useState(replies?.length)  

    useEffect(()=> {
        setReplyCount(replies?.length)
    }, [replies?.length])


    const handleReplies = () => {
        setIsReplies((prevState)=> !prevState)
        setReplyCount(replies?.length)
    }

  return (
    <div>
    <div>
      <button onClick={handleReplies} className="text-xs text-gray-400 underline">reply</button>

      {!isReplies && (
        <div
          onClick={() => setIsReplies(true)}
          className="text-gray-400 cursor-pointer px-7 text-xs"
        >
          {replies?.length > 0 && (
            <p>
              {replies.length === 1
                ? "View 1 reply"
                : `View all ${replies?.length} replies`}
            </p>
          )}
        </div>
      )}
    </div>
           {isReplies && (
            <div>
            <ReplyForm  
              currentUser={currentUser}
              replies={replies}
              commentCreator={commentCreator}
              commentId={commentId}
              postId={postId}/>

              {replies?.map((reply) => (
                <div key={reply?.$id}>
                    <CommentOrReply reply={reply}/>
                </div>
              ))}
            </div>

              
           )}


    </div>
  );
}


export default Replies;
