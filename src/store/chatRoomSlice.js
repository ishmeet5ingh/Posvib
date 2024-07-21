import { createSlice } from "@reduxjs/toolkit";

const parseJSON = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item && item !== "undefined" ? JSON.parse(item) : [];
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage`, error);
    return null;
  }
};

const initialState = {
  chatRooms: parseJSON("chatRooms"),
};

const chatRoomSlice = createSlice({
  name: "chatRoom",
  initialState,
  reducers: {
    setReduxChatRooms: (state, action) => {
      state.chatRooms = action.payload;
      try {
        localStorage.setItem("chatRooms", JSON.stringify(state.chatRooms));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    },
    addReduxChatRoom: (state, action) => {
      const chatRoom = action.payload;
      state.chatRooms.push(chatRoom);
      try {
        localStorage.setItem("chatRooms", JSON.stringify(state.chatRooms));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    },
    deleteReduxChatRooms: (state) => {
      state.chatRooms = [];
      try {
        localStorage.setItem("chatRooms", JSON.stringify(state.chatRooms));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    },

    addReduxMessage: (state, action) => {
      const { chatRoomId, message } = action.payload;

      state.chatRooms = state.chatRooms.map((chatRoom) => {
        if (chatRoom?.$id === chatRoomId) {
          if (
            chatRoom.messages?.length > 0 &&
            chatRoom.messages[chatRoom.messages.length - 1]?.$id ===
              message?.$id
          ) {
            chatRoom.messages.pop();
            return {
              ...chatRoom,
              messages: [...chatRoom.messages, message],
            };
          } else {
            return {
              ...chatRoom,
              messages: [...chatRoom.messages, message],
            };
          }
        }
      });

      try {
        localStorage.setItem("chatRooms", JSON.stringify(state.chatRooms));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    },

    deleteReduxMessage: (state, action) => {
      const { chatRoomId, messageId } = action.payload;
      console.log("chatRoomId", chatRoomId)
      console.log("messageId", messageId)
      const updatedMessages = state.chatRooms.map((chatRoom) =>
        chatRoom?.$id === chatRoomId
          ? {
              ...chatRoom,
              messages: chatRoom.messages.filter(
                (message) => message?.$id !== messageId
              ),
            }
          : chatRoom
      );

      state.chatRooms = updatedMessages

      try {
        localStorage.setItem("chatRooms", JSON.stringify(updatedMessages));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    },
  },
});

export const {
  setReduxChatRooms,
  addReduxChatRoom,
  deleteReduxChatRooms,
  addReduxMessage,
  deleteReduxMessage,
} = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
