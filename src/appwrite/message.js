import {Client, Databases, Storage, Query, ID} from 'appwrite'
import conf from '../conf/conf';

export class MessageService {
    client = new Client()
    databases
    bucket
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    }

    // create message in appwrite
    async createAppriteMessage(messageId, {chatRoomId, senderId, receiverId, message, fileId, imageUrl}){
        try {
            return this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteMessagesCollectionId,
                messageId,
                {
                    chatRoomId,
                    senderId,
                    receiverId,
                    message,
                    fileId,
                    imageUrl
                }
            )
        } catch (error) {
      console.log("appwrite chat messageService :: createAppwriteMessage :: error: ", error);
        }
    }
    
    // Update message from appwrite
    async updateAppwriteMessage(messageId, {message}){
        try {
            return this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteMessagesCollectionId,
                messageId,
                {
                    message
                }
            )
        } catch (error) {
      console.log("appwrite chat messageService :: updateAppwriteMessage :: error: ", error);
        }
    }

    // Delete message from appwrite
    async deleteAppwriteMessage(messageId){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteMessagesCollectionId,
                messageId
            )
        } catch (error) {
      console.log("appwrite chat messageService :: deleteAppwriteMessage :: error: ", error);
        }
    }

    // Delete messages by chatRoomId
    async deleteAppwriteMessagesByChatRoomId(currentUserId, selectedUserId) {
      try {
  
          const response = await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteMessagesCollectionId,
            [
              Query.equal("chatRoomId", [`${currentUserId}_${selectedUserId}`, `${selectedUserId}_${currentUserId}`])
            ]
          )

  
        const messages = response.documents;
  
        const deleteMessages = messages.map((message) =>
          this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteMessagesCollectionId,
            message.$id
          )
        );
        
        await Promise.all(deleteReplies)
      } catch (error) {
        console.error(
          "Appwrite messageService :: deleteAppwriteMessagesByChatRoomId :: error:",
          error
        );
        return false;
      }
    }

    async uploadAppwriteFile(file) {
        try {
          return await this.bucket.createFile(
            conf.appwriteBucket3Id,
            ID.unique(),
            file
          );
        } catch (error) {
          console.log("Appwrite messageService :: uploadAppwriteFile :: error", error);
          return false;
        }
      }
    
      // Delete file from appwrite
      async deleteAppwriteFile(fileId) {
        try {
          return await this.bucket.deleteFile(conf.appwriteBucket3Id, fileId);
          return true;
        } catch (error) {
          console.log("Appwrite messageService :: deleteAppwriteFile :: error", error);
          return false;
        }
      }
    
      // Get file preview from appwrite
      getFilePreview(fileId) {
        try {
          return this.bucket.getFilePreview(conf.appwriteBucket3Id, fileId);
        } catch (error) {
          console.log("error:: getFilePreview", error);
        }
      }
    
}

const messageService = new MessageService()

export default messageService