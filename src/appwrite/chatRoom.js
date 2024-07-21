import { Client, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class ChatRoomService {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // create chat room in appwrite
  async createAppriteChatRoom(chatRoomId) {
    try {
      return this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteChatRoomsCollectionId,
        chatRoomId,
        {
          messages: [],
        }
      );
    } catch (error) {
      console.log(
        "appwrite chatRoom service :: createAppriteChatRoom :: error: ",
        error
      );
    }
  }

  // create message inside the chat room
  async createAppwriteMessageInsideChatRoom(
    currentUserId,
    selectedUserId,
    messageId
  ) {
    try {
      const firstId = `${currentUserId}_${selectedUserId}`;
      const secondId = `${selectedUserId}_${currentUserId}`;
      let chatRoom;
      try {
        chatRoom = await this.databases.getDocument(
          conf.appwriteDatabaseId,
          conf.appwriteChatRoomsCollectionId,
          firstId
        );
      } catch (error) {
        chatRoom = await this.databases.getDocument(
          conf.appwriteDatabaseId,
          conf.appwriteChatRoomsCollectionId,
          secondId
        );
      }

      const updatedMessages = [...chatRoom?.messages, messageId];

      try {
        return await this.databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteChatRoomsCollectionId,
          firstId,
          {
            messages: updatedMessages,
          }
        );
      } catch (error) {
        return await this.databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteChatRoomsCollectionId,
          secondId,
          {
            messages: updatedMessages,
          }
        );
      }
    } catch (error) {
      console.log(
        "appwrite chatRoom service :: createAppwriteMessageInsideChatRoom :: error: ",
        error
      );
    }
  }

  // Delete message from chat room
  async deleteAppwriteChatRoomMessages(chatRoomId) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteChatRoomsCollectionId,
        chatRoomId
      );
    } catch (error) {
      console.log(
        "appwrite chatRoom service :: deleteAppwriteChatRoomMessages :: error: ",
        error
      );
    }
  }

  // get Chat Rooms
  async getAppwriteChatRooms(currentUserId) {
    try {
      return this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteChatRoomsCollectionId,
        [
          Query.contains("$id", [
            `${currentUserId}`,
            // `${selectedUserId}_${currentUserId}`,
          ]),
        ]
      );
    } catch (error) {
      console.log(
        "appwrite chatRoom service :: getAppwriteChatRooms :: error: ",
        error
      );
    }
  }

  // get a chat room
  async getAppwriteChatRoom(currentUserId, selectedUserId) {
    try {
      const firstId = `${currentUserId}_${selectedUserId}`;
      const secondId = `${selectedUserId}_${currentUserId}`;

      let chatRoom;
      try {
        chatRoom = await this.databases.getDocument(
          conf.appwriteDatabaseId,
          conf.appwriteChatRoomsCollectionId,
          firstId
        );
      } catch (error) {
        chatRoom = await this.databases.getDocument(
          conf.appwriteDatabaseId,
          conf.appwriteChatRoomsCollectionId,
          secondId
        );
      }

      return chatRoom;
    } catch (error) {
      console.log(
        "appwrite chatRoom service :: getAppwriteChatRoom :: error: ",
        error
      );
    }
  }
}

const chatRoomService = new ChatRoomService();

export default chatRoomService;
