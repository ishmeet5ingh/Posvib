import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatHeader, ChatBody, ChatFooter } from "..";
import chatRoomService from '../../appwrite/chatRoom';
import { setHide } from '../../store/hideSlice';
import { addReduxChatRoom } from '../../store/chatRoomSlice';
import chatTheme from '/chatTheme.png'

function ChatRoomComp({ currentUser_selectedUser }) {
  const [currentUserId, selectedUserId] = currentUser_selectedUser.split("_");
  const selectedUser = useSelector(state => state.users.users?.find(user => user?.$id === selectedUserId));
  const dispatch = useDispatch();
  
  let chatRoom = useSelector(state =>
    state.chatRoom.chatRooms?.find(
      chatRoom => chatRoom?.$id === `${currentUserId}_${selectedUserId}` || chatRoom?.$id === `${selectedUserId}_${currentUserId}`
    )
  );

  const [retry, setRetry] = useState(0);

  useEffect(() => {
    dispatch(setHide(false));
  }, [dispatch, chatRoom]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (chatRoom) {
          return;
        }
        chatRoom = await chatRoomService.getAppwriteChatRoom(currentUserId, selectedUserId);
        if (chatRoom) {
          dispatch(addReduxChatRoom(chatRoom));
        } else {
          const newChatRoom = await chatRoomService.createAppriteChatRoom(currentUser_selectedUser);
          dispatch(addReduxChatRoom(newChatRoom));
        }
      } catch (error) {
        console.error(error);
        if (error.code === 404) {
          setRetry(prev => prev + 1); // Force a re-render
        }
      }
    };

    fetchMessages();
  }, [currentUserId, selectedUserId, retry]);

  return (
    
    <div
    style={{ backgroundImage: `url(${chatTheme})`, backgroundSize: 'cover' }} 
    className='w-full text-white'>
      
        <ChatHeader 
          name={selectedUser?.name}
          username={selectedUser?.username}
          imageUrl={selectedUser?.imageUrl}
          profilePicId={selectedUser?.profilePicId}
        />
        
        <ChatBody  messages={chatRoom?.messages}/>
    

      <ChatFooter 
        username={selectedUser?.username}
        chatRoomId={chatRoom?.$id}
        senderId={currentUserId}
        receiverId={selectedUserId}
      />
    </div>
  );
}

export default ChatRoomComp;
