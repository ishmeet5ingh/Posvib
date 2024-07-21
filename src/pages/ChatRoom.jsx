import React from 'react'
import { ChatRoomComp, ChatSidebar } from '../components'
import { useParams } from 'react-router-dom'
function ChatRoom() {
    const {currentUser_selectedUser} = useParams()

  return (
    <ChatRoomComp currentUser_selectedUser={currentUser_selectedUser}/>
  )
}

export default ChatRoom