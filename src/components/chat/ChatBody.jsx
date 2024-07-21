import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useCurrentTime from "../../hooks/useCurrentTime"; // Adjust the path as needed
import messageService from "../../appwrite/message";
import Message from "./Message";

function ChatBody({ messages, loading }) {
  const currentUser = useSelector((state) => state.users.currentUser);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="text-white ">
      <ul
        style={{ height: "calc(100vh - 105px)" }}
        className=" px-5  overflow-y-scroll hide-scrollbar"
      >
        {messages?.map((message) => {
          return (
            <li
              key={message?.$id}
            >
             <Message 
             loading={loading}
             message={message}
             currentUserId={currentUser?.$id}
             />
            </li>
          );
        })}
        {/* Dummy element to scroll to */}
        <div ref={messagesEndRef} />
      </ul>
    </div>
  );
}

export default ChatBody;
