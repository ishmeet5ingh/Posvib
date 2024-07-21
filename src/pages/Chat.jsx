import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ChatSidebar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import chatRoomService from "../appwrite/chatRoom";
import { deleteReduxChatRooms, setReduxChatRooms } from "../store/chatRoomSlice";

function Chat() {
  const isHide = useSelector((state) => state.hide.isHide);
  const currentUserId = useSelector(state => state.users.currentUser?.$id)
  const dispatch = useDispatch()
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  
  useEffect(() => {
    const fetch = async () => {
      const chatRooms = await chatRoomService.getAppwriteChatRooms(
        currentUserId
      );
      dispatch(setReduxChatRooms(chatRooms?.documents))
    };
    fetch();
  }, [currentUserId, dispatch]);


  return (
    <div className="flex">
      {!isHide && isSmallScreen ? null : <ChatSidebar />}
      <Outlet />
    </div>
  );
}

export default Chat;
