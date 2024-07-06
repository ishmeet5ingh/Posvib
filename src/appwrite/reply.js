import {Client, Databases, ID, Query} from "appwrite"
import conf from "../conf/conf";


class ReplyService {
    client = new Client();
    databases;
    
    constructor(){
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    }

    // create Reply 
    async createAppwriteReply (replyId, {reply, userId, commentId, creatorAvatarUrl, creatorUsername, postId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteRepliesCollectionId,
                replyId,
                {
                    reply,
                    likes: [],
                    userId,
                    commentId,
                    creatorAvatarUrl,
                    creatorUsername,
                    postId
                }
            )
        } catch (error) {
            console.log("appwrite reply service :: createAppwriteReply :: error: ", error);
        }
    }

    // update reply 
    async updateAppwriteReply(id, {reply}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteRepliesCollectionId,
                id,
                {
                    reply
                }
            )
        } catch (error) {
            console.log("appwrite reply service :: updateAppwriteReply :: error: ", error);
            
        }
    } 

    // delete reply
    async deleteAppwriteReply(id){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteRepliesCollectionId,
                id
            )
        } catch (error) {
            console.log("appwrite reply service :: deleteAppwriteReply :: error: ", error);
        }
    }

    // get all replies

    async getAppwriteReplies(){
        try {
            await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteRepliesCollectionId
            )
        } catch (error) {
            console.log("appwrite reply service :: getAppwriteReplies :: error: ", error);
            
        }
    }

   async deleteAppwriteRepliesByCommentId(commentId){
    try {
        const response = await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteRepliesCollectionId,
            [Query.equal("commentId", commentId)]
        )

        const documents = response.documents

        const deleteReplies = documents.map((document) =>
            this.databases.deleteDocument(
              conf.appwriteDatabaseId,
              conf.appwriteRepliesCollectionId,
              document.$id
            )
        );

        await Promise.all(deleteReplies)

    } catch (error) {
        console.log("appwrite reply service :: deleteAppwriteRepliesByCommentId :: error: ", error);
        return false
    }
   }

   async toggleAppwriteReplyLike(replyId, userId) {
    try {
      const reply = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteRepliesCollectionId,
        replyId
      );

    const updatedLikes = reply.likes.includes(userId)
        ? reply.likes.filter((likedUser) => likedUser !== userId)
        : [...reply?.likes, userId];

      const updatedReply = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteRepliesCollectionId,
        replyId,
        {
          likes: updatedLikes,
        }
      );

      return updatedReply;
    } catch (error) {
      console.log(
        "Appwrite reply service :: toggleAppwriteRepliesLike :: error: ",
        error
      );
    }
  }

}

const replyService = new ReplyService();

export default replyService

