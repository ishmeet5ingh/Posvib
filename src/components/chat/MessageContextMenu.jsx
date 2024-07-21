import React, { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import messageService from "../../appwrite/message";
import { deleteReduxMessage } from "../../store/chatRoomSlice";
import conf from "../../conf/conf";

function MessageContextMenu({ currentUserId, message }) {

  const deleteMessage = async () => {
    await messageService.deleteAppwriteMessage(message?.$id)
    if(message?.fileId){
      await messageService.deleteAppwriteFile(message?.fileId)
    }
  };
  return (
    <div
      className={`p-2  ${
        currentUserId === message?.senderId
          ? `bg-[#1a1919] text-white ${
              message?.fileId ? "left-10 top-[40%] py-4" : "right-10"
            }`
          : `bg-[#313131] text-white  ${
              message?.fileId ? "right-10" : "left-10"
            }`
      }  rounded-md absolute border  border-teal-800 `}
    >
      <button
        onClick={deleteMessage}
        className="flex items-center gap-2">
        Unsend
        <FaTrash />
      </button>
    </div>
  );
}

export default MessageContextMenu;
