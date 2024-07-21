import React, { useState, useEffect } from "react";
import { useCurrentTime } from "../../hooks";
import messageService from "../../appwrite/message";
import MessageContextMenu from "./MessageContextMenu";

function Message({ message, currentUserId }) {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [imageUrl, setImageUrl] = useState(messageService.getFilePreview(message?.fileId) || message?.imageUrl)

  useEffect(()=> {
    if(message?.fileId || message?.imageUrl){
      setImageUrl(messageService.getFilePreview(message?.fileId) || message?.imageUrl)
    }
  },[message.fileId, message.imageUrl])

  useEffect(() => {
    const handleClick = () => {
      setShowContextMenu(false);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const formattedTime = useCurrentTime(message?.$createdAt);
  
  return (
    <div
      className={`flex  mb-2 ${
        currentUserId === message?.senderId ? "justify-end" : "justify-start"
      } `}
    >
      <div
        className={` w-4/6 flex h-6/6 flex-col ${
          currentUserId === message?.senderId ? "items-end" : "items-start"
        }`}
      >
        <div className="text-[10px]  text-gray-300 mb-1">{formattedTime}</div>
        <div
          className={`relative  flex flex-col  w-[80%] rounded-md ${
            currentUserId === message?.senderId ? "items-end" : "items-start"
          } `}
        >
          {message?.imageUrl && (
            <img
             onContextMenu={(e) => {
            e.preventDefault();
            setShowContextMenu(true);
          }}
              src={imageUrl}
              alt=""
              className={` border-2  rounded-t-md  ${
                currentUserId === message?.senderId
                  ? "border-[#313131] text-white"
                  : "border-[#1a1919] text-white"
              }  ${
          showContextMenu && (currentUserId === message?.senderId)  ? "blur-sm" : "blur-none "
        }`}
            />
          )}
          {message.message && (
            <p
             onContextMenu={(e) => {
            e.preventDefault();
            setShowContextMenu(true);
          }}
              className={`p-2 rounded-b-md text-sm  ${
                currentUserId === message?.senderId
                  ? "bg-[#313131] text-white"
                  : "bg-[#1a1919] text-white"
              } ${message?.imageUrl && "w-full"}  ${
          showContextMenu && (currentUserId === message?.senderId) ? "blur-sm" : "blur-none "
        }`}
            >
              {message?.message}
            </p>
          )}
          {showContextMenu && (currentUserId === message?.senderId) && <MessageContextMenu currentUserId={currentUserId} 
        message={message}
      />}
        </div>
      </div>
     
    </div>
  );
}

export default Message;
